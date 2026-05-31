import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { ReferralTracker } from "@/components/layout/referral-tracker";
import { AutoRefresh } from "@/components/auto-refresh";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AutoRefresh interval={5000} />
      {/* Tracker for referral link code in URL (?ref=CODE) */}
      <ReferralTracker />

      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="flex-grow w-full max-w-full overflow-x-hidden">{children}</div>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
}
