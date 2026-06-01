import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    const filename = req.nextUrl.searchParams.get("filename") || "poster.jpg";

    if (!url) {
        return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    try {
        const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const contentType = res.headers.get("content-type") || "image/jpeg";
        const buffer = await res.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}