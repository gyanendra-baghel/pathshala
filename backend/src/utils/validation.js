"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumber = exports.validateRequiredFields = exports.validateEmail = void 0;
// Helper function to validate email format
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
// Middleware to validate required fields in the request body
const validateRequiredFields = (requiredFields) => {
    return (req, res, next) => {
        for (let field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }
        next();
    };
};
exports.validateRequiredFields = validateRequiredFields;
// Example for validating a number (e.g., age)
const validateNumber = (value) => {
    return !isNaN(value) && typeof value === "number";
};
exports.validateNumber = validateNumber;
