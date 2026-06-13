import { Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getSuccessStories } from "@/app/actions/success-stories";
import StoriesDisplay from "./StoriesDisplay";

export default async function SuccessStoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const storiesRes = await getSuccessStories(id);
  const stories = storiesRes.success ? (storiesRes.data || []) : [];
  const programName = (stories[0] as any)?.product?.name || "";

  if (stories.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Trophy size={40} className="text-gray-200" />
        <p className="text-sm font-bold text-gray-400">Tidak ada success story ditemukan.</p>
        <Link
          href="/success-stories"
          className="text-[#004aad] text-xs font-black uppercase tracking-wider"
        >
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-4 shadow-sm">
        <Link
          href="/success-stories"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#004aad] transition-colors font-black text-[11px] uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Kembali ke Success Stories
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 space-y-20">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-bold uppercase tracking-[0.15em]">
            <Trophy size={12} /> Alumni Sukses
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            Success Story
            <br />
            <span className="text-[#004aad]">{programName}</span>
          </h1>
        </div>

        <StoriesDisplay stories={stories} />
      </div>
    </main>
  );
}
