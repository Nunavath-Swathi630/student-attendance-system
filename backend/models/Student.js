const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Present"
    }
});

module.exports = mongoose.model("Student", studentSchema);