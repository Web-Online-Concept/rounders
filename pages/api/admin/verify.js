import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // Récupérer le token depuis les headers
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Token manquant' 
      });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Token valide
    return res.status(200).json({
      success: true,
      isAdmin: decoded.isAdmin,
      email: decoded.email
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        error: 'Token expiré' 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      error: 'Token invalide' 
    });
  }
}