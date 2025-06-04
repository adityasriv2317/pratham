import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserById } from "@/utils/auth.js";

const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "yourRefreshSecret";
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";

export default async function handler(req, res) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    // Verify the refresh token
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // Optionally, check if the user still exists
    const user = await getUserById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Issue a new access token
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Set the new access token as an HTTP-only cookie
    res.setHeader("Set-Cookie", [
      `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=3600`,
    ]);

    // Respond with user info if needed
    // console.log("logged in");
    return res.status(200).json({ user: { ...user, password: undefined } });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
}
