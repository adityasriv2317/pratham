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
  LogOut,
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
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

type Role = "admin" | "doctor" | "staff" | "patient";

interface SidebarProps {
  role: Role;
}

const GeminiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <circle cx="16" cy="16" r="16" fill="#1A73E8" />
    <path
      d="M10.5 10.5c0-1.933 1.567-3.5 3.5-3.5h4c1.933 0 3.5 1.567 3.5 3.5v11c0 1.933-1.567 3.5-3.5 3.5h-4c-1.933 0-3.5-1.567-3.5-3.5v-11Z"
      fill="#fff"
      stroke="#4285F4"
      strokeWidth="1.5"
    />
    <path
      d="M12 12h8M12 20h8"
      stroke="#4285F4"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Add icon property to each menu item
const menuItems: Record<
  Role,
  { label: string; href: string; icon: React.ElementType }[]
> = {
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: BarChart2 },
    { label: "Manage Users", href: "/admin/users", icon: Users },
    { label: "Appointments", href: "/admin/appointments", icon: Calendar },
    { label: "Departments", href: "/admin/departments", icon: Stethoscope },
    // { label: "Billing", href: "/admin/billing", icon: CreditCard },
    // { label: "Reports", href: "/admin/reports", icon: FileText },
  ],
  doctor: [
    { label: "Dashboard", href: "/dashboard/doctor", icon: BarChart2 },
    { label: "My Patients", href: "/doctor/patients", icon: User },
    { label: "My Schedule", href: "/doctor/schedule", icon: Calendar },
    // {
    //   label: "Prescriptions",
    //   href: "/doctor/prescriptions",
    //   icon: ClipboardList,
    // },
    // { label: "Lab Reports", href: "/doctor/reports", icon: FlaskConical },
  ],
  staff: [
    { label: "Dashboard", href: "/dashboard/staff", icon: BarChart2 },
    { label: "Patient Check-In", href: "/staff/checkin", icon: BookOpen },
    { label: "Appointments", href: "/staff/appointments", icon: Calendar },
    { label: "Bed Management", href: "/staff/bed-management", icon: BedDouble },
    { label: "Billing", href: "/staff/billing", icon: CreditCard },
  ],
  patient: [
    { label: "Dashboard", href: "/dashboard/patient", icon: BarChart2 },
    { label: "Book Appointment", href: "/patient/book", icon: Calendar },
    { label: "My Records", href: "/patient/records", icon: FileText },
    { label: "Instant Checkup", href: "/patient/aicheckup", icon: GeminiIcon },
    // { label: "Lab Reports", href: "/patient/labs", icon: FlaskConical },
    // { label: "Payments", href: "/patient/payments", icon: CreditCard },
    // { label: "Contact Doctor", href: "/patient/contact", icon: MessageCircle },
  ],
};

const darkBlue = "bg-[#0a2540]"; // Dark blue background
const darkBlueHover = "hover:bg-[#163e6c]";
const lightBlue = "bg-[#1a4f8c]";
const textLight = "text-white";
// const textMuted = "text-blue-100";

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

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div
        className={cn(
          "md:hidden h-fit w-full flex items-center justify-between p-4",
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
          className={cn(
            "p-2 rounded",
            darkBlueHover,
            textLight,
            isOpen ? "hidden" : ""
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6 hidden" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "hidden md:flex flex-col justify-between z-40 top-0 left-0 h-full transition-all",
          desktopOpen ? "w-64" : "w-16",
          darkBlue,
          "shadow-sm"
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
            <div className="flex flex-col items-center gap-0.5 w-full py-0 rounded-md transition-colors">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className={cn(
                  "flex items-center gap-2 cursor-pointer w-full px-4 py-2 rounded-md transition-colors",
                  darkBlueHover,
                  textLight
                )}
                type="button"
              >
                <LogOut className="h-5 w-5 text-red-600 ml-0.5" />
                <span className="text-red-400">Logout</span>
              </button>
              <Link
                href="/profile"
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-2 rounded-md transition-colors",
                  textLight,
                  darkBlueHover
                )}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <div className="">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className={cn(
                  "flex items-center justify-center h-10 w-10 rounded-md transition-colors",
                  textLight,
                  darkBlueHover
                )}
                type="button"
              >
                <LogOut className="h-5 w-5 text-red-600 " />
              </button>
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
            </div>
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
          "fixed inset-0 z-40 bg-gray-950/90 bg-opacity-40 transition-opacity md:hidden",
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
          {/* Close button for mobile sidebar */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 text-2xl font-bold text-blue-100">
              <Hospital className="h-8 w-8 text-blue-200" />
              pratham
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className={cn("p-2 rounded", darkBlueHover, textLight, lightBlue)}
            >
              <X className="h-4 w-4" />
            </button>
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
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className={cn(
              "flex items-center gap-2 w-full px-4 py-2 rounded-md transition-colors",
              darkBlueHover,
              textLight
            )}
            type="button"
          >
            <LogOut className="h-5 w-5 text-red-600 ml-0.5" />
            <span className="text-red-400">Logout</span>
          </button>
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
