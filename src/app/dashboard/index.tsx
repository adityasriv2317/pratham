import { useEffect } from "react";
import { useRouter } from "next/router";

// Example: Replace with actual role logic from session/context
const fakeUserRole = "admin"; // or "doctor", "staff", "patient"

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/dashboard/${fakeUserRole}`);
  }, [router]);

  return null;
}
