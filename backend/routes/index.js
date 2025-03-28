const express = require('express');
const employeRouter = require('./employeeRoutes');

const gateway = express.Router();

gateway.use('/employee', employeRouter);

module.exports = gateway;