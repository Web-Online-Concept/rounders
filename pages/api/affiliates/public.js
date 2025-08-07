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

  try {
    // Récupérer tous les affiliés actifs SANS authentification
    const affiliates = await prisma.affiliate.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transformer pour la page publique
    const publicData = affiliates.map(aff => ({
      id: aff.id,
      pseudoMasked: maskUsername(aff.stakeUsername),
      totalBet: parseFloat(aff.currentTotalBet || 0),
      totalCommission: parseFloat(aff.currentCommission || 0),
      paidAmount: parseFloat(aff.paidAmount || 0),
      pendingAmount: parseFloat(aff.pendingAmount || 0),
      registrationDate: aff.createdAt,
      lastUpdate: aff.lastUpdated
    }));

    return res.status(200).json({
      success: true,
      data: publicData
    });

  } catch (error) {
    console.error('Erreur API affiliates publique:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}