const express = require('express');

const { createEmployee, getAllEmployees } = require('../controllers/EmployeeController');

const employeRouter = express.Router();

// *** Routes
employeRouter.post("/create", createEmployee);

employeRouter.get("/get", getAllEmployees);

module.exports = employeRouter;