import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

// Interfaces for Auth & Sessions
interface AdminUser {
  username: string;
  salt: string;
  hash: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminSession {
  token: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory session store & database persistence
const SESSIONS = new Map<string, AdminSession>();
const DATA_DIR = path.join(process.cwd(), 'data');
const ADMIN_DB_PATH = path.join(DATA_DIR, 'admin_credentials.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.warn('Could not create data directory:', err);
  }
}

// Password hashing utilities using PBKDF2 (SHA-512, 100,000 iterations)
export function hashPassword(password: string, customSalt?: string): { hash: string; salt: string } {
  const salt = customSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const computed = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(hash, 'hex'));
  } catch (err) {
    return false;
  }
}

// Initialize Admin Credentials Database (Default: david0131 / seojin0131)
function getOrCreateAdmin(): AdminUser {
  try {
    if (fs.existsSync(ADMIN_DB_PATH)) {
      const content = fs.readFileSync(ADMIN_DB_PATH, 'utf-8');
      const parsed = JSON.parse(content) as AdminUser;
      if (parsed.username && parsed.hash && parsed.salt) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading admin credentials file, recreating default:', err);
  }

  // Initialize with secure salted hash (Password is never stored in plain text)
  const { hash, salt } = hashPassword('seojin0131');
  const defaultAdmin: AdminUser = {
    username: 'david0131',
    salt,
    hash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    fs.writeFileSync(ADMIN_DB_PATH, JSON.stringify(defaultAdmin, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist admin credentials file:', err);
  }

  return defaultAdmin;
}

let currentAdmin = getOrCreateAdmin();

// Session Management (7 days expiration)
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

function removeSession(token: string | undefined): void {
  if (!token) return;
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();
  SESSIONS.delete(cleanToken);
}

// Authentication Middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const session = validateSession(authHeader);
  if (!session) {
    res.status(401).json({
      success: false,
      error: '관리자 인증이 필요하거나 세션이 만료되었습니다.'
    });
    return;
  }
  (req as any).adminSession = session;
  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'seojin-portfolio-backend',
      timestamp: new Date().toISOString()
    });
  });

  // Admin Login Endpoint (Secure Server-side Password Verification)
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
      res.status(400).json({
        success: false,
        error: '아이디와 비밀번호를 모두 입력해 주세요.'
      });
      return;
    }

    // Refresh credentials from DB if updated
    currentAdmin = getOrCreateAdmin();

    const normalizedUsername = String(username).trim();
    if (normalizedUsername !== currentAdmin.username) {
      // Intentionally generic error message to prevent enumeration
      res.status(401).json({
        success: false,
        error: '아이디 또는 비밀번호가 일치하지 않습니다.'
      });
      return;
    }

    const isValid = verifyPassword(String(password), currentAdmin.hash, currentAdmin.salt);
    if (!isValid) {
      res.status(401).json({
        success: false,
        error: '아이디 또는 비밀번호가 일치하지 않습니다.'
      });
      return;
    }

    // Create session
    const session = createSession(currentAdmin.username);

    res.json({
      success: true,
      message: '관리자 로그인이 성공적으로 완료되었습니다.',
      token: session.token,
      expiresAt: session.expiresAt,
      user: {
        username: session.username
      }
    });
  });

  // Check Active Session Endpoint
  app.get('/api/admin/me', (req, res) => {
    const authHeader = req.headers.authorization;
    const session = validateSession(authHeader);

    if (!session) {
      res.status(401).json({
        authenticated: false,
        error: '세션이 만료되었거나 유효하지 않습니다.'
      });
      return;
    }

    res.json({
      authenticated: true,
      user: {
        username: session.username
      },
      expiresAt: session.expiresAt
    });
  });

  // Admin Logout Endpoint
  app.post('/api/admin/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    removeSession(authHeader);
    res.json({
      success: true,
      message: '로그아웃되었습니다.'
    });
  });

  // Admin Password Change Endpoint (Protected)
  app.post('/api/admin/change-password', requireAdminAuth, (req, res) => {
    const { currentPassword, newPassword } = req.body || {};

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        error: '현재 비밀번호와 새 비밀번호를 모두 입력해 주세요.'
      });
      return;
    }

    currentAdmin = getOrCreateAdmin();
    const isCurrentValid = verifyPassword(String(currentPassword), currentAdmin.hash, currentAdmin.salt);
    if (!isCurrentValid) {
      res.status(400).json({
        success: false,
        error: '현재 비밀번호가 일치하지 않습니다.'
      });
      return;
    }

    if (String(newPassword).length < 4) {
      res.status(400).json({
        success: false,
        error: '새 비밀번호는 최소 4자 이상이어야 합니다.'
      });
      return;
    }

    const { hash, salt } = hashPassword(String(newPassword));
    currentAdmin.hash = hash;
    currentAdmin.salt = salt;
    currentAdmin.updatedAt = new Date().toISOString();

    try {
      fs.writeFileSync(ADMIN_DB_PATH, JSON.stringify(currentAdmin, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save updated admin credentials:', err);
    }

    res.json({
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다.'
    });
  });

  // Vite Middleware for development vs Static Serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
