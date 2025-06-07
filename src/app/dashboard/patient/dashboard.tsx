import Link from "next/link";
import {
  Calendar,
  FileText,
  CreditCard,
  Activity,
  UserCircle,
  Stethoscope,
} from "lucide-react";

const patientLinks = [
  {
    icon: Calendar,
    title: "Appointments",
    desc: "View and manage your appointments.",
    href: "/patient/book",
    cta: "Book/View Appointments",
  },
  {
    icon: FileText,
    title: "Medical Records",
    desc: "Access your medical history and records.",
    href: "/patient/records",
    cta: "View Records",
  },
  {
    icon: Stethoscope,
    title: "Instant Checkup",
    desc: "Instant AI Checkup.",
    href: "/patient/aicheckup",
    cta: "AI Checkup",
  },
];

const PatientDashboard = () => {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <UserCircle className="h-14 w-14 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-1">Welcome!</h1>
          <p className="text-blue-700 text-lg">
            Access your appointments, records, and billing in one place.
          </p>
        </div>
      </div>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          Patient Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientLinks.map(({ icon: Icon, title, desc, href, cta }) => (
            <div
              key={title}
              className="bg-white shadow rounded-xl p-6 border border-blue-900 flex flex-col justify-between h-full"
            >
              <div>
                <Icon className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="text-xl font-semibold text-blue-800 mb-1">
                  {title}
                </h3>
                <p className="text-blue-900/70 mb-4 text-sm">{desc}</p>
              </div>
              <Link
                href={href}
                className="mt-auto inline-block text-blue-600 font-semibold hover:underline text-sm"
              >
                {cta} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          Recent Activity
        </h2>
        <ul className="bg-white shadow rounded-xl p-4 border border-blue-900 divide-y divide-blue-100">
          <li className="py-3 flex items-center gap-2 text-blue-900">
            <Activity className="h-5 w-5 text-blue-400" /> Appointment with Dr.
            Smith on 2023-10-01.
          </li>
          <li className="py-3 flex items-center gap-2 text-blue-900">
            <FileText className="h-5 w-5 text-blue-400" /> Prescription refilled
            on 2023-09-25.
          </li>
          <li className="py-3 flex items-center gap-2 text-blue-900">
            <CreditCard className="h-5 w-5 text-blue-400" /> Bill payment of
            $150 completed on 2023-09-20.
          </li>
        </ul>
      </section> */}
    </main>
  );
};

export default PatientDashboard;
