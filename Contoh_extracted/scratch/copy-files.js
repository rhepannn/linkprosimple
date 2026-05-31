const fs = require('fs');
const path = require('path');

const srcPaths = [
  'C:/Users/ASUS/.gemini/antigravity/brain/4fa973b3-4f97-4e0d-a5b5-0dea10ffbb49/.system_generated/steps/1092/content.md',
  'C:/Users/ASUS/.gemini/antigravity/brain/4fa973b3-4f97-4e0d-a5b5-0dea10ffbb49/.system_generated/steps/1132/content.md',
  'C:/Users/ASUS/.gemini/antigravity/brain/4fa973b3-4f97-4e0d-a5b5-0dea10ffbb49/.system_generated/steps/1134/content.md',
  'C:/Users/ASUS/.gemini/antigravity/brain/4fa973b3-4f97-4e0d-a5b5-0dea10ffbb49/.system_generated/steps/1136/content.md',
  'C:/Users/ASUS/.gemini/antigravity/brain/4fa973b3-4f97-4e0d-a5b5-0dea10ffbb49/.system_generated/steps/1138/content.md',
  'C:/Users/ASUS/.gemini/antigravity/brain/4fa973b3-4f97-4e0d-a5b5-0dea10ffbb49/.system_generated/steps/1140/content.md',
  'C:/Users/ASUS/.gemini/antigravity/brain/4fa973b3-4f97-4e0d-a5b5-0dea10ffbb49/.system_generated/steps/1142/content.md',
  'C:/Users/ASUS/.gemini/antigravity/brain/4fa973b3-4f97-4e0d-a5b5-0dea10ffbb49/.system_generated/steps/1144/content.md'
];

const destNames = [
  'lp_academic_partner.html',
  'lp_career_ready.html',
  'lp_entrepreneur_launchpad.html',
  'bisapreneur_academy.html',
  'baristara_academy.html',
  'cuan_creator_academy.html',
  'tekno_ai_academy.html',
  'mental_bahasa_academy.html'
];

const destDir = 'C:/Users/ASUS/Documents/snappframe/snapp.frame/scratch';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

srcPaths.forEach((src, idx) => {
  const dest = path.join(destDir, destNames[idx]);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } else {
    console.log(`Source does not exist: ${src}`);
  }
});
