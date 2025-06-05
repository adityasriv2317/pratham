import { connectToDB } from "../../../lib/mongodb";
import Appointment from "../../../models/Appointment";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";

export default async function handler(req, res) {
  await connectToDB();

  // Check for access token in cookies
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return res.status(401).json({ success: false, message: "Access token required" });
  }
  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired access token" });
  }

  if (req.method === "GET") {
    try {
      const { patientId } = req.query;
      let query = {};
      if (patientId) {
        query.patient = patientId;
      }

      const appointments = await Appointment.find(query)
        .populate("patient") // Populate patient details if needed
        .sort({ date: -1 }); // Sort by most recent

      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
