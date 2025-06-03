import { getUserByEmailAndRole, verifyPassword } from "../../../utils/auth.js";
import { connectToDB } from "../../../lib/mongodb.js";
import { signAccessToken, signRefreshToken } from "../../../lib/jwtlib.ts";

await connectToDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, and role are required." });
  }

  try {
    // Fetch user by email and role (admin, user, doctor, staff)
    const user = await getUserByEmailAndRole(email, role);
    if (user) {
      console.log("User found:");
    }

    if (!user) {
      console.log("User not found for email:", email, "and role:", role);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid pass." });
    }

    const { passwordHash, ...userData } = user;
    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id, role: user.role });

    res.setHeader("Set-Cookie", [
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=3600`, // 1 hour
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800`, // 7 days
    ]);

    // You can implement JWT or session here as needed
    return res.status(200).json(userData);
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
