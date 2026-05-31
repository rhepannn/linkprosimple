const fs = require('fs');
const path = require('path');

function removeLayanan(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Brand Siap and Standara Consulting from trainingDetails
  content = content.replace(/\s*"Brand Siap":\s*\{[\s\S]*?(?="Standara Consulting":)/, '\n');
  content = content.replace(/\s*"Standara Consulting":\s*\{[\s\S]*?(?=\s*};\s*\n\s*const products)/, '\n');
  content = content.replace(/\s*"Standara Consulting":\s*\{[\s\S]*?(?=\s*};\s*\n\s*const iconMap)/, '\n');

  // Remove Brand Siap and Standara Consulting from products array
  content = content.replace(/\s*\{\s*name:\s*"Brand Siap"[\s\S]*?\},/, '');
  content = content.replace(/\s*\{\s*name:\s*"Standara Consulting"[\s\S]*?\},/, '');

  // Remove from POSTER_KEYS
  content = content.replace(/\s*"Brand Siap":\s*"training_poster_brand_siap",/, '');
  content = content.replace(/\s*"Standara Consulting":\s*"training_poster_standara",/, '');

  // Remove from DEFAULT_POSTERS
  content = content.replace(/\s*"Brand Siap":\s*".*?",/, '');
  content = content.replace(/\s*"Standara Consulting":\s*".*?",/, '');

  // Affiliate file specific: programs array
  content = content.replace(/\s*\{\s*name:\s*"Brand Siap"[\s\S]*?\},/, '');
  content = content.replace(/\s*\{\s*name:\s*"Standara Consulting"[\s\S]*?\},/, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

const file1 = path.join(__dirname, '../app/(marketing)/daftar-pelatihan/page.tsx');
const file2 = path.join(__dirname, '../app/(marketing)/affiliate/page.tsx');

removeLayanan(file1);
removeLayanan(file2);
