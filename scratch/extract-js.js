const fs = require('fs');

function extractInfo(file) {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`=== Extracting Info from ${file} ===`);
  
  // Find all API endpoints mentioned (strings starting with /api/)
  const apiMatches = content.match(/"\/api\/[^"]+"/g) || [];
  const apiMatchesSingle = content.match(/'\/api\/[^']+'/g) || [];
  const allApis = [...new Set([...apiMatches, ...apiMatchesSingle])];
  console.log("API Endpoints:", allApis);

  // Find all field names (like code, discount, percentage, fee, commission, marketer)
  const fields = ['code', 'discount', 'commission', 'percentage', 'marketer', 'usage', 'limit', 'expiry', 'active', 'withdraw'];
  console.log("Fields detected:");
  fields.forEach(field => {
    const reg = new RegExp(`[a-zA-Z0-9_$]*${field}[a-zA-Z0-9_$]*`, 'gi');
    const matches = content.match(reg) || [];
    const unique = [...new Set(matches)];
    if (unique.length > 0) {
      console.log(` - ${field}:`, unique.slice(0, 8));
    }
  });

  // Let's print some readable chunks or prettify it briefly.
  // NextJS chunks are usually minified, but we can search for react hooks like useState, useEffect, etc.
  // Let's find some API call structures
  const fetchMatches = [];
  const fetchRegex = /fetch\([^)]+\)/g;
  let match;
  while ((match = fetchRegex.exec(content)) !== null) {
    fetchMatches.push(match[0]);
  }
  console.log("Fetch calls:", fetchMatches);
}

extractInfo('C:\\Users\\ASUS\\Documents\\snappframe\\snapp.frame\\scratch\\chunk-referral-page.js');
extractInfo('C:\\Users\\ASUS\\Documents\\snappframe\\snapp.frame\\scratch\\chunk-referrals-page.js');
