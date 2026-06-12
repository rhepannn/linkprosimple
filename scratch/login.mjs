async function main() {
  try {
    // 1. Get CSRF Token
    const csrfRes = await fetch('https://affiliate.linkproductive.com/api/auth/csrf');
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;
    console.log("CSRF Token:", csrfToken);

    // Get cookies from csrf response
    const csrfCookies = csrfRes.headers.get('set-cookie') || '';
    const cookieHeader = csrfCookies.split(',').map(c => c.split(';')[0]).join('; ');
    console.log("CSRF Cookies:", cookieHeader);

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
    const loginData = await loginRes.json();
    console.log("Login Response Body:", loginData);

    const loginCookies = loginRes.headers.get('set-cookie') || '';
    console.log("Login Cookies:", loginCookies);

  } catch (err) {
    console.error("Error:", err);
  }
}

main();
