var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();

// Create a new user form
router.get('/add', (req, res) => {
  res.render('addEmployee')
});

// Create a new user submit
router.post('/add', (req, res) => {
  const newEmployee = req.body;
  const createdEmployees = employeeService.createEmployee(newEmployee);
  res.redirect('/employees/'+createdEmployees.id)
});

module.exports = router;
