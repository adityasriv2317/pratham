import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  reason: string;
}

const PatientAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/users/appointments");
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data.appointments || []); // Fix: use data.appointments
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Layout role="patient">
      <div className="bg-white min-h-screen rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          My Appointments
        </h1>
        {loading && <p className="text-blue-900">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-blue-900 rounded-lg">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Doctor</th>
                  <th className="py-2 px-4">Reason</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="border-t border-blue-900">
                    <td className="py-2 px-4 text-blue-900">{appt.date}</td>
                    <td className="py-2 px-4 text-blue-900">{appt.time}</td>
                    <td className="py-2 px-4 text-blue-900">{appt.doctor}</td>
                    <td className="py-2 px-4 text-blue-900">{appt.reason}</td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-blue-900">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PatientAppointments;
