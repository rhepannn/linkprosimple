const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envLocalPath = path.join(__dirname, '..', '.env.local');

function parseComments(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log('=== FILE:', path.basename(filePath), '===');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line) => {
    if (line.trim().startsWith('#') || line.includes('SUPABASE') || line.includes('KEY')) {
      // replace actual value with [VALUE_HIDDEN]
      const parts = line.split('=');
      if (parts.length > 1) {
        console.log(parts[0] + ' = [HIDDEN] (length: ' + parts[1].trim().length + ')');
      } else {
        console.log(line);
      }
    }
  });
}

parseComments(envPath);
parseComments(envLocalPath);
