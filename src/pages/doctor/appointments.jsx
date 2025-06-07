import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/api/doctors/appointments", {
          withCredentials: true,
        });
        setAppointments(res.data.data || []);
        console.log("Fetched appointments:", res.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch appointments."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Layout role="doctor">
      <div className="min-h-screen rounded-2xl bg-white py-8 px-4 sm:px-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          My Appointments
        </h1>
        {loading ? (
          <div className="text-blue-900 text-center">
            {/* Skeleton loading animation */}
            <div className="flex flex-col gap-4 items-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-full max-w-3xl animate-pulse flex space-x-4 bg-blue-50 rounded-lg p-4"
                >
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-blue-200 rounded w-1/4"></div>
                    <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                    <div className="h-4 bg-blue-100 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : appointments.length === 0 ? (
          <div className="text-blue-900 text-center">
            No appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-blue-200 rounded-lg shadow">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Patient</th>
                  <th className="py-3 px-4 text-left">Specialization</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time Slot</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className="border-b border-blue-100 hover:bg-blue-50"
                  >
                    <td className="py-2 px-4">{appt.user}</td>
                    <td className="py-2 px-4">{appt.specialization}</td>
                    <td className="py-2 px-4">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">{appt.timeSlot}</td>
                    <td className="py-2 px-4">{appt.appointmentType}</td>
                    <td className="py-2 px-4">{appt.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
