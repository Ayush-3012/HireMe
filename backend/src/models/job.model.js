import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salaryRange: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    requiredSkills: {
      type: [String],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Entry-Level", "Mid-Level", "Senior"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    remote: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre-save validation to ensure applicationDeadline is not before postedDate
jobSchema.pre("save", function (next) {
  if (this.applicationDeadline > this.postedDate) {
    return next(
      new Error("Application deadline cannot be before the posted date.")
    );
  }
  next();
});

// Virtual field to get the count of applicants
jobSchema.virtual("applicantCount").get(function () {
  return this.applicants.length;
});

export const Job = mongoose.model("Job", jobSchema);
