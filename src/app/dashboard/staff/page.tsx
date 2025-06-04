import Layout from "@/components/Layout";
import React from "react";
import StaffDashboard from "./dashboard";

const StaffDashboardPage: React.FC = () => {
  return (
    <Layout role="staff">
      <StaffDashboard />
    </Layout>
  );
};

export default StaffDashboardPage;
