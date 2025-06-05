// import dbConnect from '../../../lib/dbConnect';
import { connectToDB } from '../../../lib/mongodb';
import Doctor from '../../../models/Doctor';

export default async function handler(req, res) {
    await connectToDB();

    if (req.method === 'POST') {
        try {
            const doctor = new Doctor(req.body);
            await doctor.save();
            res.status(201).json({ success: true, data: doctor });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}