import { Employer } from "../models/employer.model.js";
import { createToken } from "../utils/token-manager.js";
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
    } = req.body.user;

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
    return res
      .status(201)
      .json({ message: "Employer registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    const employer = await Employer.findOne({ email });
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    const passwordMatch = await employer.validatePassword(password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid password" });

    res.clearCookie(process.env.COOKIE_NAME, {
      // httpOnly: true,
      // domain: "localhost",
      // signed: true,
      // path: "/",
      httpOnly: true,
      path: "/",
      signed: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    const token = createToken(employer._id.toString());

    res.cookie(process.env.COOKIE_NAME, token, {
      // httpOnly: true,
      // path: "/",
      // domain: "localhost",
      // signed: true,
      httpOnly: true,
      path: "/",
      signed: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 168 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    return res
      .status(200)
      .json({ message: "Employer Login Successfull", userId: employer._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const viewEmployerProfile = async (req, res) => {
  try {
    const foundUser = await Employer.findById(req.user.userId);

    return res
      .status(200)
      .json({ message: "This is a protected route", foundUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const viewCompanyProfile = async (req, res) => {
  try {
    const foundCompany = await Employer.findById(req.params.companyId);

    return res
      .status(200)
      .json({ message: "This is a protected route", foundCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployerProfile = async (req, res) => {
  try {
    const updates = req.body.updatedProfile;

    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedEmployer)
      return res.status(404).json({ message: "Employer not found" });

    return res.status(200).json({ message: "Employer Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutEmployer = async (req, res) => {
  try {
    await res.clearCookie(process.env.COOKIE_NAME, {
      // httpOnly: true,
      // domain: "localhost",
      // signed: true,
      // path: "/",
      httpOnly: true,
      path: "/",
      signed: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res
      .status(200)
      .json({ message: "Employer Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
