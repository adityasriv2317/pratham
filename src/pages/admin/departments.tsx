"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "@/utils/axios";
import { User2, Mail, Stethoscope, Minimize2, Maximize2 } from "lucide-react";

// Gender icons fallback
const GenderIcon = ({ gender }: { gender: string }) => {
  if (gender === "Male")
    return (
      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 7V3m0 0h4m-4 0l-5 5m2 2a5 5 0 11-7.07 7.07A5 5 0 0114 10z"
        />
      </svg>
    );
  if (gender === "Female")
    return (
      <svg
        className="w-4 h-4 text-pink-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14v7m0 0H9m3 0h3m-3-7a5 5 0 100-10 5 5 0 000 10z"
        />
      </svg>
    );
  return (
    <svg
      className="w-4 h-4 text-purple-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M12 12v8m0 0h-3m3 0h3" />
    </svg>
  );
};

type Doctor = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  specialization: string;
  createdAt?: string;
};

const departmentColors: Record<string, string> = {
  Cardiology: "bg-pink-100 border-pink-300",
  Dermatology: "bg-yellow-100 border-yellow-300",
  Neurology: "bg-purple-100 border-purple-300",
  Pediatrics: "bg-blue-100 border-blue-300",
  // Add more as needed
};

export default function DepartmentsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  // Popup state for department
  const [popupDept, setPopupDept] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        console.log("Fetching doctors data...");
        const res = await axios.get("/doctors/doctors?sendall=true");
        console.log("Doctors response:", res.data);
        setDoctors(res.data.doctors || []);
        // console.log("Doctors data:", res.data.doctors);
      } catch (err: any) {
        console.error("Error fetching doctors:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Only render after mount to avoid SSR hydration mismatch
  if (!mounted) return null;

  // Group doctors by specialization (department)
  const departments: Record<string, Doctor[]> = {};
  doctors.forEach((doc) => {
    if (!departments[doc.specialization]) departments[doc.specialization] = [];
    departments[doc.specialization].push(doc);
  });

  return (
    <Layout role="admin">
      <div className="min-h-screen rounded-2xl overflow-y-auto bg-white py-8 px-2 sm:px-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-10 text-center flex items-center gap-3 justify-center tracking-tight">
          Departments & Doctors
        </h1>
        {loading ? (
          <div className="flex flex-col gap-4 items-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-full max-w-2xl animate-pulse flex space-x-4 bg-gray-100 rounded-xl p-6 border border-gray-200 shadow"
              >
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-6 w-1/3 bg-gray-200 rounded" />
                  <div className="h-4 w-1/4 bg-gray-100 rounded" />
                  <div className="h-4 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center text-lg font-semibold mt-8">
            {error}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mx-auto items-center justify-center">
            {Object.keys(departments).length === 0 ? (
              <div className="text-blue-900 text-center text-xl font-semibold">
                No doctors found.
              </div>
            ) : (
              Object.entries(departments).map(([dept, docs]) => (
                <div
                  key={dept}
                  className="rounded-xl border min-w-72 w-auto aspect-video border-gray-200 p-6 mb-4 shadow bg-white"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-2">
                      <Stethoscope className="w-6 h-6 text-blue-600" /> {dept}
                    </h2>
                    <button
                      className="sticky top-0 right-0 p-2 rounded bg-blue-100 text-blue-800 font-semibold text-sm border border-blue-200 hover:bg-blue-200 transition"
                      onClick={() => setPopupDept(dept)}
                      aria-expanded={popupDept === dept}
                      aria-controls={`dept-popup-${dept}`}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-600 text-sm mt-6 text-center">
                    {docs.length} doctor{docs.length !== 1 ? "s" : ""}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {/* Popup modal for department doctors */}
        {popupDept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative animate-fade-in">
              <button
                className="absolute top-3 right-3 text-blue-700 hover:text-blue-900 text-2xl font-bold"
                onClick={() => setPopupDept(null)}
                aria-label="Close department details"
              >
                <Minimize2 />
              </button>
              <h2 className="text-2xl font-bold text-blue-800 w-fit mx-auto flex items-center gap-2 mb-6">
                <Stethoscope className="w-6 h-6 text-blue-600" /> {popupDept}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments[popupDept]?.map((doc) => (
                  <div
                    key={doc._id}
                    className="bg-gray-50 rounded-xl border border-gray-200 shadow p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 relative"
                  >
                    <div className="flex flex-col justify-between items-center gap-1 mb-2">
                      <User2 className="w-8 h-8 text-blue-700 mb-1" />
                      <span className="font-semibold text-blue-900 text-lg text-center">
                        {doc.name}
                      </span>
                      <span className="text-blue-700 text-xs font-medium tracking-wide">
                        {doc.specialization}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="truncate">{doc.email}</span>
                      </div>
                      {/* <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        <span>{doc.specialization}</span>
                      </div> */}
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <GenderIcon gender={doc.gender} />
                        <span>{doc.gender}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <span className="font-semibold">Age:</span> {doc.age}
                      </div>
                      {doc.createdAt && (
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                          <span className="font-semibold">Joined:</span>{" "}
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
