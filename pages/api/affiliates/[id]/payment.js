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
  const { amount, crypto = 'USDT', transactionId, note = 'Paiement hebdomadaire' } = req.body;

  try {
    // Récupérer l'affilié
    const affiliate = await prisma.affiliate.findUnique({
      where: { id }
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affilié non trouvé' });
    }

    const paymentAmount = parseFloat(amount || affiliate.pendingAmount || 0);
    
    if (paymentAmount <= 0) {
      return res.status(400).json({ error: 'Montant invalide' });
    }

    // Créer le paiement
    const payment = await prisma.payment.create({
      data: {
        affiliateId: id,
        amount: paymentAmount,
        crypto,
        transactionId: transactionId || `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        note,
        paidAt: new Date()
      }
    });

    // Mettre à jour l'affilié
    // IMPORTANT : on enregistre la commission actuelle comme nouveau point de référence
    await prisma.affiliate.update({
      where: { id },
      data: {
        pendingAmount: 0, // Repart à 0
        paidAmount: {
          increment: paymentAmount // Ajoute au total payé
        },
        lastPaidCommission: affiliate.currentCommission, // Nouveau point de référence
        lastPaymentDate: new Date(),
        lastUpdate: new Date()
      }
    });

    // Log pour traçabilité
    console.log(`💰 Paiement enregistré pour ${affiliate.pseudoReal || affiliate.pseudoMasked}:`);
    console.log(`   - Montant: ${paymentAmount}€`);
    console.log(`   - Nouvelle référence commission: ${affiliate.currentCommission}€`);

    return res.status(200).json({ 
      success: true,
      payment,
      message: `Paiement de ${paymentAmount}€ enregistré. Les commissions repartent maintenant de ${affiliate.currentCommission}€.`
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