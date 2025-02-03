import express from "express";
import authRoutes from "./routes/authRoutes";
import schoolRoutes from "./routes/schoolRoutes";
import gradeRoutes from "./routes/gradeRoutes";
import studentRoutes from "./routes/studentRoutes";
import feeRoutes from "./routes/feeRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/subjects", subjectRoutes);

// Global error handling middleware
app.use(errorMiddleware);

export default app;
