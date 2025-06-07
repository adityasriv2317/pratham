import { connectToDB } from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  await connectToDB();
  const ids = req.query.ids ? req.query.ids.split(',') : [];
  if (!ids.length) {
    return res.status(400).json({ message: 'No user ids provided' });
  }
  try {
    // Find users by _id and return a map of id -> { name, ... }
    const users = await User.find({ _id: { $in: ids } }, { name: 1 }).lean();
    const userMap = {};
    users.forEach(u => {
      userMap[String(u._id)] = { name: u.name };
    });
    return res.status(200).json({ data: userMap });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
}
