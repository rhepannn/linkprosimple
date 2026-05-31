const fs = require('fs');
let content = fs.readFileSync('data/packages.ts', 'utf8');
content = content.replace(/statusText: (.+),\s*buttonText: (.+)/g, (match, p1, p2) => {
  return `statusText: ${p1},
    buttonText: ${p2},
    packages: [
      { id: 'pkg-basic', name: 'Paket Reguler', price: 150000, features: ['Fasilitas Standar', 'Sertifikat', 'Materi PDF'] },
      { id: 'pkg-premium', name: 'Paket Eksekutif', price: 350000, features: ['Fasilitas Premium', 'Sertifikat Fisik', 'Grup Mentoring'] }
    ]`;
});
fs.writeFileSync('data/packages.ts', content);
