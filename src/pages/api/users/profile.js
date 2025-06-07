import { connectToDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { getUserByToken } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  await connectToDB();
  const token = req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Only return safe fields
    const { _id, name, email, role, age, gender } = user;
    return res
      .status(200)
      .json({ user: { _id, name, email, role, age, gender } });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
}
