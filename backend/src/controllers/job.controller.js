import { Job } from "../models/job.model.js";
import { Employee } from "../models/employee.model.js";
import { Employer } from "../models/employer.model.js";

export const createJob = async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.userId);
    if (!employer)
      return res
        .status(404)
        .json({ message: "Cannot create job, Employer not found" });

    const {
      title,
      description,
      location,
      salaryRange,
      employmentType,
      applicationDeadline,
      requiredSkills,
      experienceLevel,
      status,
      remote,
    } = req.body.jobData;

    const newJob = new Job({
      title,
      description,
      location,
      salaryRange,
      employmentType,
      companyName: employer.companyName,
      applicationDeadline,
      requiredSkills,
      experienceLevel,
      status,
      remote,
      employer: req.user.userId,
    });

    await newJob.save();

    employer.jobsPosted.push(newJob._id);
    await employer.save();

    return res
      .status(201)
      .json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer", "companyName email");
    if (!jobs) return res.status(404).json({ message: "No jobs found" });

    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSpecificJobs = async (req, res) => {
  try {
    const { keywords } = req.query;
    const searchCriteria = {};

    if (keywords) {
      searchCriteria.$or = [
        { title: { $regex: keywords, $options: "i" } },
        { location: { $regex: keywords, $options: "i" } },
        { companyName: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
        { requiredSkills: { $regex: keywords, $options: "i" } },
      ];
    }

    const foundJobs = await Job.find(searchCriteria);
    return res.status(200).json({ foundJobs });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch specific jobs" });
  }
};

export const getJobsByEmployer = async (req, res) => {
  try {
    const { employerId } = req.params;
    const jobs = await Job.find({ employer: employerId });
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch jobs." });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const appliedJobIds = employee.appliedJobs;

    const jobs = await Job.find({ _id: { $in: appliedJobIds } });

    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch applied jobs." });
  }
};

export const getJobDetails = async (req, res) => {
  try {
    const foundJob = await Job.findById(req.params.jobId);
    if (!foundJob)
      return res.status(404).json({ message: "No Such Job Found" });

    return res.status(200).json({ foundJob });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.userId);
    if (!employee)
      return res.status(401).json({
        message: "The LoggedIn user is not an employee, cannot apply",
      });

    const foundJob = await Job.findById(req.params.jobId);
    if (!foundJob) return res.status(404).json({ message: "Job Not Found" });
    if (foundJob.status !== "Open")
      return res
        .status(404)
        .json({ message: "The requested job is no more open for application" });

    const alreadyApplied = employee.appliedJobs.some(
      (item) => item.toString() === req.params.jobId.toString()
    );

    if (alreadyApplied) {
      return res
        .status(403)
        .json({ message: "You have already applied for this job." });
    }

    foundJob.applicants.push(req.user.userId);
    await foundJob.save();

    employee.appliedJobs.push(req.params.jobId);
    await employee.save();

    return res
      .status(200)
      .json({ message: "Applied for the job successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.userId);
    if (!employer)
      return res
        .status(404)
        .json({ message: "Cannot update job, Employer not found" });

    const foundJob = await Job.findById(req.params.jobId);
    if (!foundJob) return res.status(404).json({ message: "Job Not Found" });

    if (foundJob.employer.toString() !== req.user.userId.toString())
      return res
        .status(403)
        .json({ message: "Unauthorized to update this job" });

    await Job.findByIdAndUpdate(req.params.jobId, req.body.updateData, {
      new: true,
    });
    return res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getRecommendedJobs = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.userId);
    if (!employee)
      return res.status(404).json({ message: "Employee Not Found" });

    const { skills, location } = employee;
    const criteria = {
      $or: [
        { requiredSkills: { $in: skills } },
        { location: location },
        // experienceLevel: employee.experience
      ],
    };

    const recommendedJobs = await Job.find(criteria).limit(10);

    return res.status(200).json(recommendedJobs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const saveJob = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.userId);
    if (!employee)
      return res.status(404).json({ message: "Employee Not Found" });

    const foundJob = await Job.findById(req.body.jobId);
    if (!foundJob) return res.status(404).json({ message: "Job Not Found" });

    const isAlreadySaved = employee.savedJobs.some(
      (item) => item.toString() === req.body.jobId.toString()
    );

    if (isAlreadySaved) {
      return res.status(403).json({ message: "Job already Saved" });
    }

    employee.savedJobs.push(req.body.jobId);
    await employee.save();
    return res.status(200).json({ message: "Job Saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const unSaveJob = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.userId);
    if (!employee)
      return res.status(404).json({ message: "Employee Not Found" });

    const foundJob = await Job.findById(req.body.jobId);
    if (!foundJob) return res.status(404).json({ message: "Job Not Found" });

    employee.savedJobs.pull(req.body.jobId);
    await employee.save();
    return res.status(200).json({ message: "Job Removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.userId);
    if (!employer)
      return res.status(404).json({ message: "Employer Not Found" });

    const foundJob = await Job.findById(req.params.jobId);
    if (!foundJob) return res.status(404).json({ message: "Job Not Found" });

    if (foundJob.employer.toString() !== req.user.userId.toString())
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this job" });

    await employer.jobsPosted.pull(req.params.jobId);
    const appliedEmployees = foundJob.applicants;
    if (appliedEmployees && appliedEmployees.length > 0) {
      await Employee.updateMany(
        { _id: { $in: appliedEmployees } },
        { $pull: { appliedJobs: req.params.jobId } }
      );
    }

    await Job.findByIdAndDelete(req.params.jobId);

    await employer.save();
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateJobStatuses = async () => {
  try {
    const currentDate = new Date();
    await Job.updateMany(
      { applicationDeadline: { $lt: currentDate }, status: "Open" },
      { $set: { status: "Closed" } }
    );
  } catch (error) {
    console.error("Error updating job statuses:", error.message);
  }
};

setInterval(async () => {
  await updateJobStatuses();
}, 86400000);
