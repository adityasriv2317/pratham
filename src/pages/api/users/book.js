import { connectToDB } from "../../../lib/mongodb";
import Appointment from "../../../models/Appointment";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";

export default async function handler(req, res) {
  await connectToDB();

  // Check for access token in cookies
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Access token required" });
  }
  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired access token" });
  }

  if (req.method === "POST") {
    try {
      const { department, doctor, date, timeSlot, appointmentType, reason } =
        req.body;

      const appointment = new Appointment({
        department,
        doctor,
        date,
        timeSlot,
        appointmentType,
        reason,
      });

      await appointment.save();
      res.status(201).json({ success: true, data: appointment });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
