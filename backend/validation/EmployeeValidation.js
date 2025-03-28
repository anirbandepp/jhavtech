const joi = require('joi');

const EmployeeSchema = (data) => {
    const schema = joi.object({
        name: joi.string().min(3).required().messages({
            "string.base": "⚠️ name should be a type of 'text'",
            "string.empty": "⚠️ name cannot be empty",
            "string.min": "⚠️ name should have at least 3 characters",
            "any.required": "⚠️ name is required",
        }),

        image: joi.string().uri().required().messages({
            "string.base": "⚠️ image cannot be empty",
            "string.empty": "⚠️ image cannot be empty",
            "any.required": "⚠️ image is required",
        }),

        designation: joi.string().min(3).required().messages({
            "string.base": "⚠️ designation should be a type of 'text'",
            "string.empty": "⚠️ designation cannot be empty",
            "string.min": "⚠️ designation should have at least 3 characters",
            "any.required": "⚠️ designation is required",
        }),

        dateOfBirth: joi.date().required().messages({
            "date.base": "⚠️ Invalid date format!",
            "any.required": "⚠️ Date of Birth is required!",
        }),

        yearofExperience: joi.number().min(1).required().messages({
            "number.base": "⚠️ Value must be a number",
            "number.min": "⚠️ Minimum value is 1",

        }),

        reportingManager: joi.alternatives().
            try(
                joi.string().allow(''),
                joi.allow(null)
            )
            .messages({
                "string.base": "⚠️ Reporting Manager should be selected",
                "string.empty": "⚠️ Reporting Manager cannot be empty",
            }),
    });

    return schema.validate(data);
}

module.exports = EmployeeSchema