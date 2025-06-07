"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/api/doctors/appointments", {
          withCredentials: true,
        });
        setAppointments(res.data.data || []);
        // Fetch patient names for unique user ids
        const userIds = [...new Set((res.data.data || []).map((a) => a.user))];
        if (userIds.length > 0) {
          const usersRes = await axios.get(
            `/api/users/users?ids=${userIds.join(",")}`,
            { withCredentials: true }
          );
          setUserMap(usersRes.data.data || {});
        }
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
          My Patients
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
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {appointments.map((appt, idx) => (
              <AccordionItem
                key={appt._id}
                appt={appt}
                idx={idx}
                userMap={userMap}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

function AccordionItem({ appt, idx, userMap }) {
  const [open, setOpen] = useState(false);
  const patientName = userMap?.[appt.user]?.name || appt.user;
  return (
    <div className="">
      <button
        className={` ${open? "bg-blue-100 rounded-t-xl":"rounded-xl"} w-full border border-blue-200 flex justify-between items-center px-6 py-4 focus:outline-none transition-colors hover:bg-blue-50`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`panel-${idx}`}
      >
        <span className="font-semibold text-blue-900 text-lg">
          {patientName}
        </span>
        <span className="text-blue-700 text-sm flex items-center gap-2">
          {new Date(appt.date).toLocaleDateString()}
          <svg
            className={`w-5 h-5 ml-2 transform transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div
          id={`panel-${idx}`}
          className="px-6 pb-4 pt-2 border border-blue-200 text-blue-900 bg-white rounded-b-xl border-t"
        >
          <div className="mb-2">
            <span className="font-medium">Time:</span> {appt.timeSlot}
          </div>
          <div className="mb-2">
            <span className="font-medium">Type:</span> {appt.appointmentType}
          </div>
          <div className="mb-2">
            <span className="font-medium">Reason:</span> {appt.reason}
          </div>
        </div>
      )}
    </div>
  );
}
