"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";

interface ReceiptProps {
  customerName: string;
  customerPhone: string;
  items: any[];
  discount: number;
  total: number;
  paymentMethod: string;
}

export default function Receipt({
  customerName,
  customerPhone,
  items,
  discount,
  total,
  paymentMethod,
}: ReceiptProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Struk_Sneapici_${new Date().getTime()}`,
  });

  const subtotal = total + discount;
  const invoiceId = `INV-${new Date().getTime().toString().slice(-8)}`;
  const dateStr = new Date().toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* ── Trigger Button ── */}
      <button
        onClick={() => handlePrint()}
        className="flex-1 py-4 bg-[#FAFAF8] border border-[#3B2211]/8 text-[#3B2211] rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-[#3B2211]/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-sm"
      >
        <Printer size={16} />
        Cetak Struk
      </button>

      {/* ── Hidden Print Content ── */}
      <div style={{ display: "none" }}>
        <div
          ref={componentRef}
          style={{
            padding: "24px 16px",
            backgroundColor: "#fff",
            color: "#000",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "11px",
            width: "80mm",
            lineHeight: "1.6",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "4px", marginBottom: "4px" }}>
              SNEAPICI
            </div>
            <div style={{ fontSize: "10px", letterSpacing: "2px", marginBottom: "2px" }}>STUDIO FOTO PROFESIONAL</div>
            <div style={{ borderTop: "1px solid #000", marginTop: "8px", paddingTop: "8px", fontSize: "9px" }}>
              <div>Jl. Contoh No. 123, Kota Anda</div>
              <div>WhatsApp: 0812-3456-7890</div>
              <div>Instagram: @sneapici.studio</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px dashed #000", marginBottom: "10px" }} />

          {/* Transaction Info */}
          <div style={{ marginBottom: "12px", fontSize: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>No. Invoice</span>
              <span style={{ fontWeight: 700 }}>{invoiceId}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Tanggal</span>
              <span>{dateStr}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Kasir</span>
              <span>Admin #01</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Pelanggan</span>
              <span style={{ fontWeight: 700 }}>{customerName || "Pelanggan Umum"}</span>
            </div>
            {customerPhone && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>No. HP</span>
                <span>{customerPhone}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px dashed #000", marginBottom: "10px" }} />

          {/* Items */}
          <div style={{ marginBottom: "12px" }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "6px" }}>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#444" }}>
                  <span>
                    {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                  </span>
                  <span>Rp {(item.qty * item.price).toLocaleString("id-ID")}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px dashed #000", marginBottom: "10px" }} />

          {/* Totals */}
          <div style={{ marginBottom: "12px", fontSize: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Diskon</span>
                <span>- Rp {discount.toLocaleString("id-ID")}</span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 900,
                fontSize: "13px",
                borderTop: "1px solid #000",
                paddingTop: "6px",
                marginTop: "6px",
              }}
            >
              <span>TOTAL</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Payment */}
          <div style={{ fontSize: "10px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Metode Bayar</span>
              <span style={{ fontWeight: 700 }}>{paymentMethod}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Status</span>
              <span style={{ fontWeight: 900, letterSpacing: "1px" }}>✓ LUNAS</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px dashed #000", marginBottom: "14px" }} />

          {/* Footer */}
          <div style={{ textAlign: "center", fontSize: "9px", lineHeight: "1.8", color: "#555" }}>
            <div>— Terima kasih atas kunjungan Anda —</div>
            <div>Hasil foto terbaik hanya di Sneapici Studio</div>
            <div style={{ marginTop: "6px", fontWeight: 700, letterSpacing: "1px" }}>www.sneapici.studio</div>
          </div>
        </div>
      </div>
    </>
  );
}
