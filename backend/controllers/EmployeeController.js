// *** Third Party Packages
const createHttpError = require("http-errors");

// *** Import Models
const Employee = require('../models/Employee');

// *** Import Helpers
const EmployeeSchema = require("../validation/EmployeeValidation");
const logger = require("../utils/logger");
const cache = require('../config/Cache');

const createEmployee = async (req, res, next) => {
    try {

        const { name, image, designation, dateOfBirth, yearofExperience, reportingManager } = req.body;

        // *** validation the schema
        const { error } = EmployeeSchema(req.body);

        if (error) {
            logger.warn("Validation error", error.details[0].message);

            return res.status(400).json({
                success: false,
                message: error.details[0].message
            })
        }

        // *** Find IF CEO Already Created or not
        const existingCEO = await Employee.findOne({ designation: "CEO" });

        if (existingCEO && designation === "CEO") {
            const error = createHttpError(400, "CEO already exists");
            return next(error);
        }

        // *** Check If Emplyee already exists
        const isExists = await Employee.findOne({ name });

        if (isExists) {
            const error = createHttpError(400, "Employee already exists");
            return next(error);
        }

        // *** Store New Employee
        const employee = new Employee({
            name,
            image,
            designation: designation.toUpperCase(),
            dateOfBirth, yearofExperience,
            reportingManager: reportingManager || null
        });

        await employee.save();

        // *** Delete from in-memory cache
        cache.del(req.originalUrl);

        // *** Send Response
        return res.status(201).json({
            success: true,
            result: employee,
            message: 'Employee created successfully'
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Get all employees
const getAllEmployees = async (req, res) => {
    try {

        const employees = await Employee.find();

        // *** Create Response
        const response = {
            fromCache: false,
            success: true,
            result: employees,
            message: 'Employee fetched successfully'
        }

        // *** Store in in-memory cache
        cache.set(req.originalUrl, response);

        return res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createEmployee, getAllEmployees };