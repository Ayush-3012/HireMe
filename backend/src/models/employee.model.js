import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    education: [
      {
        degree: String,
        institution: String,
        yearOfGraduation: String,
      },
    ],
    experience: [
      {
        jobTitle: String,
        companyName: String,
        duration: String,
        description: String,
      },
    ],
    resumeUrl: { type: String, trim: true },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

employeeSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Employee = mongoose.model("Employee", employeeSchema);
