"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const schoolRoutes_1 = __importDefault(require("./routes/schoolRoutes"));
const gradeRoutes_1 = __importDefault(require("./routes/gradeRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const feeRoutes_1 = __importDefault(require("./routes/feeRoutes"));
const feeStructureRoutes_1 = __importDefault(require("./routes/feeStructureRoutes"));
const subjectRoutes_1 = __importDefault(require("./routes/subjectRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL, // Allow the client to connect
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
}));
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
// Register routes
app.get("/", (req, res) => {
    res.send("Welcome to the School Management API");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/schools", schoolRoutes_1.default);
app.use("/api/grades", gradeRoutes_1.default);
app.use("/api/students", studentRoutes_1.default);
app.use("/api/fees", feeRoutes_1.default);
app.use("/api/fees-structure", feeStructureRoutes_1.default);
app.use("/api/subjects", subjectRoutes_1.default);
// Global error handling middleware
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;
