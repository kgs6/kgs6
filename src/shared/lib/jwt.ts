import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

export type AccessPayload = { sub: string; email: string; role: string };
export type RefreshPayload = { sub: string; tid: string };

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as Secret;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as Secret;

const ACCESS_TTL = (process.env.ACCESS_TOKEN_TTL ?? "15m") as SignOptions["expiresIn"];
const REFRESH_TTL = (process.env.REFRESH_TOKEN_TTL ?? "7d") as SignOptions["expiresIn"];

export function signAccess(payload: AccessPayload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

export function signRefresh(payload: RefreshPayload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}

export function verifyAccess(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as AccessPayload;
}

export function verifyRefresh(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as RefreshPayload;
}

export function decodeToken<T>(token: string): T | null {
  return jwt.decode(token) as T;
}

export function isAdmin(token: string | undefined): boolean {
  if (!token) return false;
  const payload = verifyAccess(token);
  return payload?.role === "ADMIN";
}