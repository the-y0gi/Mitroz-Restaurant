import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

export const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token missing
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin in DB
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized: Admin not found' });
    }

    req.admin = admin; // attach admin to request
    next(); // proceed
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
