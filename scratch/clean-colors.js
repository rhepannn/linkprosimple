// scratch/clean-colors.js
const fs = require('fs');
const path = require('path');

const targetProjects = [
  'D:\\Linkpro Simple\\extracted',
  'D:\\snapp.frame-studio'
];

const targetFiles = [
  'app/(marketing)/affiliate/page.tsx',
  'app/(marketing)/daftar-pelatihan/page.tsx'
];

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replacements for beiges/browns and golds to blue and white theme
  const replacements = [
    // bg colors
    { from: /bg-warm-white\/30/g, to: 'bg-slate-50/50' },
    { from: /bg-warm-white/g, to: 'bg-white' },
    { from: /bg-warm-light\/40/g, to: 'bg-slate-50' },
    { from: /bg-warm-white/g, to: 'bg-white' },
    { from: /border-warm-white/g, to: 'border-slate-100' },
    { from: /bg-warm-light/g, to: 'bg-slate-50' },
    { from: /bg-gold\/10/g, to: 'bg-[#004aad]/10' },
    { from: /bg-gold\/15/g, to: 'bg-[#004aad]/15' },
    { from: /bg-gold\/20/g, to: 'bg-[#004aad]/20' },
    { from: /bg-gold\/30/g, to: 'bg-[#004aad]/30' },
    { from: /bg-gold/g, to: 'bg-[#004aad]' },
    // border colors
    { from: /border-gold\/20/g, to: 'border-[#004aad]/20' },
    { from: /border-gold\/30/g, to: 'border-[#004aad]/30' },
    { from: /border-gold/g, to: 'border-[#004aad]' },
    // focus colors
    { from: /focus:border-gold/g, to: 'focus:border-[#004aad]' },
    { from: /focus:ring-gold\/30/g, to: 'focus:ring-[#004aad]/30' },
    // text colors
    { from: /text-gold\/95/g, to: 'text-[#004aad]' },
    { from: /text-gold\/70/g, to: 'text-[#004aad]/70' },
    { from: /text-gold/g, to: 'text-[#004aad]' },
    // shadow colors
    { from: /shadow-gold\/10/g, to: 'shadow-[#004aad]/10' },
    { from: /shadow-gold\/20/g, to: 'shadow-[#004aad]/20' },
    { from: /shadow-gold\/30/g, to: 'shadow-[#004aad]/30' },
    // sliders / gradients
    { from: /bg-gold w-3/g, to: 'bg-[#004aad] w-3' },
    { from: /from-gold/g, to: 'from-[#004aad]' },
    { from: /to-gold/g, to: 'to-[#004aad]' },
    { from: /via-yellow-300/g, to: 'via-sky-400' },
    // custom hex codes for browns/beiges to blue
    { from: /#C4956A/g, to: '#004aad' },
    { from: /#B07D52/g, to: '#003984' },
    { from: /#3B2211/g, to: '#1e293b' },
    { from: /#FAFAF8/g, to: '#f8fafc' },
    { from: /#F8F6F4/g, to: '#f1f5f9' },
    // specific button fixes for text-near-black on bg-gold
    { from: /bg-gold hover:bg-gold\/90 text-near-black/g, to: 'bg-[#004aad] hover:bg-[#003984] text-white' },
    { from: /bg-gold hover:bg-near-black text-near-black hover:text-white/g, to: 'bg-[#004aad] hover:bg-[#003984] text-white' },
    { from: /bg-gold text-near-black/g, to: 'bg-[#004aad] text-white' },
    { from: /from-gold to-near-black/g, to: 'from-[#004aad] to-slate-900' }
  ];

  let modified = false;
  for (const rep of replacements) {
    if (rep.from.test(content)) {
      content = content.replace(rep.from, rep.to);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned: ${filePath}`);
  } else {
    console.log(`No changes needed: ${filePath}`);
  }
}

for (const project of targetProjects) {
  for (const relFile of targetFiles) {
    const fullPath = path.join(project, relFile);
    cleanFile(fullPath);
  }
}
console.log('Theme cleanup done!');
