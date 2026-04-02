import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import crypto from 'node:crypto';
import { v4 as uuid } from 'uuid';

const app = express();
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '').split(',').map((origin) => origin.trim()).filter(Boolean);
const JWT_SECRET = process.env.JWT_SECRET ?? 'development-secret';

const secureCookie = (process.env.COOKIE_SECURE ?? 'false') === 'true';
const sessions = new Map();
const refreshTokens = new Map();

function createToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  const [header, body, signature] = token.split('.');
  const expected = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  if (signature !== expected) return null;
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  if (payload.exp && Date.now() > payload.exp) return null;
  return payload;
}

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.post('/login', (req, res) => {
  const { email, password } = req.body ?? {};
  if (email !== 'user@example.com' || password !== 'password') {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const sessionId = uuid();
  const refreshToken = uuid();
  const accessToken = createToken({ sub: sessionId, email, iat: Date.now(), exp: Date.now() + 5 * 60 * 1000 });

  sessions.set(sessionId, { email, createdAt: Date.now() });
  refreshTokens.set(refreshToken, sessionId);

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ accessToken, tokenType: 'Bearer', expiresIn: 300 });
});

app.post('/refresh', (req, res) => {
  const { refreshToken } = req.cookies;
  const sessionId = refreshTokens.get(refreshToken);
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
  const { email } = sessions.get(sessionId);
  const newAccessToken = createToken({ sub: sessionId, email, iat: Date.now(), exp: Date.now() + 5 * 60 * 1000 });
  res.json({ accessToken: newAccessToken, tokenType: 'Bearer', expiresIn: 300 });
});

app.get('/profile', (req, res) => {
  const auth = req.get('authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.substring(7) : null;
  const payload = verifyToken(token);
  if (!payload || !sessions.has(payload.sub)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ email: payload.email, sessionId: payload.sub, issuedAt: payload.iat, expiresAt: payload.exp });
});

app.post('/logout', (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  if (sessionId) sessions.delete(sessionId);
  if (refreshToken) refreshTokens.delete(refreshToken);
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
});

const port = process.env.PORT ?? 4200;
app.listen(port, () => {
  console.log(`Auth server listening on http://localhost:${port}`);
});
