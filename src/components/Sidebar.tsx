"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "admin" | "doctor" | "staff" | "patient";

interface SidebarProps {
  role: Role;
}

const menuItems = {
  admin: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Manage Users", href: "/admin/users" },
    { label: "Appointments", href: "/admin/appointments" },
    { label: "Departments", href: "/admin/departments" },
    { label: "Billing", href: "/admin/billing" },
    { label: "Reports", href: "/admin/reports" },
  ],
  doctor: [
    { label: "Dashboard", href: "/doctor/dashboard" },
    { label: "My Patients", href: "/doctor/patients" },
    { label: "Appointments", href: "/doctor/appointments" },
    { label: "Prescriptions", href: "/doctor/prescriptions" },
    { label: "Lab Reports", href: "/doctor/reports" },
  ],
  staff: [
    { label: "Dashboard", href: "/staff/dashboard" },
    { label: "Patient Check-In", href: "/staff/checkin" },
    { label: "Appointments", href: "/staff/appointments" },
    { label: "Bed Management", href: "/staff/bed-management" },
    { label: "Billing", href: "/staff/billing" },
  ],
  patient: [
    { label: "Dashboard", href: "/patient/dashboard" },
    { label: "Book Appointment", href: "/patient/book" },
    { label: "My Records", href: "/patient/records" },
    { label: "Lab Reports", href: "/patient/labs" },
    { label: "Payments", href: "/patient/payments" },
    { label: "Contact Doctor", href: "/patient/contact" },
  ],
};

const Sidebar = ({ role }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const renderLinks = () => (
    <>
      {menuItems[role].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100",
            pathname === item.href ? "bg-blue-200 font-semibold" : ""
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">HospitalSys</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar (mobile and desktop) */}
      <aside
        className={cn(
          "fixed z-40 top-0 left-0 h-full w-64 bg-white border-r shadow-sm flex flex-col justify-between transition-transform",
          "md:translate-x-0", // Always visible on md+
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:static md:flex"
        )}
      >
        <div>
          <div className="hidden md:block p-4 text-2xl font-bold text-blue-600">
            HospitalSys
          </div>
          <nav className="mt-4 flex flex-col space-y-2 px-4">
            {renderLinks()}
          </nav>
        </div>

        {/* Profile button */}
        <div className="p-4 border-t">
          <Link
            href="/profile"
            className="block w-full px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100"
          >
            My Profile
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
