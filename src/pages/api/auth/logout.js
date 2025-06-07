import { connectToDB } from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import { getUserByToken } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToDB();

  const requestToken = req.cookies.refreshToken;
  if (!requestToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  res.setHeader("Set-Cookie", [
    "accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
    "refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
  ]);

  // clear token from database
  try {
    const User = (await import("../../../models/User.js")).default;

    const currentUser = await getUserByToken(requestToken);
    if (!currentUser) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    await User.updateOne(
      { _id: currentUser._id },
      { $unset: { refreshToken: "" } }
    );

    console.log("Refresh token cleared from database");
  } catch (error) {
    console.error("Error clearing refresh token:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to log out" });
  } finally {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  }
}
