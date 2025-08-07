import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction pour masquer le pseudo
function maskUsername(username) {
  if (!username || username.length <= 3) return username;
  return '***' + username.slice(-3);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID affilié manquant' });
  }

  try {
    // Récupérer l'affilié
    const affiliate = await prisma.affiliate.findUnique({
      where: { 
        id: parseInt(id),
        isActive: true
      },
      select: {
        id: true,
        stakeUsername: true,
        currentCommission: true,
        currentTotalBet: true,
        pendingAmount: true,
        paidAmount: true,
        createdAt: true
      }
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affilié non trouvé' });
    }

    // Récupérer l'historique des commissions
    const commissionHistory = await prisma.commissionHistory.findMany({
      where: {
        affiliateId: parseInt(id)
      },
      orderBy: {
        calculatedAt: 'desc'
      },
      take: 50 // Limiter à 50 dernières entrées
    });

    // Récupérer les paiements
    const payments = await prisma.payment.findMany({
      where: {
        affiliateId: parseInt(id)
      },
      orderBy: {
        paidAt: 'desc'
      },
      take: 50 // Limiter à 50 derniers paiements
    });

    // Préparer les données publiques
    const publicData = {
      affiliate: {
        id: affiliate.id,
        username: maskUsername(affiliate.stakeUsername),
        commission: parseFloat(affiliate.currentCommission || 0),
        totalBet: parseFloat(affiliate.currentTotalBet || 0),
        pending: parseFloat(affiliate.pendingAmount || 0),
        paid: parseFloat(affiliate.paidAmount || 0),
        joinedAt: affiliate.createdAt
      },
      history: commissionHistory.map(entry => ({
        date: entry.calculatedAt,
        previousCommission: parseFloat(entry.previousCommission || 0),
        newCommission: parseFloat(entry.newCommission || 0),
        difference: parseFloat(entry.commissionDifference || 0),
        affiliateShare: parseFloat(entry.affiliateShare || 0),
        method: entry.method
      })),
      payments: payments.map(payment => ({
        date: payment.paidAt,
        amount: parseFloat(payment.amount || 0),
        crypto: payment.paymentMethod,
        transactionId: payment.transactionId ? 
          payment.transactionId.substring(0, 8) + '...' : null
      }))
    };

    return res.status(200).json({
      success: true,
      data: publicData
    });

  } catch (error) {
    console.error('Erreur API historique affilié:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération des données',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}