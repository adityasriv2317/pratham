import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import {
  User2,
  Mail,
  ChevronDown,
  BadgePercent,
  Fingerprint,
  Venus,
  Mars,
  LucideIcon,
} from "lucide-react";

const UserAccordion: React.FC<{ user: any; idx: number }> = ({ user, idx }) => {
  const [open, setOpen] = useState(false);

  // Gender icon logic
  let GenderIcon: LucideIcon = User2;
  if (user.gender?.toLowerCase() === "male") GenderIcon = Mars;
  else if (user.gender?.toLowerCase() === "female") GenderIcon = Venus;

  return (
    <div className="rounded-xl border-blue-200 shadow bg-white">
      <button
        className={`w-full flex justify-between ${
          open ? "bg-blue-100 rounded-t-xl" : "border bg-white rounded-xl"
        } items-center px-6 py-4 transition-colors hover:bg-blue-50`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`panel-${idx}`}
      >
        <span className="flex items-center gap-2 font-semibold text-blue-800 text-lg">
          <User2 className="w-5 h-5 text-blue-700" />
          {user.name}
        </span>
        <ChevronDown
          className={`w-5 h-5 ml-2 text-blue-700 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {open && (
        <div
          id={`panel-${idx}`}
          className="px-6 pb-4 pt-2 text-blue-900 rounded-b-xl border-t border-blue-100"
        >
          <div className="mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-700" />
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <BadgePercent className="w-4 h-4 text-blue-700" />
            <span className="font-medium">Age:</span> {user.age || "-"}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <GenderIcon className="w-4 h-4 text-blue-700" />
            <span className="font-medium">Gender:</span>{" "}
            {user.gender.charAt(0).toUpperCase() +
              user.gender.slice(1).toLowerCase()}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-blue-700" />
            <span className="font-medium">User ID:</span> {user._id}
          </div>
        </div>
      )}
    </div>
  );
};

const UserSkeleton: React.FC = () => (
  <div className="rounded-xl border border-blue-100 shadow bg-white animate-pulse mb-2">
    <div className="flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-blue-100 rounded-full" />
        <div className="h-4 w-32 bg-blue-100 rounded" />
      </div>
      <div className="w-5 h-5 bg-blue-100 rounded-full" />
    </div>
    <div className="px-6 pb-4">
      <div className="h-4 w-40 bg-blue-100 rounded mb-2" />
      <div className="h-4 w-32 bg-blue-100 rounded mb-2" />
      <div className="h-4 w-24 bg-blue-100 rounded" />
    </div>
  </div>
);

const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/users/users?role=patient", { withCredentials: true })
      .then((res) => {
        // Ensure age and gender are present, fallback to '-' if missing
        const users = Object.values(res.data.data || {}).map((u: any) => ({
          ...u,
          age: u.age ?? "-",
          gender: u.gender ?? "-",
        }));
        setUsers(users);
      })
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout role="admin">
      <div className="min-h-screen rounded-2xl overflow-y-scroll bg-white py-10 px-2 sm:px-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Manage Patients
        </h1>
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {loading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <UserSkeleton key={i} />
              ))}
            </>
          ) : error ? (
            <div className="text-red-500 text-center bg-red-50 rounded-lg p-4 border border-red-200 max-w-xl mx-auto">
              {error}
            </div>
          ) : users.length === 0 ? (
            <div className="text-blue-800 text-center bg-blue-50 rounded-lg p-4 border border-blue-200 max-w-xl mx-auto">
              No patients found.
            </div>
          ) : (
            users.map((user, idx) => (
              <UserAccordion key={user._id} user={user} idx={idx} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ManageUsersPage;
