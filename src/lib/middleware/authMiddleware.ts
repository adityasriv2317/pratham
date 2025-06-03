// lib/middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAccessToken } from '../jwt';

export function withAuth(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: 'Access token missing' });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach user info to request object
    (req as any).user = decoded;

    return handler(req, res);
  };
}
