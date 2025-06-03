import { useEffect } from "react";
import { useRouter } from "next/router";

// get user role from redux auth
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Define a User type with a role property
type User = {
  role?: string;
};

export default function DashboardIndex() {
  const router = useRouter();
  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as unknown as User;
  const role = user?.role || "patient";

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to login");
      router.push("/alok/login");
    } else if (user?.role) {
      router.replace(`/dashboard/${role}`);
    }
  }, [router, isAuthenticated, user?.role]);

  useEffect(() => {
    router.replace(`/dashboard/${role}`);
  }, []);

  return null;
}
