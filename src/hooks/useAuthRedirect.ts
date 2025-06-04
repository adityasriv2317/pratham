import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";

export function useAuthRedirect() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const getLoginStat = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/relogin", {
        withCredentials: true,
      });
      if (res.data.user) {
        return res.data.user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getLoginStat();

      if (!isAuthenticated && user) {
        router.push(`/dashboard/${user.role}`);
      } else if (!isAuthenticated && !user) {
        router.push("/login");
      } else {
        router.push("/home");
      }
    };

    checkAuth();
  }, [isAuthenticated, router, getLoginStat]);
}
