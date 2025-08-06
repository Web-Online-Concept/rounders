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
  const { amount, crypto = 'USDT', note = 'Paiement hebdomadaire' } = req.body;

  try {
    // Récupérer l'affilié
    const affiliate = await prisma.affiliate.findUnique({
      where: { id }
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affilié non trouvé' });
    }

    // Créer le paiement
    const payment = await prisma.payment.create({
      data: {
        affiliateId: id,
        amount: parseFloat(amount || 0),
        crypto,
        note,
        transactionId: `TIP-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      }
    });

    // Mettre à jour l'affilié
    await prisma.affiliate.update({
      where: { id },
      data: {
        pendingAmount: {
          decrement: parseFloat(amount || 0)
        },
        paidAmount: {
          increment: parseFloat(amount || 0)
        },
        lastPaymentDate: new Date(),
        lastUpdate: new Date()
      }
    });

    // Marquer les commissions comme payées
    await prisma.commission.updateMany({
      where: {
        affiliateId: id,
        isPaid: false
      },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    });

    return res.status(200).json({ 
      success: true,
      payment,
      message: `Paiement de ${amount}€ enregistré`
    });

  } catch (error) {
    console.error('Erreur paiement:', error);
    return res.status(500).json({ 
      error: 'Erreur lors du paiement',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}