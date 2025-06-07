"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "@/utils/axios";
import { User2, Mail, Stethoscope, Calendar } from "lucide-react";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/doctors/doctors", { withCredentials: true })
      .then((res) => setDoctors(res.data.doctors || []))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  // Group doctors by specialization (department)
  const departments: Record<string, Doctor[]> = {};
  doctors.forEach((doc) => {
    if (!departments[doc.specialization]) departments[doc.specialization] = [];
    departments[doc.specialization].push(doc);
  });

  return (
    <Layout role="admin">
      <div className="min-h-screen rounded-2xl bg-white py-8 px-4 sm:px-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center flex items-center gap-3 justify-center">
          Departments & Doctors
        </h1>
        {loading || !mounted ? (
          <div className="flex flex-col gap-4 items-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-full max-w-2xl animate-pulse flex space-x-4 bg-blue-50 rounded-lg p-6 border border-blue-100"
              >
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-6 w-1/3 bg-blue-200 rounded" />
                  <div className="h-4 w-1/4 bg-blue-100 rounded" />
                  <div className="h-4 w-1/2 bg-blue-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {Object.keys(departments).length === 0 ? (
              <div className="text-blue-900 text-center">No doctors found.</div>
            ) : (
              Object.entries(departments).map(([dept, docs]) => (
                <div
                  key={dept}
                  className={`rounded-2xl border-2 p-6 mb-4 shadow-md ${
                    departmentColors[dept] ?? "bg-gray-50 border-gray-200"
                  }`}
                >
                  <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2 mb-4">
                    <Calendar className="w-6 h-6 text-blue-600" /> {dept}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {docs.map((doc) => (
                      <div
                        key={doc._id}
                        className="bg-white rounded-xl border border-blue-100 shadow p-4 flex flex-col gap-2"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <User2 className="w-6 h-6 text-blue-700" />
                          <span className="font-semibold text-blue-900 text-lg">
                            {doc.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-800">
                          <Mail className="w-4 h-4 text-blue-600" /> {doc.email}
                        </div>
                        <div className="flex items-center gap-2 text-blue-800">
                          <Stethoscope className="w-4 h-4 text-blue-600" />{" "}
                          {doc.specialization}
                        </div>
                        <div className="flex items-center gap-2 text-blue-800">
                          <GenderIcon gender={doc.gender} /> {doc.gender}
                        </div>
                        <div className="flex items-center gap-2 text-blue-800">
                          <span className="font-semibold">Age:</span> {doc.age}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
