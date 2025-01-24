const fs = require("fs");

class EmployeeService {
  constructor(filePath = "employees.json") {
    this.filePath = filePath;
  }

  // Helper function to read users from JSON file
  readEmployees() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading employees:", err);
      return [];
    }
  }

  // Helper function to write users to JSON file
  writeEmployees(employees) {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(employees, null, 2),
        "utf8"
      );
    } catch (err) {
      console.error("Error writing employees:", err);
    }
  }

      // Get all users
      getAllEmployees() {
        return this.readEmployees();
    }

  // Create a new user
  createEmployee(newEmployee) {

    const employees = this.readEmployees();
    const newId = employees.length > 0
      ? employees[employees.length - 1].id + 1
      : 1;

    //set salary as int
    newEmployee.salary = Number(newEmployee.salary);

    newEmployee.id = newId;
    employees.push(newEmployee);
    this.writeEmployees(employees);
    return newEmployee;
   
  }

}

module.exports = EmployeeService;
