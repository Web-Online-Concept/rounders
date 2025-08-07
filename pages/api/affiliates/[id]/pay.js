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

    const { id } = req.query;
    const { amount, paymentMethod, transactionId, note } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Montant invalide' });
    }

    // Récupérer l'affilié
    const affiliate = await prisma.affiliate.findUnique({
      where: { id }
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affilié introuvable' });
    }

    const paymentAmount = parseFloat(amount);
    const pendingAmount = parseFloat(affiliate.pendingAmount);

    if (paymentAmount > pendingAmount) {
      return res.status(400).json({ 
        error: `Le montant ne peut pas dépasser ${pendingAmount}€` 
      });
    }

    console.log(`💰 Paiement pour ${affiliate.name}: ${paymentAmount}€`);

    // Créer le paiement
    const payment = await prisma.payment.create({
      data: {
        affiliateId: id,
        amount: paymentAmount,
        paymentMethod: paymentMethod || 'USDT',
        transactionId: transactionId || null,
        note: note || null,
        paidAt: new Date()
      }
    });

    // Mettre à jour l'affilié
    const newPendingAmount = pendingAmount - paymentAmount;
    const newPaidAmount = parseFloat(affiliate.paidAmount) + paymentAmount;

    await prisma.affiliate.update({
      where: { id },
      data: {
        pendingAmount: newPendingAmount,
        paidAmount: newPaidAmount,
        lastPaidCommission: affiliate.currentCommission, // On met à jour la référence
        lastUpdated: new Date()
      }
    });

    // Log système
    await prisma.systemLog.create({
      data: {
        action: 'PAYMENT_MADE',
        details: `Paiement de ${paymentAmount}€ effectué pour ${affiliate.name} (${paymentMethod})`
      }
    });

    console.log(`✅ Paiement enregistré avec succès`);
    console.log(`   Nouveau solde en attente: ${newPendingAmount}€`);
    console.log(`   Total payé historique: ${newPaidAmount}€`);

    return res.status(200).json({
      success: true,
      message: 'Paiement enregistré avec succès',
      payment,
      newBalance: {
        pending: newPendingAmount,
        totalPaid: newPaidAmount
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors du paiement:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'enregistrement du paiement',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}