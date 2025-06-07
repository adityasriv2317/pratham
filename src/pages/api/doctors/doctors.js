import { connectToDB } from "../../../lib/mongodb";
import Doctor from "../../../models/Doctor";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "GET") {
    try {
      const { specialization, ids, sendall } = req.query;
      let query = {};
      let projection = { _id: 1, name: 1, specialization: 1 };

      // If sendall is true, return all doctors with all fields
      if (sendall === "true") {
        projection = undefined;
      }
      if (specialization) {
        query.specialization = specialization;
      }
      if (ids) {
        // Remove empty strings and deduplicate
        const idArr = Array.from(new Set(ids.split(",").filter(Boolean)));
        if (idArr.length > 0) {
          query._id = { $in: idArr };
        }
      }
      const doctors = await Doctor.find(query, projection);
      res.status(200).json({ success: true, doctors });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
