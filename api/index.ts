import express, { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json({ limit: '10mb' }));

interface AdminSession {
  token: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

const SESSIONS = new Map<string, AdminSession>();

// Salt & Hash generation using PBKDF2 (SHA-512)
function hashPassword(password: string, customSalt?: string): { hash: string; salt: string } {
  const salt = customSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const computed = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(hash, 'hex'));
  } catch (err) {
    return false;
  }
}

// In-memory or env-backed admin credentials (david0131 / seojin0131)
const DEFAULT_SALT = 'e9f4c3b2a1d0f8e7d6c5b4a3f2e1d0c9';
const DEFAULT_HASH = crypto.pbkdf2Sync('seojin0131', DEFAULT_SALT, 100000, 64, 'sha512').toString('hex');

const ADMIN_CREDENTIALS = {
  username: 'david0131',
  salt: DEFAULT_SALT,
  hash: DEFAULT_HASH
};

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function createSession(username: string): AdminSession {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const session: AdminSession = {
    token,
    username,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS
  };
  SESSIONS.set(token, session);
  return session;
}

function validateSession(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();
  const session = SESSIONS.get(cleanToken);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    SESSIONS.delete(cleanToken);
    return null;
  }
  return session;
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverless: true, timestamp: new Date().toISOString() });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    res.status(400).json({ success: false, error: '아이디와 비밀번호를 모두 입력해 주세요.' });
    return;
  }

  const normalizedUsername = String(username).trim();
  if (normalizedUsername !== ADMIN_CREDENTIALS.username) {
    res.status(401).json({ success: false, error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    return;
  }

  const isValid = verifyPassword(String(password), ADMIN_CREDENTIALS.hash, ADMIN_CREDENTIALS.salt);
  if (!isValid) {
    res.status(401).json({ success: false, error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    return;
  }

  const session = createSession(ADMIN_CREDENTIALS.username);
  res.json({
    success: true,
    message: '관리자 로그인이 성공적으로 완료되었습니다.',
    token: session.token,
    expiresAt: session.expiresAt,
    user: { username: session.username }
  });
});

app.get('/api/admin/me', (req, res) => {
  const session = validateSession(req.headers.authorization);
  if (!session) {
    res.status(401).json({ authenticated: false, error: '세션이 만료되었거나 유효하지 않습니다.' });
    return;
  }
  res.json({
    authenticated: true,
    user: { username: session.username },
    expiresAt: session.expiresAt
  });
});

app.post('/api/admin/logout', (req, res) => {
  const cleanToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7).trim()
    : req.headers.authorization?.trim();
  if (cleanToken) SESSIONS.delete(cleanToken);
  res.json({ success: true, message: '로그아웃되었습니다.' });
});

export default app;
