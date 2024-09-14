import { Employee } from "../models/employee.model.js";
import { createToken } from "../utils/token-manager.js";
import bcrypt from "bcrypt";

export const registerEmployee = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      contactNumber,
      location,
      skills,
      education,
      experience,
      resumeUrl,
    } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      fullName,
      email,
      password: hashedPassword,
      contactNumber,
      location,
      skills,
      education,
      experience,
      resumeUrl,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body.user;

    const employee = await Employee.findOne({ email });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const passwordMatch = await employee.validatePassword(password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid password" });

    res.clearCookie(process.env.COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(employee._id.toString());

    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "Employee Login Successfull", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewEmployeeProfile = async (req, res) => {
  try {
    const foundEmployee = await Employee.findById(req.user.userId);

    res.json({ message: "This is a protected route", foundEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployeeProfile = async (req, res) => {
  try {
    const updates = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    return res
      .status(200)
      .json({ message: "Employee Updated Successfully", updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutEmployee = async (req, res) => {
  try {
    res.clearCookie(process.env.COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    res.json({ message: "Employee Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
