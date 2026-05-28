const fs = require('fs');
const path = require('path');

const files = [
  'lp_academic_partner',
  'lp_career_ready',
  'lp_entrepreneur_launchpad',
  'bisapreneur_academy',
  'baristara_academy',
  'cuan_creator_academy',
  'tekno_ai_academy',
  'mental_bahasa_academy'
];

const scratchDir = 'C:\\Users\\ASUS\\Documents\\snappframe\\snapp.frame\\scratch';

files.forEach(file => {
  const htmlPath = path.join(scratchDir, `${file}.html`);
  const txtPath = path.join(scratchDir, `${file}_clean.txt`);
  
  if (!fs.existsSync(htmlPath)) {
    console.error(`File not found: ${htmlPath}`);
    return;
  }
  
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Match tags
  const tagRegex = /<(h[1-6]|p|li|a)(?:\s+[^>]*)*>([\s\S]*?)<\/\1>/gi;
  let match;
  let output = '';
  
  while ((match = tagRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    let text = match[2];
    
    text = text.replace(/<br\s*\/?>/gi, '\n');
    text = text.replace(/<[^>]+>/g, ''); // Strip tags
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, "'");
    
    text = text.replace(/\s+/g, ' ').trim();
    if (text && text.length > 3) {
      output += `[${tag}] ${text}\n`;
    }
  }
  
  fs.writeFileSync(txtPath, output, 'utf8');
  console.log(`Wrote ${txtPath}`);
});
console.log('Done!');
