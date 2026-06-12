async function main() {
  try {
    // 1. Get CSRF Token
    const csrfRes = await fetch('https://affiliate.linkproductive.com/api/auth/csrf');
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;
    console.log("CSRF Token:", csrfToken);

    // Get cookies from csrf response
    const csrfCookies = csrfRes.headers.getSetCookie();
    console.log("CSRF Raw Cookies:", csrfCookies);
    const cookieHeader = csrfCookies.map(c => c.split(';')[0]).join('; ');
    console.log("CSRF Cookie Header:", cookieHeader);

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
      body: params.toString()
    });

    console.log("Login Status:", loginRes.status);
    console.log("Login Redirected:", loginRes.redirected);
    console.log("Login URL:", loginRes.url);

    const loginCookies = loginRes.headers.getSetCookie();
    console.log("Login Cookies:", loginCookies);

    const text = await loginRes.text();
    console.log("Login Body (first 500 chars):", text.substring(0, 500));

  } catch (err) {
    console.error("Error:", err);
  }
}

main();
