"use client";

import { Suspense } from "react";
import BookingFlow from "./booking-flow";

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-[#888888] text-sm">Memuat...</div>
      </div>
    }>
      <BookingFlow />
    </Suspense>
  );
}
