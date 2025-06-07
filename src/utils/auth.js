import Admin from "../models/Admin";
import Staffs from "../models/Staffs";
import User from "../models/User";
import bcrypt from "bcryptjs";
import Doctor from "../models/Doctor";

export async function getUserByEmailAndRole(email, role) {
  if (!email) return null;
  //   console.log("Fetching user by email:", email, "and role:", role);
  const query = { email };
  let user = null;
  if (role === "admin") {
    user = await Admin.findOne(query).lean();
  } else if (role === "doctor") {
    user = await Doctor.findOne(query).lean();
  } else if (role === "staff") {
    user = await Staffs.findOne(query).lean();
  } else {
    user = await User.findOne(query).lean();
  }
  //   console.log(user, "found user");
  //   if (user) {
  //     user = user.toObject();
  //   }
  return user;
}

// Compare plaintext password with hashed password
export async function verifyPassword(plainPassword, hashedPassword) {
  if (!plainPassword || !hashedPassword) return false;
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function getUserById(id) {
  let user = await Admin.findById(id).lean();
  if (user) return { ...user, role: "admin" };

  user = await Doctor.findById(id).lean();
  if (user) return { ...user, role: "doctor" };

  user = await Staffs.findById(id).lean();
  if (user) return { ...user, role: "staff" };

  user = await User.findById(id).lean();
  if (user) return { ...user, role: "patient" };

  return null;
}

export async function getUserByToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null; // Invalid JWT format
  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
  return await getUserById(payload.id);
}
