import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Configuration - À mettre dans des variables d'environnement
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@rounders.pro';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$YourHashedPasswordHere';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export default async function handler(req, res) {
  // Seulement accepter les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { email, password } = req.body;

    // LOGS DE DEBUG - À RETIRER EN PRODUCTION
    console.log('=== DEBUG LOGIN ===');
    console.log('Email reçu:', email);
    console.log('Password reçu:', password);
    console.log('Email attendu:', ADMIN_EMAIL);
    console.log('Hash dans env:', ADMIN_PASSWORD_HASH);
    console.log('Hash commence par $2a$10?:', ADMIN_PASSWORD_HASH.startsWith('$2a$10'));
    
    // Générer un hash pour le mot de passe reçu pour test
    const testHash = await bcrypt.hash(password, 10);
    console.log('Hash du password reçu:', testHash);
    
    // Vérifier que les champs sont remplis
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email et mot de passe requis' 
      });
    }

    // Vérifier l'email
    if (email !== ADMIN_EMAIL) {
      console.log('Email ne correspond pas!');
      return res.status(401).json({ 
        success: false,
        error: 'Identifiants incorrects' 
      });
    }

    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log('Mot de passe valide?:', isPasswordValid);
    
    // TEST TEMPORAIRE - Accepter si le mot de passe est exactement "Roundersadmin2025"
    if (!isPasswordValid && password === 'Roundersadmin2025') {
      console.log('UTILISATION DU BYPASS TEMPORAIRE - À RETIRER!');
      
      // Créer un token JWT
      const token = jwt.sign(
        { 
          email: ADMIN_EMAIL,
          isAdmin: true,
          loginTime: new Date().toISOString()
        },
        JWT_SECRET,
        { 
          expiresIn: '24h'
        }
      );

      return res.status(200).json({
        success: true,
        token,
        message: 'Connexion réussie (BYPASS - mettre à jour le hash!)'
      });
    }
    
    if (!isPasswordValid) {
      console.log('Mot de passe incorrect!');
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