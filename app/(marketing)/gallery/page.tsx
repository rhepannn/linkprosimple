// app/gallery/page.tsx — Server Component

import { photos as staticPhotos } from "@/data/photos";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { getGalleryPhotos } from "@/app/actions/gallery";

export default async function GalleryPage() {
  const { data: dbPhotos = [] } = await getGalleryPhotos();
  const displayPhotos = dbPhotos && dbPhotos.length > 0 ? dbPhotos : staticPhotos;
  
  // Ambil satu foto untuk dipajang di Hero (yang isHero=true atau yang pertama)
  const heroPhoto = dbPhotos.find((p: any) => p.isHero) || displayPhotos[0];

  return (
    <main className="min-h-screen bg-white">
      {/* ── Premium Editorial Hero ── */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden border-b border-border/40">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-warm-white/50 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full bg-white border border-gold/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-gold uppercase">
                  Portfolio Showcase
                </span>
              </div>
              
              <h1 
                className="text-5xl sm:text-6xl lg:text-8xl font-black text-near-black leading-[0.9] tracking-tighter mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Cerita <br />
                <span className="text-gold">Dalam Lensa</span>
              </h1>
              
              <p className="text-near-black/60 text-lg max-w-lg leading-relaxed mb-8 mx-auto lg:mx-0 font-bold italic">
                Jelajahi setiap momen berharga yang kami abadikan. Dari tawa kecil hingga pelukan hangat, 
                setiap bingkai adalah kenangan yang abadi.
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-10 text-near-black/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="flex flex-col gap-1">
                  <span className="text-near-black text-3xl font-black tracking-tighter">500+</span>
                  <span>Sesi Foto</span>
                </div>
                <div className="w-px h-10 bg-border/40" />
                <div className="flex flex-col gap-1">
                  <span className="text-near-black text-3xl font-black tracking-tighter">50k+</span>
                  <span>Momen Abadi</span>
                </div>
              </div>
            </div>

            {/* Right: Floating Image Element */}
            <div className="flex-1 relative mt-16 lg:mt-0">
              <div className="relative w-full max-w-xl mx-auto group">
                {/* Decorative Frame */}
                <div className="absolute -inset-6 border border-gold/30 rounded-[2.5rem] -rotate-3 transition-transform duration-700 group-hover:rotate-0" />
                <div className="absolute -inset-6 border border-near-black/5 rounded-[2.5rem] rotate-3 transition-transform duration-700 group-hover:rotate-0" />
                
                {/* Main Image */}
                <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-near-black/20 bg-warm-white">
                  {heroPhoto && (
                    <img 
                      src={(heroPhoto as any).src || (heroPhoto as any).url} 
                      alt="Featured Work" 
                      className="w-full h-auto block object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-[1.5rem] shadow-2xl border border-border/40 hidden sm:block">
                  <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">Terbaru</p>
                  <p className="text-sm font-black text-near-black">Studio Session 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider tipis */}
      <div className="h-px bg-border/40" />

      {/* ── Gallery Grid ── */}
      <div className="pt-20 lg:pt-32 pb-24">
        <GalleryGrid photos={displayPhotos as any} />
      </div>
    </main>
  );
}
