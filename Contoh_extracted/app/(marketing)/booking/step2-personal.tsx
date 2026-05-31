"use client";

import { btn } from "@/lib/button-classes";

export interface BookingFormData {
  name: string;
  whatsapp: string;
  date: string;
  time: string;
  notes: string;
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
];

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

const inputClass = [
  "w-full px-4 py-3 rounded-xl border border-[#E0E0DA] bg-white",
  "text-sm text-[#1A1A1A] placeholder-[#C0C0BC]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-0",
  "transition-colors duration-150",
].join(" ");

const labelClass = "block text-xs font-semibold text-[#5A5A5A] uppercase tracking-[0.1em] mb-1.5";

interface Step2Props {
  data: BookingFormData;
  onChange: (data: BookingFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2PersonalData({ data, onChange, onNext, onBack }: Step2Props) {
  const update = (field: keyof BookingFormData, value: string) =>
    onChange({ ...data, [field]: value });

  const isValid =
    data.name.trim().length >= 2 &&
    data.whatsapp.trim().length >= 9 &&
    data.date !== "" &&
    data.time !== "";

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-medium tracking-[0.15em] text-[#888888] uppercase mb-2">
          Langkah 2 dari 5
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-heading)" }}>
          Data Diri
        </h2>
        <p className="text-[#5A5A5A] text-sm mt-2">
          Isi informasi lengkap agar tim kami bisa mengonfirmasi sesi Anda.
        </p>
      </div>

      <div className="space-y-5 mb-8">
        <div>
          <label htmlFor="booking-name" className={labelClass}>Nama Lengkap *</label>
          <input
            id="booking-name"
            type="text"
            placeholder="Masukkan nama lengkap"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="booking-wa" className={labelClass}>Nomor WhatsApp *</label>
          <input
            id="booking-wa"
            type="tel"
            placeholder="08xxxxxxxxxx"
            value={data.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="booking-date" className={labelClass}>Tanggal Sesi *</label>
            <input
              id="booking-date"
              type="date"
              min={getTomorrowDate()}
              value={data.date}
              onChange={(e) => update("date", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="booking-time" className={labelClass}>Jam Mulai *</label>
            <select
              id="booking-time"
              value={data.time}
              onChange={(e) => update("time", e.target.value)}
              className={inputClass}
            >
              <option value="">Pilih jam</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t} WIB</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="booking-notes" className={labelClass}>
            Catatan <span className="text-[#C0C0BC] font-normal normal-case tracking-normal">(opsional)</span>
          </label>
          <textarea
            id="booking-notes"
            rows={3}
            placeholder="Tema khusus, permintaan properti, dll."
            value={data.notes}
            onChange={(e) => update("notes", e.target.value)}
            className={[inputClass, "resize-none"].join(" ")}
          />
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <button onClick={onBack} className={[btn.secondary, "rounded-xl"].join(" ")}>
          Kembali
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={[btn.primary, "rounded-xl px-8 disabled:opacity-40 disabled:cursor-not-allowed"].join(" ")}
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}
