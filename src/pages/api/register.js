// pages/api/register.js
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password, role, gender, age } = req.body;

  if (!name || !email || !password || !role || !gender || typeof age === 'undefined')
    return res.status(400).json({ message: "Missing fields" });

  await connectToDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminExists = await User.findOne({ role: "admin" });

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: !adminExists ? "admin" : role,
    status: !adminExists ? "approved" : undefined,
    gender,
    age,
  });

  await newUser.save();

  res.status(201).json({
    message: !adminExists ? "Admin created" : "Registered. Awaiting approval.",
  });
}
