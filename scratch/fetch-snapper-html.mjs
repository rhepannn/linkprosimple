import fs from 'fs';

async function main() {
  try {
    // 1. Get CSRF Token
    const csrfRes = await fetch('https://affiliate.linkproductive.com/api/auth/csrf');
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;

    // Get cookies from csrf response
    const csrfCookies = csrfRes.headers.getSetCookie();
    const cookieHeader = csrfCookies.map(c => c.split(';')[0]).join('; ');

    // 2. Login POST request
    const params = new URLSearchParams();
    params.append('csrfToken', csrfToken);
    params.append('email', 'k@gmail.com');
    params.append('password', '123456');
    params.append('json', 'true');

    const loginRes = await fetch('https://affiliate.linkproductive.com/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookieHeader
      },
      body: params.toString(),
      redirect: 'manual'
    });

    const loginCookies = loginRes.headers.getSetCookie();
    const sessionTokenCookie = loginCookies.find(c => c.includes('session-token'));
    if (!sessionTokenCookie) {
      console.log("Could not find session token cookie.");
      return;
    }

    const sessionCookieHeader = sessionTokenCookie.split(';')[0];
    console.log("Session Cookie:", sessionCookieHeader);

    // 3. Fetch snapper page
    const snapperRes = await fetch('https://affiliate.linkproductive.com/snapper?tab=feed', {
      headers: {
        'Cookie': sessionCookieHeader
      }
    });

    console.log("Snapper Status:", snapperRes.status);
    const html = await snapperRes.text();
    fs.writeFileSync('scratch/snapper.html', html);
    console.log("Snapper HTML written to scratch/snapper.html");

  } catch (err) {
    console.error("Error:", err);
  }
}

main();
