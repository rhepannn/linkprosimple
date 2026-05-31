import { site } from "@/data/site";
import { env } from "@/lib/env";

export type WaContext = "general" | "package" | "gallery" | "checkout" | "affiliate";

/**
 * Generate WhatsApp URL dengan pesan template sesuai konteks.
 *
 * @param context  - Konteks pesan: "general" | "package" | "gallery"
 * @param packageName - Nama paket (hanya untuk context "package")
 * @returns URL wa.me yang langsung membuka chat dengan pesan terisi,
 *          atau "#" jika nomor WA belum dikonfigurasi.
 *
 * @example
 * <a href={getWhatsAppUrl('package', 'Paket Couple')} target="_blank">
 *   Tanya via WhatsApp
 * </a>
 */
export function getWhatsAppUrl(
  context: WaContext,
  data?: any
): string {
  const WA = site.contact.whatsapp;

  // Validasi: jika nomor belum dikonfigurasi, kembalikan "#" sebagai fallback
  if (!WA || WA.length < 10) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Snapp.frame] Nomor WhatsApp belum dikonfigurasi di data/site.ts"
      );
    }
    return "#";
  }

  let message = "";
  switch (context) {
    case "general":
      message = "Halo Snapp.frame Studio! Saya tertarik untuk sesi foto. Boleh tanya-tanya dulu?";
      break;
    case "gallery":
      message = "Halo Snapp.frame Studio! Saya lihat galeri fotonya dan tertarik. Bisa info lebih lanjut?";
      break;
    case "package":
      message = `Halo Snapp.frame Studio! Saya tertarik dengan ${data ?? "paket foto"} yang ada di website. Bisa info lebih lanjut?`;
      break;
    case "affiliate":
      message = `Halo Snapp.frame Studio! 👋\n\nSaya tertarik untuk mendaftar sebagai *Affiliate Partner* Snapp.frame.\n\nNama: ${data?.name ?? "-"}\nInstagram: ${data?.instagram ?? "-"}\nNo. HP: ${data?.phone ?? "-"}\n\nMohon info lebih lanjut mengenai program affiliate. Terima kasih! 🙏`;
      break;
    case "checkout":
      if (data) {
        message = `Halo Snapp.frame Studio! Saya ingin konfirmasi pembayaran untuk pesanan:\n\n*ID Pesanan:* ${data.id}\n*Total:* Rp ${data.total?.toLocaleString("id-ID")}\n*Metode:* ${data.method}\n\n*Item:* \n${data.items?.map((item: any) => `- ${item.name} x${item.qty}`).join("\n")}\n\nTerima kasih!`;
      } else {
        message = "Halo Snapp.frame Studio! Saya ingin konfirmasi pembayaran.";
      }
      break;
  }

  const msg = encodeURIComponent(message);
  return `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${msg}`;
}
