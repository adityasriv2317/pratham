import React from "react";

const staffData = [
  { name: "Dr. Alice Smith", role: "Physician", status: "On Duty" },
  { name: "Nurse John Doe", role: "Nurse", status: "Off Duty" },
  { name: "Dr. Emily Clark", role: "Surgeon", status: "On Duty" },
  { name: "Receptionist Mike Lee", role: "Receptionist", status: "On Duty" },
];

export default function StaffDashboard() {
  return (
    <main className="bg-white p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900">
        Hospital Staff Dashboard
      </h1>
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Staff Overview
        </h2>
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="border-b border-blue-200 text-left px-4 py-2 text-blue-800">
                Name
              </th>
              <th className="border-b border-blue-200 text-left px-4 py-2 text-blue-800">
                Role
              </th>
              <th className="border-b border-blue-200 text-left px-4 py-2 text-blue-800">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, idx) => (
              <tr key={idx} className="hover:bg-blue-50">
                <td className="px-4 py-2 border-b border-blue-100 text-blue-900">
                  {staff.name}
                </td>
                <td className="px-4 py-2 border-b border-blue-100 text-blue-900">
                  {staff.role}
                </td>
                <td className="px-4 py-2 border-b border-blue-100">
                  <span
                    className={`font-bold ${
                      staff.status === "On Duty"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
