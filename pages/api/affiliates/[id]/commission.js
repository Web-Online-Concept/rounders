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
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
  }

  // Vérifier l'authentification
  const user = verifyToken(req);
  if (!user?.isAdmin) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const { id } = req.query;
  const { totalBet, totalCommission } = req.body;

  try {
    // Récupérer l'affilié
    const affiliate = await prisma.affiliate.findUnique({
      where: { id }
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affilié non trouvé' });
    }

    // Calculer la différence
    const oldCommission = parseFloat(affiliate.lastTotalCommission || 0);
    const newCommission = parseFloat(totalCommission || 0);
    const difference = newCommission - oldCommission;
    
    // Calculer la part de l'affilié (toujours 50%)
    const affiliateShare = difference * 0.5;
    
    // Mettre à jour l'affilié
    const updatedAffiliate = await prisma.affiliate.update({
      where: { id },
      data: {
        totalBet: parseFloat(totalBet || 0),
        totalCommission: newCommission,
        lastTotalCommission: newCommission,
        pendingAmount: {
          increment: affiliateShare
        },
        lastUpdate: new Date()
      }
    });

    // Créer un enregistrement de commission
    await prisma.commission.create({
      data: {
        affiliateId: id,
        totalBet: parseFloat(totalBet || 0),
        totalCommission: newCommission,
        difference,
        affiliateShare,
        isPaid: false
      }
    });

    return res.status(200).json({ 
      success: true,
      affiliateShare,
      newPendingAmount: parseFloat(updatedAffiliate.pendingAmount),
      message: `Commission calculée : ${affiliateShare.toFixed(2)}€ ajoutés`
    });

  } catch (error) {
    console.error('Erreur calcul commission:', error);
    return res.status(500).json({ 
      error: 'Erreur lors du calcul',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}