import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";

interface AppointmentForm {
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  appointmentType: string;
  reason: string;
  agree: boolean;
}

const departments = [
  { name: "Cardiology" },
  { name: "Dermatology" },
  { name: "Neurology" },
  { name: "Pediatrics" },
];

const timeSlots = [
  "Morning (8:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 4:00 PM)",
  "Evening (4:00 PM - 8:00 PM)",
];

const appointmentTypes = [
  { value: "in-person", label: "Offline" },
  { value: "teleconsultation", label: "Online" },
];

const initialForm: AppointmentForm = {
  department: "",
  doctor: "",
  date: "",
  timeSlot: "",
  appointmentType: "",
  reason: "",
  agree: false,
};

const BookAppointment: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [doctorList, setDoctorList] = useState<
    {
      _id: string;
      name: string;
      department: string;
    }[]
  >([]);
  const [doctorLoading, setDoctorLoading] = useState(false);

  useEffect(() => {
    if (!form.department) {
      setDoctorList([]);
      return;
    }
    setDoctorLoading(true);
    axios
      .get(
        `/api/doctors/doctors?department=${encodeURIComponent(form.department)}`
      )
      .then((res) => {
        setDoctorList(res.data.doctors || []);
      })
      .catch(() => {
        setDoctorList([]);
      })
      .finally(() => setDoctorLoading(false));
  }, [form.department]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      fieldValue = e.target.checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
      ...(name === "department" ? { doctor: "" } : {}),
      ...(name === "timeSlot" && value !== "Specific Time"
        ? { specificTime: "" }
        : {}),
    }));
  };

  const isFormValid =
    form.department &&
    form.doctor &&
    form.date &&
    form.timeSlot &&
    form.appointmentType &&
    form.reason &&
    form.agree;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isFormValid) {
      setError("Please fill all required fields and agree to the terms.");
      return;
    }
    setLoading(true);
    try {
      const appointmentData = {
        department: form.department,
        doctor: form.doctor,
        date: form.date,
        timeSlot: form.timeSlot,
        appointmentType: form.appointmentType,
        reason: form.reason,
      };

      const res = await axios.post("/api/users/book", appointmentData, {
        withCredentials: true,
      });
      if (res.status === 201) {
        setForm(initialForm);
        setSubmitted(true);
      } else {
        setError("Failed to book appointment. Please try again later.");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to book appointment. Please try again later.");
      }
    } finally {
      setLoading(false);
      if (!error) setForm(initialForm);
    }
  };

  return (
    <Layout role="patient">
      <div className="mx-auto my-auto h-full p-6 bg-white border border-gray-200 rounded-2xl shadow-lg md:p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900">
          Book an Appointment
        </h2>
        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-sm w-full">
              <svg
                className="w-16 h-16 text-green-500 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="custom-dark-blue text-lg font-semibold mb-6 text-center">
                Thank you, your appointment has been booked!
              </p>
              <a
                href="/dashboard/patient"
                className="custom-gradient hover:bg-[#1a4f8c] text-white px-6 py-2 rounded-lg font-bold text-base transition-colors"
              >
                Continue to Dashboard
              </a>
            </div>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 my-auto sm:grid-cols-2"
        >
          <div className="grid md:grid-cols-2 w-full mb-2 gap-6 sm:col-span-2">
            <label className="block font-semibold custom-dark-blue">
              Department/Specialty
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 custom-light-blue-ring bg-gray-50"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block font-semibold custom-dark-blue">
              Doctor
              <select
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                required
                disabled={!form.department || doctorLoading}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 custom-light-blue-ring bg-gray-50 disabled:bg-gray-100"
              >
                <option value="">
                  {doctorLoading ? "Loading..." : "Select Doctor"}
                </option>
                {doctorList.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid md:grid-cols-2 w-full mb-2 gap-6 sm:col-span-2">
            <label className="block font-semibold custom-dark-blue">
              Preferred Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 custom-light-blue-ring bg-gray-50"
              />
            </label>
            <label className="block font-semibold custom-dark-blue">
              Preferred Time Slot
              <select
                name="timeSlot"
                value={form.timeSlot}
                onChange={handleChange}
                required
                className="w-full mt-1 h-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 custom-light-blue-ring bg-gray-50"
              >
                <option value="">Select Time Slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="sm:col-span-2">
            <span className="block font-semibold mb-2 custom-dark-blue">
              Appointment Type
            </span>
            <div className="flex gap-6">
              {appointmentTypes.map((type) => (
                <label
                  key={type.value}
                  className="flex flex-1 items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="appointmentType"
                    value={type.value}
                    checked={form.appointmentType === type.value}
                    onChange={handleChange}
                    required
                    className="accent-[#1a4f8c]"
                  />
                  <span className="custom-light-blue">{type.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block font-semibold custom-dark-blue">
              Reason for Visit / Symptoms
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
                rows={3}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 custom-light-blue-ring bg-gray-50 resize-none"
                placeholder="Describe your symptoms or reason for visit"
              />
            </label>
          </div>
          <div className="sm:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
              className="mr-2 accent-[#1a4f8c]"
              id="agree"
            />
            <label htmlFor="agree" className="text-sm custom-dark-blue">
              I agree to the{" "}
              <a
                href="#"
                className="underline custom-light-blue hover:custom-dark-blue"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          {error && (
            <div className="sm:col-span-2 text-red-600 text-center font-semibold">
              {error}
            </div>
          )}
          <div className="sm:col-span-2 w-full flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-2/3 custom-gradient transition-colors ease text-white px-6 py-3 rounded-lg font-bold text-lg shadow disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader /> : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
      <style jsx global>{`
        .custom-light-blue {
          color: #1a4f8c !important;
        }
        .custom-dark-blue {
          color: #0a2540 !important;
        }
        .custom-light-blue-ring:focus {
          --tw-ring-color: #1a4f8c !important;
        }
        .custom-gradient {
          background: #0f3b66;
        }
        .custom-gradient:hover {
          background: #1a4f8c;
        }
        @media (max-width: 640px) {
          main {
            padding: 1.5rem !important;
            margin-top: 1rem !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default BookAppointment;
