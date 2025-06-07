import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserCircle,
  Calendar,
  FlaskConical,
  FileText,
  Users,
  MessageCircle,
} from "lucide-react";
import axios from "@/utils/axios";

const quickActions = [
  {
    icon: Calendar,
    label: "View Appointments",
    href: "/doctor/schedule",
  },
  //   {
  //     icon: FlaskConical,
  //     label: "Check Lab Results",
  //     href: "/doctor/labs",
  //   },
  {
    icon: FileText,
    label: "Patient Records",
    href: "/doctor/patients",
  },
  //   {
  //     icon: MessageCircle,
  //     label: "Messages",
  //     href: "/doctor/messages",
  //   },
];

const DoctorDashboard = () => {
  const [user, setUser] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    axios
      .get("/api/users/profile", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <main className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <UserCircle className="h-14 w-14 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-1">
            Welcome{user?.name ? `, Dr. ${user.name}` : ", Doctor"}!
          </h1>
          <p className="text-blue-700 text-lg">
            Here’s your daily overview and quick access to your most important
            tools.
          </p>
        </div>
      </div>
      <section className="my-10">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-900">
          Quick Actions
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {quickActions.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-white shadow rounded-xl p-6 border border-blue-100 flex flex-col items-center hover:bg-blue-50 transition"
            >
              <Icon className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-blue-800 font-semibold mb-1">{label}</span>
              <span className="text-blue-600 text-xs mt-2">Go &rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DoctorDashboard;
