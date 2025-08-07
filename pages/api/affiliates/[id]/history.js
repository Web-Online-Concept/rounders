import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Vérifier le token admin
async function verifyAdminToken(token) {
  if (!token) return false;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    // Accepter les deux formats : role === 'ADMIN' OU isAdmin === true
    return decoded.role === 'ADMIN' || decoded.isAdmin === true;
  } catch (error) {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vérifier l'authentification
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');
    
    const isAdmin = await verifyAdminToken(token);
    if (!isAdmin) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    const { id } = req.query;

    // Récupérer l'historique des commissions
    const history = await prisma.commissionHistory.findMany({
      where: {
        affiliateId: id
      },
      orderBy: {
        calculatedAt: 'desc'
      }
    });

    // Récupérer les paiements
    const payments = await prisma.payment.findMany({
      where: {
        affiliateId: id
      },
      orderBy: {
        paidAt: 'desc'
      }
    });

    return res.status(200).json({
      success: true,
      history,
      payments
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération de l\'historique',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}