import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bright2026';

export function getAdminToken() {
  return crypto
    .createHmac('sha256', ADMIN_PASSWORD)
    .update('bright_admin_session_salt_2026')
    .digest('hex');
}

export function checkPassword(password) {
  return password === ADMIN_PASSWORD;
}

export function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach((cookie) => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    list[name] = decodeURIComponent(value);
  });

  return list;
}

export function verifyAdminAuth(req) {
  const cookies = parseCookies(req.headers?.cookie || '');
  const sessionToken = cookies['bright_admin_session'];
  const expectedToken = getAdminToken();
  return sessionToken === expectedToken;
}
