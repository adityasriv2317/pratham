"use client";

import Layout from "@/components/Layout";
import DoctorDashboard from "./dashboard";
import React from "react";

const DoctorDashboardPage = () => {
  return (
    <Layout role="doctor">
      <DoctorDashboard />
    </Layout>
  );
};

export default DoctorDashboardPage;
