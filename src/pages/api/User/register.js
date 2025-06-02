// pages/api/register.js
import { connectToDB } from "../../../lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password, role, gender, age } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !role ||
    !gender ||
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

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    gender,
    age,
  });

  try {
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
