// app/api/youtube-title/route.ts
// Proxy server-side untuk fetch judul video YouTube via noembed.com
// Menghindari CORS block saat fetch dilakukan langsung dari browser

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    if (!videoId || !/^[\w-]{11}$/.test(videoId)) {
        return NextResponse.json({ error: "videoId tidak valid" }, { status: 400 });
    }

    try {
        const res = await fetch(
            `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`,
            { next: { revalidate: 3600 } } // cache 1 jam
        );

        if (!res.ok) {
            return NextResponse.json({ error: "Gagal dari noembed" }, { status: 502 });
        }

        const data = await res.json();
        return NextResponse.json({ title: data?.title ?? null });
    } catch {
        return NextResponse.json({ error: "Fetch gagal" }, { status: 500 });
    }
}