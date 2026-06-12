async function main() {
  try {
    // 1. Get CSRF Token
    const csrfRes = await fetch('https://affiliate.linkproductive.com/api/auth/csrf');
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;
    console.log("CSRF Token:", csrfToken);

    // Get cookies from csrf response
    const csrfCookies = csrfRes.headers.getSetCookie();
    const cookieHeader = csrfCookies.map(c => c.split(';')[0]).join('; ');
    console.log("CSRF Cookie Header:", cookieHeader);

    // 2. Login POST request with manual redirect handling
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
      redirect: 'manual' // Prevent automatic redirect following
    });

    console.log("Login Status:", loginRes.status);
    const loginCookies = loginRes.headers.getSetCookie();
    console.log("Login Cookies:", loginCookies);
    console.log("Location header:", loginRes.headers.get('location'));

  } catch (err) {
    console.error("Error:", err);
  }
}

main();
