import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    FaUserMd,
    FaProcedures,
    FaCalendarCheck,
    FaUserInjured,
    FaHospital,
} from "react-icons/fa";

export default function Dashboard() {
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const router = useRouter();

    // Example hospital data (replace with real data from your store/api)
    const stats = {
        doctors: 42,
        patients: 128,
        appointments: 56,
        bedsAvailable: 18,
        departments: 7,
    };

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Hospital Dashboard</h1>
                    <p className="text-blue-200">Welcome, {user?.name || user?.email || "User"}!</p>
                </div>
                <div className="bg-blue-800 rounded-lg px-6 py-3 shadow text-right">
                    <p className="text-sm text-blue-200">Role: <span className="font-semibold text-white">{user?.role || "Unknown"}</span></p>
                    <p className="text-sm text-blue-200">Status: <span className="font-semibold text-green-400">{user?.status || "Active"}</span></p>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    icon={<FaUserMd className="text-3xl text-blue-500" />}
                    label="Doctors"
                    value={stats.doctors}
                />
                <StatCard
                    icon={<FaUserInjured className="text-3xl text-pink-400" />}
                    label="Patients"
                    value={stats.patients}
                />
                <StatCard
                    icon={<FaCalendarCheck className="text-3xl text-green-400" />}
                    label="Appointments"
                    value={stats.appointments}
                />
                <StatCard
                    icon={<FaProcedures className="text-3xl text-yellow-400" />}
                    label="Beds Available"
                    value={stats.bedsAvailable}
                />
                <StatCard
                    icon={<FaHospital className="text-3xl text-purple-400" />}
                    label="Departments"
                    value={stats.departments}
                />
            </section>

            <section className="bg-blue-800 rounded-lg shadow-lg p-8 text-white max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileField label="Name" value={user?.name || "-"} />
                    <ProfileField label="Email" value={user?.email || "-"} />
                    <ProfileField label="Gender" value={user?.gender || "-"} />
                    <ProfileField label="Age" value={user?.age || "-"} />
                </div>
            </section>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
    return (
        <div className="flex items-center bg-blue-800 rounded-lg shadow p-6">
            <div className="mr-4">{icon}</div>
            <div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-blue-200">{label}</div>
            </div>
        </div>
    );
}

function ProfileField({ label, value }: { label: string; value: string | number }) {
    return (
        <div>
            <div className="text-blue-300 text-sm">{label}</div>
            <div className="font-semibold">{value}</div>
        </div>
    );
}
