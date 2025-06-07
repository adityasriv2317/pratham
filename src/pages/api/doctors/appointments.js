import { connectToDB } from "../../../lib/mongodb";
import Appointment from "../../../models/Appointment";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";

export default async function handler(req, res) {
  await connectToDB();

  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Access token required" });
  }

  let doctorId;
  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    if (decoded.role !== "doctor") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    doctorId = decoded.id;
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired access token" });
  }

  if (req.method === "GET") {
    try {
      const appointments = await Appointment.find({ doctor: doctorId }).lean();
      console.log("Fetched appointments:", appointments);
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
