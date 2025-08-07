import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Seulement accepter les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { email, password } = req.body;
    
    // Vérifier que les champs sont remplis
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email et mot de passe requis' 
      });
    }

    // Configuration
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@rounders.pro';
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    
    // Vérifier l'email
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ 
        success: false,
        error: 'Identifiants incorrects' 
      });
    }

    // Le hash du mot de passe Rounders2025*
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$5RMa/n0OZfXSM9NpChLzOOa2wiSfXgmKdnSza5RuIlA2S0dKU7Rri';
    
    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        error: 'Identifiants incorrects' 
      });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { 
        email: ADMIN_EMAIL,
        isAdmin: true,
        role: 'ADMIN',
        loginTime: new Date().toISOString()
      },
      JWT_SECRET,
      { 
        expiresIn: '24h'
      }
    );

    // Succès
    return res.status(200).json({
      success: true,
      token,
      message: 'Connexion réussie'
    });

  } catch (error) {
    console.error('Erreur de connexion:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erreur serveur' 
    });
  }
}