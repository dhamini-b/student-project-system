const mongoose = require("mongoose");

/*
  Student Schema
  This defines how a student document looks in MongoDB
*/
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    department: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "students"
  }
);

module.exports = mongoose.model("Student", studentSchema);
