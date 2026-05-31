// app/api/admin/upload/route.ts
// Server-side file upload ke Supabase Storage
// Menggunakan service role key jika tersedia, fallback ke anon key

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      return NextResponse.json({ error: "Supabase URL tidak dikonfigurasi" }, { status: 500 });
    }

    // Gunakan service role key jika ada & bukan publishable key (publishable key tidak bisa dipakai server-side)
    const isValidServiceKey =
      serviceRoleKey &&
      !serviceRoleKey.startsWith("sb_publishable_") &&
      serviceRoleKey.length > 100;

    const authKey = isValidServiceKey ? serviceRoleKey : anonKey;

    if (!authKey) {
      return NextResponse.json(
        { error: "Supabase API key tidak dikonfigurasi" },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, authKey);

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "products";

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Hanya file gambar yang diperbolehkan (JPG, PNG, WEBP, dll)" },
        { status: 400 }
      );
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5MB" },
        { status: 400 }
      );
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Jika menggunakan service role key, bisa auto-create bucket
    if (isValidServiceKey) {
      const { data: buckets } = await supabaseAdmin.storage.listBuckets();
      const bucketExists = buckets?.some((b) => b.name === bucket);

      if (!bucketExists) {
        await supabaseAdmin.storage.createBucket(bucket, {
          public: true,
          fileSizeLimit: maxSize,
          allowedMimeTypes: ["image/*"],
        });
      }
    }

    // Upload file
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("[Upload] Error:", uploadError);

      // Jika bucket tidak ada & pakai anon key, berikan pesan yang jelas
      if (uploadError.message.includes("Bucket not found") || uploadError.message.includes("bucket")) {
        return NextResponse.json(
          {
            error: `Bucket storage "${bucket}" belum dibuat. Buat bucket ini di Supabase Dashboard → Storage → New bucket → name: "${bucket}", public: true`,
          },
          { status: 500 }
        );
      }

      if (uploadError.message.includes("policy") || uploadError.message.includes("security")) {
        return NextResponse.json(
          {
            error: `Akses ditolak. Di Supabase Dashboard → Storage → "${bucket}" → Policies → tambahkan policy INSERT untuk anon role.`,
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: `Gagal upload: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Dapatkan public URL
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicUrl, path: filePath });
  } catch (err: any) {
    console.error("[Upload API] Error:", err);
    return NextResponse.json(
      { error: err.message || "Terjadi kesalahan saat upload" },
      { status: 500 }
    );
  }
}
