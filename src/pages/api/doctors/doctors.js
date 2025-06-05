import { connectToDB } from "../../../lib/mongodb";
import Doctor from "../../../models/Doctor";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "GET") {
    try {
      // Support fetching by ids (comma-separated)
      const { specialization, ids } = req.query;
      let query = {};
      if (specialization) {
        query.specialization = specialization;
      }
      if (ids) {
        query._id = { $in: ids.split(",") };
      }
      // Only return _id and name for dropdown or mapping
      const doctors = await Doctor.find(query, "_id name specialization");
      res.status(200).json({ success: true, doctors });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
