const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Student Attendance System API is running"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Backend is healthy"
    });
});

const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/attendanceDB";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });