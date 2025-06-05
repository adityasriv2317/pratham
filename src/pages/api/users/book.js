import { connectToDB } from "../../../lib/mongodb";
import Appointment from "../../../models/Appointment";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";

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
      // Extract user id from JWT
      let userId;
      try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        userId = decoded.id;
      } catch (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid or expired access token" });
      }

      const { department, doctor, date, timeSlot, appointmentType, reason } =
        req.body;

      // Validate required fields
      if (
        !department ||
        !doctor ||
        !date ||
        !timeSlot ||
        !appointmentType ||
        !reason
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required." });
      }

      // Validate doctor is a valid ObjectId
      if (!doctor.match(/^[0-9a-fA-F]{24}$/)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid doctor selection." });
      }

      const appointment = new Appointment({
        department,
        doctor,
        user: userId,
        date,
        timeSlot,
        appointmentType,
        reason,
      });

      await appointment.save();
      res.status(201).json({ success: true, data: appointment });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
      console.error("Error:", error);
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
