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
  if (req.method !== 'POST') {
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

    const { affiliateId, amount, paymentMethod = 'CRYPTO', transactionId = null, note = null } = req.body;

    if (!affiliateId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Données invalides' });
    }

    console.log(`💸 Confirmation de paiement pour l'affilié ${affiliateId}`);

    // Récupérer l'affilié
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId }
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affilié introuvable' });
    }

    const paymentAmount = parseFloat(amount);

    // Créer l'enregistrement de paiement
    const payment = await prisma.payment.create({
      data: {
        affiliateId: affiliateId,
        amount: paymentAmount,
        paymentMethod: paymentMethod,
        transactionId: transactionId,
        note: note || `Paiement du ${new Date().toLocaleDateString('fr-FR')}`,
        paidAt: new Date()
      }
    });

    // Mettre à jour l'affilié
    await prisma.affiliate.update({
      where: { id: affiliateId },
      data: {
        // Mettre à jour lastPaidCommission avec la commission actuelle
        lastPaidCommission: affiliate.currentCommission,
        // Incrémenter le total payé
        paidAmount: {
          increment: paymentAmount
        },
        // Remettre pendingAmount à 0 (au cas où il y aurait encore quelque chose)
        pendingAmount: 0,
        lastUpdated: new Date()
      }
    });

    // Créer un log système
    await prisma.systemLog.create({
      data: {
        action: 'PAYMENT_CONFIRMED',
        details: `Paiement de ${paymentAmount}€ confirmé pour ${affiliate.name} (${paymentMethod})`,
        createdAt: new Date()
      }
    });

    console.log(`✅ Paiement de ${paymentAmount}€ confirmé pour ${affiliate.name}`);

    return res.status(200).json({
      success: true,
      message: 'Paiement confirmé avec succès',
      payment: payment
    });

  } catch (error) {
    console.error('❌ Erreur lors de la confirmation du paiement:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la confirmation du paiement',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}