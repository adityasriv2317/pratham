import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import {
  CalendarDays,
  User2,
  Clock,
  FileText,
  X,
  CircleArrowLeft,
  CircleArrowRight,
} from "lucide-react";

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  return days;
}

const AdminAppointmentsCalendar: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [userMap, setUserMap] = useState<Record<string, { name: string }>>({});
  const [doctorMap, setDoctorMap] = useState<Record<string, { name: string }>>(
    {}
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/admin/appointments", { withCredentials: true })
      .then(async (res) => {
        setAppointments(res.data.data || []);
        // Fetch patient and doctor names for unique user/doctor ids
        const userIds = [
          ...new Set((res.data.data || []).map((a: any) => a.user)),
        ];
        const doctorIds = [
          ...new Set((res.data.data || []).map((a: any) => a.doctor)),
        ];
        if (userIds.length > 0) {
          const usersRes = await axios.get(
            `/api/users/users?ids=${userIds.join(",")}`,
            { withCredentials: true }
          );
          setUserMap(usersRes.data.data || {});
        }
        if (doctorIds.length > 0) {
          const doctorsRes = await axios.get(
            `/api/doctors/doctors?ids=${doctorIds.join(",")}`,
            { withCredentials: true }
          );
          // doctorMap: { [id]: { name } }
          const map: Record<string, { name: string }> = {};
          (doctorsRes.data.doctors || []).forEach((d: any) => {
            map[String(d._id)] = { name: d.name };
          });
          setDoctorMap(map);
        }
      })
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  // Map date string (YYYY-MM-DD) to appointments
  const apptMap: Record<string, any[]> = {};
  appointments.forEach((appt) => {
    const d = new Date(appt.date);
    const key = d.toLocaleDateString("en-CA");
    if (!apptMap[key]) apptMap[key] = [];
    apptMap[key].push(appt);
  });

  const days = getMonthDays(currentMonth.year, currentMonth.month);
  const firstDayOfWeek = new Date(
    currentMonth.year,
    currentMonth.month,
    1
  ).getDay();

  // Modal content for selected date
  const modalAppointments = selectedDate
    ? apptMap[selectedDate.toLocaleDateString("en-CA")] || []
    : [];

  return (
    <Layout role="admin">
      <div className="min-h-screen rounded-2xl bg-white py-6 px-1 sm:px-4 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6 text-center">
          All Appointments
        </h1>
        <div className="bg-blue-50 rounded-2xl mt-[5vh] shadow-lg p-2 sm:p-6 w-full max-w-2xl">
          {/* Skeleton loading animation */}
          {!mounted || loading ? (
            <div>
              <div className="flex flex-row animate-pulse sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
                <div
                  className="rounded-full bg-blue-200 w-6 h-6"
                  aria-label="Loading"
                />
                <div
                  className="h-6 w-36 rounded-md bg-blue-200"
                  aria-label="Loading"
                />
                <div
                  className="rounded-full bg-blue-200 w-6 h-6"
                  aria-label="Loading"
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-3 animate-pulse">
                {Array(firstDayOfWeek)
                  .fill(null)
                  .map((_, i) => (
                    <div key={"empty-" + i}></div>
                  ))}
                {days.map((date, idx) => (
                  <div
                    key={date.toISOString()}
                    className="rounded-lg h-12 sm:h-15 flex flex-col items-center justify-center border bg-blue-100 border-blue-200"
                  >
                    <div className="w-5 h-5 sm:w-7 sm:h-7 bg-blue-200 rounded mb-1"></div>
                    <div className="w-8 h-2 bg-blue-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
                <button
                  className="text-blue-500 hover:text-blue-700 text-xl font-bold"
                  onClick={() =>
                    setCurrentMonth((m) => {
                      const prev = new Date(m.year, m.month - 1, 1);
                      return {
                        year: prev.getFullYear(),
                        month: prev.getMonth(),
                      };
                    })
                  }
                  aria-label="Previous Month"
                >
                  <CircleArrowLeft className="w-7 h-7" />
                </button>
                <span className="text-base sm:text-lg font-semibold text-blue-700">
                  {new Date(
                    currentMonth.year,
                    currentMonth.month
                  ).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  className="text-blue-500 hover:text-blue-700 text-xl font-bold"
                  onClick={() =>
                    setCurrentMonth((m) => {
                      const next = new Date(m.year, m.month + 1, 1);
                      return {
                        year: next.getFullYear(),
                        month: next.getMonth(),
                      };
                    })
                  }
                  aria-label="Next Month"
                >
                  <CircleArrowRight className="w-7 h-7" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div
                    key={d}
                    className="font-semibold text-blue-700 text-xs sm:text-base"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-3">
                {Array(firstDayOfWeek)
                  .fill(null)
                  .map((_, i) => (
                    <div key={"empty-" + i}></div>
                  ))}
                {days.map((date) => {
                  const key = date.toLocaleDateString("en-CA");
                  const appts = apptMap[key] || [];
                  return (
                    <button
                      key={key}
                      className={`rounded-lg h-12 sm:h-15 flex flex-col items-center justify-center border transition-all
                        ${
                          appts.length > 0
                            ? "bg-blue-100 border-blue-400 hover:bg-blue-200 cursor-pointer"
                            : "bg-gray-50 border-gray-200"
                        }
                        ${
                          selectedDate &&
                          key === selectedDate.toLocaleDateString("en-CA")
                            ? "ring-2 ring-blue-200"
                            : ""
                        }
                      `}
                      onClick={() => {
                        if (appts.length > 0) {
                          setSelectedDate(date);
                          setShowModal(true);
                        }
                      }}
                      aria-label={`Appointments on ${date.toLocaleDateString()}`}
                    >
                      <span className="font-bold text-blue-900 text-sm sm:text-base">
                        {date.getDate()}
                      </span>
                      {appts.length > 0 && (
                        <span className="text-[10px] sm:text-xs text-blue-700 mt-1">
                          {appts.length} appt{appts.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {/* Modal for appointments on selected day */}
        {showModal && selectedDate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-xl px-2 py-6 sm:px-8 sm:py-12 w-full max-w-xs sm:max-w-lg relative mx-2">
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-blue-500 hover:text-blue-700 border-2 rounded-lg text-2xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X className="w-7 h-7" />
              </button>
              <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 text-center flex items-center gap-2 justify-center">
                <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />{" "}
                Appointments for {selectedDate.toLocaleDateString()}
              </h2>
              {modalAppointments.length === 0 ? (
                <div className="text-blue-700 text-center">
                  No appointments.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {modalAppointments.map((appt) => (
                    <div
                      key={appt._id}
                      className="rounded-lg border border-blue-200 bg-blue-50 p-2 sm:p-3 flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-2 font-semibold text-blue-900 text-sm sm:text-base">
                        <User2 className="w-4 h-4 text-blue-700" />
                        Patient: {userMap?.[appt.user]?.name || appt.user}
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-blue-900 text-sm sm:text-base">
                        <User2 className="w-4 h-4 text-blue-700" />
                        Doctor: {doctorMap?.[appt.doctor]?.name || appt.doctor}
                      </div>
                      <div className="flex items-center gap-2 text-blue-800 text-sm sm:text-base">
                        <Clock className="w-4 h-4 text-blue-700" /> Time:{" "}
                        {appt.timeSlot}
                      </div>
                      <div className="flex items-center gap-2 text-blue-800 text-sm sm:text-base">
                        <FileText className="w-4 h-4 text-blue-700" /> Type:{" "}
                        {appt.appointmentType}
                      </div>
                      <div className="flex items-center gap-2 text-blue-800 text-sm sm:text-base">
                        <FileText className="w-4 h-4 text-blue-700" /> Reason:{" "}
                        {appt.reason}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {error && <div className="mt-8 text-red-500">{error}</div>}
      </div>
    </Layout>
  );
};

export default AdminAppointmentsCalendar;
