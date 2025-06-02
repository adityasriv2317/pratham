import { connectToDB } from "../../../lib/mongodb";
import Admin from "../../../models/Admin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password, age, gender } = req.body;

  if (!name || !email || !password || !age || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await connectToDB();

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
    });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
