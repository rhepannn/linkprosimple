import fs from 'fs';

let code = fs.readFileSync('app/(marketing)/affiliate/page.tsx', 'utf8');

// 1. Remove ICON_MAP to end of groupProducts
const iconMapStart = code.indexOf('// ─── ICON MAP BY KEYWORD');
const registerModalStart = code.indexOf('// ─── REGISTER MODAL');
if (iconMapStart !== -1 && registerModalStart !== -1) {
  code = code.substring(0, iconMapStart) + code.substring(registerModalStart);
}

// 2. Remove ProgramDetail
const programDetailStart = code.indexOf('// ─── PROGRAM DETAIL FULL PAGE');
const mainPageStart = code.indexOf('// ─── MAIN PAGE');
if (programDetailStart !== -1 && mainPageStart !== -1) {
  code = code.substring(0, programDetailStart) + code.substring(mainPageStart);
}

// 3. Clean up unused state in AffiliateContent
code = code.replace('const [programs, setPrograms] = useState<any[]>([]);\n', '');
code = code.replace('  const [activeProgram, setActiveProgram] = useState<any | null>(null);\n', '');
code = code.replace('  const [searchQuery, setSearchQuery] = useState("");\n', '');

// 4. Clean up unused vars
code = code.replace(/  const filteredPrograms = programs\.filter\([\s\S]*?\);\n\n/, '');
code = code.replace(/  \/\/ Auto-open program from URL param[\s\S]*?\}, \[searchParams, programs\]\);\n\n/, '');

// 5. Replace fetchData
const newFetchData = `  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, settingsRes, productsRes] = await Promise.all([
          getAffiliatePosts(), getSiteSettings(), getProducts(),
        ]);

        if (settingsRes) setSettings(settingsRes);

        let rawProducts = productsRes.success && Array.isArray(productsRes.data)
          ? productsRes.data.filter((p: any) => p.isActive)
          : [];
        if (rawProducts.length === 0) rawProducts = [];

        const productPosts = rawProducts
          .filter((p: any) => p.image)
          .map((p: any, i: number) => ({
            id: 'prod-' + (p.id || i),
            imageUrl: p.image,
            caption: p.details ? 'Ayo tingkatkan skill kamu dengan bergabung di program unggulan: ' + p.name + '! Daftar sekarang dan dapatkan penawaran spesial.' : 'Daftar sekarang untuk program ' + p.name + '!',
            category: 'promo',
            likeCount: Math.floor(Math.random() * 50) + 10,
            hashtags: ['linkproductive', p.name.split('-')[0].trim().toLowerCase().replace(/\\s+/g, ''), 'pelatihan'],
            createdAt: p.createdAt || new Date().toISOString(),
          }));

        let published = [];
        if (postsRes.success && Array.isArray(postsRes.data) && postsRes.data.length > 0) {
          published = (postsRes.data as any[]).filter((p: any) => p.isPublished).map((p: any) => ({
            ...p,
            category: (p.hashtags || []).some((t: string) =>
              ['kegiatan', 'gathering', 'event'].includes(t.toLowerCase())
            ) || p.caption.toLowerCase().includes('kegiatan') ? 'kegiatan' : 'promo',
          }));
        }

        setPosts([...productPosts, ...published]);
      } catch (err) {
        console.error('Gagal memuat data affiliate:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);`;
code = code.replace(/  useEffect\(\(\) => \{\n    async function fetchData\(\) \{[\s\S]*?fetchData\(\);\n  \}, \[\]\);/, newFetchData);

// 6. Remove AnimatePresence for ProgramDetail
code = code.replace(/      <AnimatePresence>[\s\S]*?\{activeProgram && \([\s\S]*?<\/AnimatePresence>\n/, '');

// 7. Remove Program Cards section
const programCardsStart = code.indexOf('        {/* ── Program Cards (from DB) ── */}');
const ctaDaftarStart = code.indexOf('        {/* ── CTA Daftar ── */}');
if (programCardsStart !== -1 && ctaDaftarStart !== -1) {
  code = code.substring(0, programCardsStart) + code.substring(ctaDaftarStart);
}

// 8. Move Info Columns to above CTA Daftar
const infoColsStart = code.indexOf('        {/* ── Info Columns ── */}');
const endMainIndex = code.indexOf('      </main>');
if (infoColsStart !== -1 && endMainIndex !== -1) {
  const infoColsStr = code.substring(infoColsStart, endMainIndex);
  code = code.substring(0, infoColsStart) + code.substring(endMainIndex);
  
  // Now place it above CTA Daftar
  const newCtaDaftarStart = code.indexOf('        {/* ── CTA Daftar ── */}');
  code = code.substring(0, newCtaDaftarStart) + infoColsStr + code.substring(newCtaDaftarStart);
}

// 9. Fix Hero Button
code = code.replace('href="#programs"', 'onClick={(e) => { e.preventDefault(); setShowModal(true); }}');
code = code.replace('Lihat Program <ArrowRight size={14} />', 'Daftar Sekarang <ArrowRight size={14} />');

fs.writeFileSync('app/(marketing)/affiliate/page.tsx', code);
console.log('Script done. Affiliate page updated.');
