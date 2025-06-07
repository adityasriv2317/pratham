// pages/api/register.js
import { connectToDB } from "../../../lib/mongodb";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password, specialization, role, gender, age } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !role ||
    !gender ||
    !specialization ||
    typeof age === "undefined"
  )
    return res.status(400).json({ message: "Missing fields" });

  if (role && role.toLowerCase() === "admin") {
    return res
      .status(403)
      .json({ message: "Registration as admin is not allowed." });
  }

  await connectToDB();

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser;
  try {
    if (role.toLowerCase() === "doctor") {
      if (!specialization) {
        return res
          .status(400)
          .json({ message: "Specialization is required for doctors." });
      }
      newUser = new Doctor({
        name,
        email,
        password: hashedPassword,
        gender,
        age,
        specialization,
      });
    } else if (role.toLowerCase() === "staff") {
      newUser = new Staff({
        name,
        email,
        password: hashedPassword,
        gender,
        age,
        department: department || "", // Optional: add department if your Staff schema uses it
      });
    } else if (role.toLowerCase() === "admin") {
      newUser = new Admin({
        name,
        email,
        password: hashedPassword,
        gender,
        age,
      });
    } else {
      newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        gender,
        age,
      });
    }
    await newUser.save();
    res.status(201).json({
      message: "Registered successfully.",
    });
  } catch (err) {
    console.error("User registration error:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
