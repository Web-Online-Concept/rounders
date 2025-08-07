import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Vérifier le token admin
async function verifyAdminToken(token) {
  if (!token) return false;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
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

    // Récupérer l'affilié
    const affiliate = await prisma.affiliate.findUnique({
      where: { id }
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affilié introuvable' });
    }

    // Convertir toutes les valeurs Decimal en nombres
    const affiliateData = {
      ...affiliate,
      startingCommission: parseFloat(affiliate.startingCommission || 0),
      lastPaidCommission: parseFloat(affiliate.lastPaidCommission || 0),
      currentCommission: parseFloat(affiliate.currentCommission || 0),
      currentTotalBet: parseFloat(affiliate.currentTotalBet || 0),
      pendingAmount: parseFloat(affiliate.pendingAmount || 0),
      paidAmount: parseFloat(affiliate.paidAmount || 0)
    };

    return res.status(200).json(affiliateData);

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'affilié:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération de l\'affilié',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}