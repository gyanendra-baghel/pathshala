import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import announcementRoutes from "./routes/announcementRoutes";
import schoolRoutes from "./routes/schoolRoutes";
import gradeRoutes from "./routes/gradeRoutes";
import studentRoutes from "./routes/studentRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import feeRoutes from "./routes/feeRoutes";
import feeStructureRoutes from "./routes/feeStructureRoutes";
import reportRoutes from "./routes/reportRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import config from "./config/config";

const app = express();

app.use(
  cors({
    origin: config.app.clientUrl, // Allow the client to connect
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
app.use("/api/attendance", attendanceRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/fee-structures", feeStructureRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/reports", reportRoutes);

// Global error handling middleware
app.use(errorMiddleware);

export default app;
