import fs from 'fs';

const rawText = fs.readFileSync('scratch/prod-posts-raw.txt', 'utf8');

// The lines in NextJS flight response are prefixed with "数字:" (e.g. "1:") followed by JSON.
// We can find the line starting with "1:"
const lines = rawText.split('\n');
let posts = null;

for (const line of lines) {
  if (line.startsWith('1:')) {
    const jsonStr = line.substring(2);
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.success && Array.isArray(parsed.data)) {
        posts = parsed.data;
        break;
      }
    } catch (e) {
      // ignore
    }
  }
}

if (!posts) {
  // Try regex matching for the json array
  const match = rawText.match(/"data"\s*:\s*(\[[\s\S]*?\])\s*\}\s*$/);
  if (match) {
    try {
      posts = JSON.parse(match[1]);
    } catch (e) {
      // ignore
    }
  }
}

if (!posts) {
  // Let's do a loose parsing: find the first occurrence of [{"id" and find the matching ]
  const startIndex = rawText.indexOf('[{"id":');
  if (startIndex !== -1) {
    // find matching closing bracket
    let bracketCount = 0;
    let endIndex = -1;
    for (let i = startIndex; i < rawText.length; i++) {
      if (rawText[i] === '[') bracketCount++;
      else if (rawText[i] === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          endIndex = i;
          break;
        }
      }
    }
    if (endIndex !== -1) {
      const arrayStr = rawText.substring(startIndex, endIndex + 1);
      try {
        posts = JSON.parse(arrayStr);
      } catch (e) {
        console.error("Bracket matching failed to parse:", e);
      }
    }
  }
}

if (posts) {
  console.log("SUCCESSFULLY PARSED PROD POSTS!");
  console.log("COUNT:", posts.length);
  fs.writeFileSync('scratch/prod-posts.json', JSON.stringify(posts, null, 2));
  console.log("Written to scratch/prod-posts.json");
} else {
  console.log("FAILED to parse posts. Raw text sample:");
  console.log(rawText.substring(0, 1000));
}
