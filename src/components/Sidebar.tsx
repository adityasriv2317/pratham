"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Hospital,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  FileText,
  Folder,
  CreditCard,
  BarChart2,
  User,
  ClipboardList,
  BookOpen,
  FlaskConical,
  MessageCircle,
  BedDouble,
  Contact,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "admin" | "doctor" | "staff" | "patient";

interface SidebarProps {
  role: Role;
}

// Add icon property to each menu item
const menuItems: Record<
  Role,
  { label: string; href: string; icon: React.ElementType }[]
> = {
  admin: [
    { label: "Dashboard", href: "/admin/dashboard", icon: BarChart2 },
    { label: "Manage Users", href: "/admin/users", icon: Users },
    { label: "Appointments", href: "/admin/appointments", icon: Calendar },
    { label: "Departments", href: "/admin/departments", icon: Folder },
    { label: "Billing", href: "/admin/billing", icon: CreditCard },
    { label: "Reports", href: "/admin/reports", icon: FileText },
  ],
  doctor: [
    { label: "Dashboard", href: "/doctor/dashboard", icon: BarChart2 },
    { label: "My Patients", href: "/doctor/patients", icon: User },
    { label: "Appointments", href: "/doctor/appointments", icon: Calendar },
    {
      label: "Prescriptions",
      href: "/doctor/prescriptions",
      icon: ClipboardList,
    },
    { label: "Lab Reports", href: "/doctor/reports", icon: FlaskConical },
  ],
  staff: [
    { label: "Dashboard", href: "/staff/dashboard", icon: BarChart2 },
    { label: "Patient Check-In", href: "/staff/checkin", icon: BookOpen },
    { label: "Appointments", href: "/staff/appointments", icon: Calendar },
    { label: "Bed Management", href: "/staff/bed-management", icon: BedDouble },
    { label: "Billing", href: "/staff/billing", icon: CreditCard },
  ],
  patient: [
    { label: "Dashboard", href: "/dashboard/patient", icon: BarChart2 },
    { label: "Book Appointment", href: "/patient/book", icon: Calendar },
    { label: "My Records", href: "/patient/records", icon: FileText },
    { label: "Lab Reports", href: "/patient/labs", icon: FlaskConical },
    { label: "Payments", href: "/patient/payments", icon: CreditCard },
    { label: "Contact Doctor", href: "/patient/contact", icon: MessageCircle },
  ],
};

const darkBlue = "bg-[#0a2540]"; // Dark blue background
const darkBlueHover = "hover:bg-[#163e6c]";
const lightBlue = "bg-[#1a4f8c]";
const textLight = "text-white";
const textMuted = "text-blue-100";

const Sidebar = ({ role }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar
  const [desktopOpen, setDesktopOpen] = useState(true); // desktop sidebar
  const pathname = usePathname();

  const renderLinks = () => (
    <>
      {menuItems[role].map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
              textLight,
              darkBlueHover,
              pathname === item.href
                ? "bg-blue-900 font-semibold"
                : "font-normal"
            )}
            onClick={() => setIsOpen(false)}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div
        className={cn(
          "md:hidden flex items-center justify-between p-4",
          darkBlue,
          "sticky top-0 z-50"
        )}
      >
        <div className="flex items-center gap-2">
          <Hospital className="h-7 w-7 text-blue-200" />
          <h1 className={cn("text-xl font-bold", textLight)}>pratham</h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className={cn("p-2 rounded", darkBlueHover, textLight)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "hidden md:flex flex-col justify-between z-40 top-0 left-0 h-full transition-all",
          desktopOpen ? "w-64" : "w-16",
          darkBlue,
          "border-r border-blue-900 shadow-sm"
        )}
        style={{ transition: "width 0.3s" }}
      >
        <div>
          <div className="flex items-center w-full justify-center gap-2 p-4 text-2xl font-bold text-blue-100">
            <Hospital className="h-8 w-8 text-blue-200" />
            {desktopOpen && <span>pratham</span>}
          </div>
          <nav
            className={cn(
              "mt-4 flex flex-col space-y-2",
              desktopOpen && "px-4"
            )}
          >
            {desktopOpen
              ? menuItems[role].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4  py-2 rounded-md transition-colors",
                        textLight,
                        darkBlueHover,
                        pathname === item.href
                          ? "bg-blue-900 font-semibold"
                          : "font-normal"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })
              : // Only show icons when collapsed
                menuItems[role].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center h-10 w-10 mx-auto rounded-md transition-colors",
                        textLight,
                        darkBlueHover,
                        pathname === item.href
                          ? "bg-blue-900 font-semibold"
                          : "font-normal"
                      )}
                      title={item.label}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
          </nav>
        </div>
        <div className="p-4 border-t border-blue-900 flex items-center justify-between">
          {desktopOpen ? (
            <Link
              href="/profile"
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2 rounded-md transition-colors",
                textLight,
                darkBlueHover
              )}
            >
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
          ) : (
            <Link
              href="/profile"
              className={cn(
                "flex items-center px-2 justify-center h-10 w-10 rounded-md transition-colors",
                textLight,
                darkBlueHover
              )}
              title="My Profile"
            >
              <span className="sr-only">My Profile</span>
              <User className="h-5 w-5" />
            </Link>
          )}
          {/* Toggle button */}
          <button
            onClick={() => setDesktopOpen((v) => !v)}
            aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
            className={cn(
              "p-2 rounded transition-colors",
              darkBlueHover,
              desktopOpen && "ml-2",
              lightBlue,
              textLight,
              "border border-blue-900"
            )}
            type="button"
          >
            {desktopOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed z-50 top-0 left-0 h-full w-64 flex flex-col justify-between transition-transform md:hidden",
          darkBlue,
          "border-r border-blue-900 shadow-lg",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ transition: "transform 0.3s" }}
      >
        <div>
          <div className="flex items-center gap-2 p-4 text-2xl font-bold text-blue-100">
            <Hospital className="h-8 w-8 text-blue-200" />
            pratham
          </div>
          <nav className="mt-4 flex flex-col space-y-2 px-4">
            {menuItems[role].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                    textLight,
                    darkBlueHover,
                    pathname === item.href
                      ? "bg-blue-900 font-semibold"
                      : "font-normal"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-blue-900">
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-3 w-full px-4 py-2 rounded-md transition-colors",
              textLight,
              darkBlueHover
            )}
            onClick={() => setIsOpen(false)}
          >
            <User className="h-5 w-5" />
            <span>My Profile</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
