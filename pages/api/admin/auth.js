import { checkPassword, getAdminToken, verifyAdminAuth } from '@/lib/adminAuth';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const isAuthenticated = verifyAdminAuth(req);
    return res.status(200).json({ authenticated: isAuthenticated });
  }

  if (req.method === 'POST') {
    const { password } = req.body || {};
    if (!password || !checkPassword(password)) {
      return res.status(401).json({ success: false, message: 'Невірний пароль адміністратора' });
    }

    const token = getAdminToken();
    const cookieSerialized = `bright_admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
      60 * 60 * 24 * 7
    }`;

    res.setHeader('Set-Cookie', cookieSerialized);
    return res.status(200).json({ success: true, message: 'Авторизація успішна' });
  }

  if (req.method === 'DELETE') {
    const cookieSerialized = `bright_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
    res.setHeader('Set-Cookie', cookieSerialized);
    return res.status(200).json({ success: true, message: 'Сесію завершено' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
