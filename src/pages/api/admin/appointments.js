import { connectToDB } from "../../../lib/mongodb";
import Appointment from "../../../models/Appointment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  await connectToDB();
  try {
    // Get all appointments for all doctors (admin view)
    const appointments = await Appointment.find({}).lean();
    return res.status(200).json({ data: appointments });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: err.message });
  }
}
