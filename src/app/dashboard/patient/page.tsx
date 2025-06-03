"use client";
import Layout from "@/components/Layout";
import PatientDashboard from "./dashboard";
import React from "react";

import { usePathname, useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  return (
    <Layout role="patient">
        <PatientDashboard />
    </Layout>
  );
};

export default Dashboard;
