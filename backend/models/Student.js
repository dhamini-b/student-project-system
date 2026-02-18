const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
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

    projectTitle: {
      type: String,
      required: true
    },

    technologies: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
