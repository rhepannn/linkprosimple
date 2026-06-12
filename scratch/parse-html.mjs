import fs from 'fs';

const html = fs.readFileSync('scratch/snapper.html', 'utf8');

// Look for self.__next_f.push lines or script tags with JSON
console.log("HTML length:", html.length);

// Let's find script tags
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  const content = match[1];
  if (content.includes('__next_f') || content.includes('getAffiliatePosts') || content.includes('caption')) {
    console.log(`Script ${count} matches! Length:`, content.length);
    if (content.length < 5000) {
      console.log(content);
    } else {
      console.log("Content too long, first 500 chars:", content.substring(0, 500));
    }
  }
  count++;
}
