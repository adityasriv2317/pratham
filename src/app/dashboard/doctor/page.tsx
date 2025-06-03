import Layout from "@/components/Layout";
import React from "react";

const DoctorDashboard: React.FC = () => {
  return (
    <Layout role="doctor">
      <div className="doctor-dashboard-home">
        <h1 className="text-2xl font-bold mb-4">Welcome, Doctor!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Today's Appointments</h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>10:00 AM - John Doe</li>
              <li>11:30 AM - Jane Smith</li>
              <li>2:00 PM - Alice Johnson</li>
            </ul>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Patient Requests</h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Prescription refill: Mark Lee</li>
              <li>Lab results: Sarah Kim</li>
            </ul>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mb-2 w-full">
              Add Appointment
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
              View All Patients
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
