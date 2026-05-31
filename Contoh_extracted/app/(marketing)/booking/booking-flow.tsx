"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { Package, packages } from "@/data/packages";
import { getProducts } from "@/app/actions/products";
import { ReferralCode } from "@/lib/referral";
import { BookingFormData } from "./step2-personal";
import { PaymentMethod } from "./step4-payment";
import Step1Package from "./step1-package";
import Step2PersonalData from "./step2-personal";
import Step3Summary from "./step3-summary";
import Step4Payment from "./step4-payment";
import Step5Receipt from "./step5-receipt";
import { getSiteSettings } from "@/app/actions/settings";

const STEPS = ["Paket", "Data Diri", "Ringkasan", "Bayar", "Selesai"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 sm:mb-14 px-4 overflow-x-auto">
      {STEPS.map((label, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              {/* Circle */}
              <div className={[
                "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0",
                isDone
                  ? "bg-[#C88A58] text-white"
                  : isActive
                    ? "bg-[#3B2211] text-white ring-4 ring-[#3B2211]/15"
                    : "bg-[#E8E4E0] text-[#A0907E]"
              ].join(" ")}>
                {isDone ? <Check size={14} strokeWidth={3} /> : <span>{i + 1}</span>}
              </div>
              {/* Label */}
              <span className={[
                "text-[9px] sm:text-[10px] whitespace-nowrap tracking-wide",
                isActive ? "text-[#3B2211] font-black" : isDone ? "text-[#C88A58] font-bold" : "text-[#C0B8B0] font-medium"
              ].join(" ")}>
                {label}
              </span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div className={[
                "h-px w-8 sm:w-12 mx-1 mb-4 flex-shrink-0 transition-all duration-500",
                isDone ? "bg-[#C88A58]" : "bg-[#E8E4E0]"
              ].join(" ")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BookingFlow() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "", whatsapp: "", date: "", time: "", notes: ""
  });
  const [referral, setReferral] = useState<ReferralCode | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const [packagesList, setPackagesList] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAutoAdvanced, setHasAutoAdvanced] = useState(false);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadSiteSettings() {
      try {
        const data = await getSiteSettings();
        setSiteSettings(data);
      } catch (err) {
        console.error("Gagal memuat pengaturan website:", err);
      }
    }
    loadSiteSettings();
  }, []);

  useEffect(() => {
    async function loadDbPackages() {
      try {
        const res = await getProducts();
        if (res.success && res.data && res.data.length > 0) {
          const studio = res.data.filter((p: any) => {
            const cat = p.category.toLowerCase();
            return cat.includes("foto") || cat === "layanan" || p.sku.startsWith("pkg-") || p.sku.startsWith("STUDIO-");
          });
          setPackagesList(studio.length > 0 ? (studio as any[]) : packages);
        } else {
          setPackagesList(packages);
        }
      } catch (err) {
        console.error("Gagal memuat paket dari database, fallback ke statis:", err);
        setPackagesList(packages);
      } finally {
        setLoading(false);
      }
    }
    loadDbPackages();
  }, []);

  // Auto-select package and auto-advance to step 1 (Data Diri) if pkg matches
  useEffect(() => {
    if (loading || hasAutoAdvanced || packagesList.length === 0) return;
    const pkgId = searchParams.get("pkg");
    if (pkgId) {
      const found = packagesList.find((p) => p.id === pkgId || (p as any).sku === pkgId);
      if (found) {
        setSelectedPkg(found);
        setStep(1); // Langsung ke langkah "Data Diri"
        setHasAutoAdvanced(true);
      }
    }
  }, [loading, packagesList, hasAutoAdvanced, searchParams]);

  function reset() {
    setStep(0);
    setSelectedPkg(null);
    setFormData({ name: "", whatsapp: "", date: "", time: "", notes: "" });
    setReferral(null);
    setPaymentMethod(null);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="pt-28 pb-20 lg:pt-36 max-w-2xl mx-auto px-5 sm:px-8">
        {/* Page header */}
        <div className="mb-8 text-center">
          <p className="text-[10px] font-black tracking-[0.35em] text-[#C88A58] uppercase mb-2">
            Booking Sesi Foto
          </p>
          <h1
            className="text-3xl sm:text-4xl font-black text-[#3B2211]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Snapp.frame Studio
          </h1>
          <p className="text-sm text-gray-400 font-medium mt-2">Pilih paket & jadwalkan sesi foto Anda</p>
        </div>

        <StepIndicator current={step} />

        {/* Step panels */}
        {step === 0 && (
          <Step1Package
            packagesList={packagesList}
            loading={loading}
            selected={selectedPkg}
            onSelect={setSelectedPkg}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <Step2PersonalData
            data={formData}
            onChange={setFormData}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && selectedPkg && (
          <Step3Summary
            pkg={selectedPkg}
            formData={formData}
            referral={referral}
            onReferralChange={setReferral}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step4Payment
            selected={paymentMethod}
            onSelect={setPaymentMethod}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && selectedPkg && paymentMethod && (
          <Step5Receipt
            pkg={selectedPkg}
            formData={formData}
            referral={referral}
            paymentMethod={paymentMethod}
            onReset={reset}
            siteSettings={siteSettings}
          />
        )}
      </div>
    </main>
  );
}
