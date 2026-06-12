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

    // 3. Call Server Action getAffiliatePosts
    const actionId = '00edebacf004fcfaab51bd57983341b20c81d14151';
    console.log("Calling Server Action with ID:", actionId);

    const actionRes = await fetch('https://affiliate.linkproductive.com/snapper', {
      method: 'POST',
      headers: {
        'Cookie': sessionCookieHeader,
        'Next-Action': actionId,
        'Content-Type': 'text/plain;charset=UTF-8'
      },
      body: '[]'
    });

    console.log("Action Status:", actionRes.status);
    const text = await actionRes.text();
    console.log("Action Response Body (first 1000 chars):", text.substring(0, 1000));
    
    fs.writeFileSync('scratch/prod-posts-raw.txt', text);
    console.log("Raw response written to scratch/prod-posts-raw.txt");

  } catch (err) {
    console.error("Error:", err);
  }
}

main();
