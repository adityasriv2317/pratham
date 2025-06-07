import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Layout from "@/components/Layout";
import { UserCircle } from "lucide-react";

interface UserProfile {
  _id: string;
  name?: string;
  email: string;
  age?: number;
  gender?: string;
  createdAt?: string;
  role?: "admin" | "doctor" | "staff" | "patient";
}

const Skeleton = () => (
  <div className="rounded-2xl h-full bg-white shadow-lg p-8 animate-pulse">
    <div className="flex items-center gap-4 mb-6">
      <div className="h-16 w-16 bg-blue-100 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-6 bg-blue-100 rounded w-40" />
        <div className="h-4 bg-blue-100 rounded w-32" />
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-blue-100 rounded w-24" />
      <div className="h-4 bg-blue-100 rounded w-28" />
      <div className="h-4 bg-blue-100 rounded w-40" />
    </div>
  </div>
);

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/profile", {
          withCredentials: true,
        });
        console.log("Profile response:", res.data);
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Layout role={user?.role || "patient"}>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="flex h-full rounded-2xl items-center justify-center bg-white">
          <span className="text-red-500 text-lg font-semibold">{error}</span>
        </div>
      ) : user ? (
        <div className="rounded-2xl h-full w-full flex flex-col items-center justify-center mx-auto bg-white shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <UserCircle className="h-20 w-20 text-blue-500" />
            <div>
              <h2 className="text-2xl font-bold text-blue-800">
                {user.name || "User Profile"}
              </h2>
              <p className="text-gray-700">{user.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            {user.age !== undefined && (
              <p className="text-gray-700">
                <span className="font-semibold">Age:</span> {user.age}
              </p>
            )}
            {user.gender && (
              <p className="text-gray-700">
                <span className="font-semibold">Gender:</span>{" "}
                {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              </p>
            )}
            <p className="text-gray-700">
              <span className="font-semibold">Role:</span>{" "}
              {user.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "-"}
            </p>
            {user.createdAt && (
              <p className="text-gray-700">
                <span className="font-semibold">Date Registered:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default ProfilePage;
