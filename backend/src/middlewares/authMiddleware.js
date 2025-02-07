"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Assuming Bearer token format
    if (!token) {
        next(new ApiError_1.default(401, "Unauthorized access. Token missing."));
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.app.jwtSecret);
        if (!decoded) {
            next(new ApiError_1.default(401, "Unauthorized access. Invalid token."));
            return;
        }
        // TODO:Check if the user exists
        req.user = decoded; // Attach user info to request object (e.g., userId and role)
        next();
    }
    catch (error) {
        next(new ApiError_1.default(401, "Unauthorized access. Invalid token."));
    }
};
exports.authMiddleware = authMiddleware;
// Middleware to check if the user has a specific role
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        var _a;
        if (roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
            res
                .status(403)
                .json({ message: "Forbidden access. Insufficient permissions." });
            return;
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
