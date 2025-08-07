import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction pour masquer le pseudo (garde seulement les 3 derniers caractères)
function maskUsername(username) {
  if (!username || username.length <= 3) return username;
  return '***' + username.slice(-3);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Récupérer tous les affiliés actifs
    const affiliates = await prisma.affiliate.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        stakeUsername: true,
        currentCommission: true,
        currentTotalBet: true,
        pendingAmount: true,
        paidAmount: true,
        createdAt: true,
        lastUpdated: true
      },
      orderBy: {
        currentCommission: 'desc'
      }
    });

    // Récupérer les statistiques globales
    const stats = await prisma.affiliate.aggregate({
      where: {
        isActive: true
      },
      _sum: {
        currentCommission: true,
        currentTotalBet: true,
        pendingAmount: true,
        paidAmount: true
      },
      _count: {
        id: true
      }
    });

    // Récupérer la dernière mise à jour
    const lastUpdate = await prisma.systemLog.findFirst({
      where: {
        action: 'MANUAL_UPDATE'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Masquer les pseudos et convertir les montants
    const publicAffiliates = affiliates.map(affiliate => ({
      id: affiliate.id,
      username: maskUsername(affiliate.stakeUsername),
      commission: parseFloat(affiliate.currentCommission || 0),
      totalBet: parseFloat(affiliate.currentTotalBet || 0),
      pending: parseFloat(affiliate.pendingAmount || 0),
      paid: parseFloat(affiliate.paidAmount || 0),
      joinedAt: affiliate.createdAt,
      lastUpdate: affiliate.lastUpdated
    }));

    // Préparer les stats publiques
    const publicStats = {
      totalAffiliates: stats._count.id || 0,
      totalCommission: parseFloat(stats._sum.currentCommission || 0),
      totalBet: parseFloat(stats._sum.currentTotalBet || 0),
      totalPending: parseFloat(stats._sum.pendingAmount || 0),
      totalPaid: parseFloat(stats._sum.paidAmount || 0),
      lastUpdate: lastUpdate?.createdAt || null
    };

    return res.status(200).json({
      success: true,
      affiliates: publicAffiliates,
      stats: publicStats
    });

  } catch (error) {
    console.error('Erreur API publique affiliates:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération des données',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}