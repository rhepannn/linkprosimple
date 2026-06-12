const chunks = [
  '0p0oqaid-ewpm.js',
  '0gf.gysn-7lpv.js',
  '045jyxi5tjko1.js',
  '09t2isllljna7.js',
  '0hc_9q7~2m45k.js',
  '15j8fz3fxn54m.js'
];

async function main() {
  for (const chunk of chunks) {
    console.log("Checking chunk:", chunk);
    try {
      const res = await fetch(`https://affiliate.linkproductive.com/_next/static/chunks/${chunk}`);
      if (!res.ok) {
        console.log(`Failed to fetch chunk ${chunk}:`, res.status);
        continue;
      }
      const code = await res.text();
      // Search for getAffiliatePosts or similar
      if (code.includes('getAffiliatePosts')) {
        console.log("FOUND getAffiliatePosts in:", chunk);
        
        // Let's search for "getAffiliatePosts" and print surrounding text
        let idx = 0;
        while (true) {
          idx = code.indexOf('getAffiliatePosts', idx);
          if (idx === -1) break;
          console.log("CONTEXT:", code.substring(idx - 100, idx + 200));
          idx += 17;
        }
      }
    } catch (err) {
      console.error(`Error fetching/processing chunk ${chunk}:`, err);
    }
  }
}

main();
