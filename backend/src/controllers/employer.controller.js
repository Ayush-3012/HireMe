import Employer from "../models/employer.model.js";
import bcrypt from "bcrypt";

export const registerEmployer = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      contactNumber,
      location,
      industry,
      companyDescription,
      website,
    } = req.body;

    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployer = new Employer({
      companyName,
      email,
      password: hashedPassword,
      contactNumber,
      location,
      industry,
      companyDescription,
      website,
    });

    await newEmployer.save();
    res.status(201).json({ message: "Employer registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the employer
    const employer = await Employer.findOne({ email });
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
