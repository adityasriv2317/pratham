import { connectToDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  await connectToDB();
  const ids = req.query.ids ? req.query.ids.split(",") : [];
  const role = req.query.role;
  try {
    let users = [];
    if (ids.length > 0) {
      users = await User.find(
        { _id: { $in: ids } },
        { name: 1, email: 1, phone: 1 }
      ).lean();
    } else if (role) {
      users = await User.find(
        { role },
        { name: 1, email: 1, age: 1, gender: 1, _id: 1 }
      ).lean();
    } else {
      users = await User.find(
        {},
        { name: 1, email: 1, phone: 1, _id: 1 }
      ).lean();
    }
    const userMap = {};
    users.forEach((u) => {
      userMap[String(u._id)] = { ...u };
    });
    console.log("first user:", users[0]);
    return res.status(200).json({ data: userMap });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
}
