"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useEffect } from "react";

export default function Home() {
  
  useAuthRedirect();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-20 w-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
