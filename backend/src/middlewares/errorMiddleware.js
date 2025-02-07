"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
// Middleware to handle all errors
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = "Internal Server Error";
    if (err.name === "ZodError") {
        res
            .status(400)
            .json({ message: "Invalid Credientials", errors: err.errors });
        return;
    }
    else if (err.name === "ApiError") {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
    res.status(statusCode).json(Object.assign({ success: false, message }, (process.env.NODE_ENV === "development" && { stack: err.stack })));
    return;
};
exports.errorMiddleware = errorMiddleware;
