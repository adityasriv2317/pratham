"use client";

import Layout from "@/components/Layout";
import React from "react";  
import AdminDashboard from "./dashboard";

const AdminDashboardPage = () => {
  return (
    <Layout role="admin">
      <AdminDashboard />
    </Layout>
  );
};

export default AdminDashboardPage;
