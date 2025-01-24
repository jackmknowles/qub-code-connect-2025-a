const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');

// Path to the users JSON file
const USERS_FILE = './users.json';

// GET route to render the login page
router.get('/', (req, res) => {
  res.render('login');  // Make sure you have a `login.ejs` file in the views folder
});

// POST route to handle form submission
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Read the users from the JSON file
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user file:', err);
      return res.status(500).send('Internal Server Error');
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).send('Internal Server Error');
      }

      if (result) {
        res.send('Login successful!');
      } else {
        res.status(400).send('Invalid email or password.');
      }
    });
  });
});

module.exports = router;