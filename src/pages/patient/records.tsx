"use client";

import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import axios from "axios";

type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: string;
  notes?: string;
};

const fetchAppointments = async (): Promise<Appointment[]> => {
  if (typeof window === "undefined") return [];
  const res = await axios.get("/api/appointment/appointments", {
    withCredentials: true,
  });
  if (res.status !== 200) throw new Error("Failed to fetch appointments");
  const data = res.data;
  const appointments = data.data || [];

  // Fetch doctor details for mapping ObjectId to name
  const doctorIds = Array.from(new Set(appointments.map((a: any) => a.doctor)));
  let doctorMap: Record<string, string> = {};
  if (doctorIds.length > 0) {
    try {
      const docRes = await axios.get(
        `/api/doctors/doctors?ids=${doctorIds.join(",")}`,
        { withCredentials: true }
      );
      if (docRes.status === 200) {
        const docData = docRes.data;
        doctorMap = Object.fromEntries(
          (docData.doctors || []).map((d: any) => [String(d._id), d.name])
        );
      }
    } catch {}
  }

  return appointments.map((a: any) => ({
    id: a.id,
    doctorName: doctorMap[a.doctor] || a.doctor,
    date: new Date(a.date).toLocaleDateString(),
    time: a.timeSlot,
    reason: a.reason,
    status: a.status.charAt(0).toUpperCase() + a.status.slice(1),
    notes: a.notes || "",
  }));
};

const AppointmentAccordion: React.FC<{
  appointment: Appointment;
  index: number;
}> = ({ appointment, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-2 w-full border-blue-200">
      <button
        className={`w-full flex justify-between ease-in-out items-center py-4 px-6 transition-all rounded-t-lg focus:outline-none" ${
          open
            ? "bg-blue-100 hover:bg-blue-200"
            : "bg-white border-b border-b-blue-500 hover:bg-blue-50 rounded-b-lg"
        }`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`panel-${index}`}
      >
        <div className="flex flex-col text-left">
          <span className="font-semibold text-lg text-blue-800">
            {appointment.reason}
          </span>
          <span className="text-sm text-blue-600">
            {appointment.date} at {appointment.time}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            open ? "rotate-180" : ""
          } text-blue-800`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div
          id={`panel-${index}`}
          className="px-6 pb-4 bg-blue-100 rounded-b-lg animate-fade-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-blue-600">Doctor</div>
              <div className="font-medium text-blue-800">
                {appointment.doctorName}
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-600">Status</div>
              <div
                className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                  appointment.status === "Completed"
                    ? "bg-blue-100 text-blue-800"
                    : appointment.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {appointment.status}
              </div>
            </div>
            {appointment.notes && (
              <div className="md:col-span-2">
                <div className="text-sm text-blue-600">Notes</div>
                <div className="text-blue-800">{appointment.notes}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Skeleton loader for appointments
const AppointmentSkeleton: React.FC = () => {
  return (
    <div className="border-b border-blue-200 bg-white animate-pulse">
      <div className="w-full flex justify-between items-center py-4 px-6">
        <div className="flex flex-col text-left gap-2">
          <div className="h-5 w-32 bg-blue-100 rounded" />
          <div className="h-4 w-24 bg-blue-100 rounded" />
        </div>
        <div className="h-5 w-5 bg-blue-100 rounded-full" />
      </div>
      <div className="px-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 w-20 bg-blue-100 rounded mb-2" />
            <div className="h-5 w-24 bg-blue-100 rounded" />
          </div>
          <div>
            <div className="h-4 w-20 bg-blue-100 rounded mb-2" />
            <div className="h-5 w-16 bg-blue-100 rounded" />
          </div>
          <div className="md:col-span-2"></div>
          <div className="h-4 w-20 bg-blue-100 rounded mb-2" />
          <div className="h-5 w-40 bg-blue-100 rounded" />
        </div>
      </div>
    </div>
  );
};

const PatientRecordsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments()
      .then(setAppointments)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout role="patient">
      <div className="rounded-2xl bg-white min-h-screen mx-auto py-10 px-4">
        <h1 className="text-3xl text-center font-bold mb-6 text-blue-800">
          Appointment Records
        </h1>
        {loading && (
          <div className="flex flex-col gap-4">
            <Loader />
            <div className="bg-white rounded shadow divide-y divide-blue-200">
              {[...Array(3)].map((_, idx) => (
                <AppointmentSkeleton key={idx} />
              ))}
            </div>
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && appointments.length === 0 && (
          <div className="text-blue-600">No appointments found.</div>
        )}
        {!loading && !error && (
          <div className="rounded mx-auto w-7/8 md:w-3/4">
            {appointments.map((appointment, idx) => (
              <AppointmentAccordion
                key={appointment.id}
                appointment={appointment}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PatientRecordsPage;
