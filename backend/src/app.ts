import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import schoolRoutes from "./routes/schoolRoutes";
import gradeRoutes from "./routes/gradeRoutes";
import studentRoutes from "./routes/studentRoutes";
import feeRoutes from "./routes/feeRoutes";
import feeStructureRoutes from "./routes/feeStructureRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow the client to connect
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
  })
);
// Middleware for parsing JSON bodies
app.use(express.json());

// Register routes
app.get("/", (req, res) => {
  res.send("Welcome to the School Management API");
});
app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/fees-structure", feeStructureRoutes);
app.use("/api/subjects", subjectRoutes);

// Global error handling middleware
app.use(errorMiddleware);

export default app;
