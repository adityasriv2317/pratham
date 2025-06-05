import { connectToDB } from "../../../lib/mongodb";
import Doctor from "../../../models/Doctor";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "GET") {
    try {
      const { specialization } = req.query;
      let query = {};
      if (specialization) {
        query.specialization = specialization;
      }
      // Only return _id and name for dropdown
      const doctors = await Doctor.find(query, "_id name department");
      // console.log("Doctors fetched:", doctors);
      res.status(200).json({ success: true, doctors });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
