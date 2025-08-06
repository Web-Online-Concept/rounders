import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Vérifier le token admin
const verifyToken = (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
  }

  // Vérifier l'authentification
  const user = verifyToken(req);
  if (!user?.isAdmin) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const { id } = req.query;

  try {
    const commissions = await prisma.commission.findMany({
      where: { affiliateId: id },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({
      success: true,
      data: commissions
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}