import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCircle, Users, FileText, Settings, Activity, ShieldCheck, LogIn } from "lucide-react";
import axios from "@/utils/axios";

const roleDescriptions = [
  {
    icon: Users,
    title: "User Management",
    desc: "Create, edit, and remove user accounts. Assign roles and manage permissions for doctors, staff, and patients.",
    href: "/admin/users",
    cta: "Manage Users"
  },
  {
    icon: FileText,
    title: "Reports",
    desc: "Access and generate system-wide reports for appointments, billing, and more.",
    href: "/admin/appointments",
    cta: "View Reports"
  },
  {
    icon: Settings,
    title: "Settings",
    desc: "Configure hospital departments, system preferences, and security settings.",
    href: "/admin/departments",
    cta: "Configure Settings"
  },
  {
    icon: ShieldCheck,
    title: "Audit & Security",
    desc: "Monitor system activity, review logs, and ensure compliance.",
    href: "/admin/audit",
    cta: "Audit Logs"
  },
];

const AdminDashboard = () => {
  const [user, setUser] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    axios.get("/api/users/profile", { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <main className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <UserCircle className="h-14 w-14 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-1">
            Welcome{user?.name ? `, ${user.name}` : ""}!
          </h1>
          <p className="text-blue-700 text-lg">You are logged in as <span className="font-semibold">Admin</span>.</p>
        </div>
      </div>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Admin Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleDescriptions.map(({ icon: Icon, title, desc, href, cta }) => (
            <div key={title} className="bg-white shadow rounded-xl p-6 border border-blue-100 flex flex-col justify-between h-full">
              <div>
                <Icon className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="text-xl font-semibold text-blue-800 mb-1">{title}</h3>
                <p className="text-blue-700 mb-4 text-sm">{desc}</p>
              </div>
              <Link href={href} className="mt-auto inline-block text-blue-600 font-semibold hover:underline text-sm">
                {cta} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Recent Activity</h2>
        <ul className="bg-white shadow rounded-xl p-4 border border-blue-100 divide-y divide-blue-50">
          <li className="py-3 flex items-center gap-2 text-blue-700">
            <Activity className="h-5 w-5 text-blue-400" /> User JohnDoe updated permissions.
          </li>
          <li className="py-3 flex items-center gap-2 text-blue-700">
            <LogIn className="h-5 w-5 text-blue-400" /> System backup completed.
          </li>
          <li className="py-3 flex items-center gap-2 text-blue-700">
            <Users className="h-5 w-5 text-blue-400" /> New user JaneSmith registered.
          </li>
        </ul>
      </section>
    </main>
  );
};

export default AdminDashboard;
