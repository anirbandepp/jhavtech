const express = require('express');

const { createEmployee, getAllEmployees } = require('../controllers/EmployeeController');

const checkNodeCache = require('../middlewares/cacheMiddleware');

const employeRouter = express.Router();

// *** Routes
employeRouter.post("/create", createEmployee);

employeRouter.get("/get", checkNodeCache, getAllEmployees);

module.exports = employeRouter;