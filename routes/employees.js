var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();

// Read all users
router.get('/', (req, res) => {
    const employees = employeeService.getAllEmployees();
    res.render('employeeList', { employees: employees })
  });


module.exports = router;