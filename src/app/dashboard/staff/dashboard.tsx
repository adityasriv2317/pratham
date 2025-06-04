import React from "react";

const staffData = [
  { name: "Dr. Alice Smith", role: "Physician", status: "On Duty" },
  { name: "Nurse John Doe", role: "Nurse", status: "Off Duty" },
  { name: "Dr. Emily Clark", role: "Surgeon", status: "On Duty" },
  { name: "Receptionist Mike Lee", role: "Receptionist", status: "On Duty" },
];

export default function StaffDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hospital Staff Dashboard</h1>
      <section style={{ marginTop: "2rem" }}>
        <h2>Staff Overview</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                  padding: "0.5rem",
                }}
              >
                Name
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                  padding: "0.5rem",
                }}
              >
                Role
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                  padding: "0.5rem",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, idx) => (
              <tr key={idx}>
                <td
                  style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}
                >
                  {staff.name}
                </td>
                <td
                  style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}
                >
                  {staff.role}
                </td>
                <td
                  style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}
                >
                  <span
                    style={{
                      color: staff.status === "On Duty" ? "green" : "gray",
                      fontWeight: "bold",
                    }}
                  >
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
