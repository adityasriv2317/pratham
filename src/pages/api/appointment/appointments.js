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
  let userId;
  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired access token" });
  }

  if (req.method === "GET") {
    try {
      // Fetch appointments for the logged-in user only
      const appointments = await Appointment.find({ user: userId })
        .sort({ date: -1 });

      // Format appointments using the schema fields
      const formatted = appointments.map((a) => ({
        id: a._id,
        specialization: a.specialization,
        doctor: a.doctor,
        date: a.date,
        timeSlot: a.timeSlot,
        appointmentType: a.appointmentType,
        reason: a.reason,
        status: a.status,
        createdAt: a.createdAt,
      }));

      res.status(200).json({ success: true, data: formatted });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
