import { PrismaClient } from '@prisma/client';

// Créer une instance unique de Prisma pour la production
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Fonction pour masquer le pseudo
function maskUsername(username) {
  if (!username || username.length <= 3) return username;
  return '***' + username.slice(-3);
}

export default async function handler(req, res) {
  // Définir les headers CORS si nécessaire
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('API publique affiliés appelée');
    
    // Récupérer tous les affiliés actifs
    const affiliates = await prisma.affiliate.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`${affiliates.length} affiliés trouvés`);

    // Transformer pour la page publique avec tous les champs nécessaires
    const publicData = affiliates.map(aff => {
      const maskedUsername = maskUsername(aff.stakeUsername);
      return {
        id: aff.id,
        username: maskedUsername,
        pseudoMasked: maskedUsername,
        totalBet: parseFloat(aff.currentTotalBet || 0),
        totalCommission: parseFloat(aff.currentCommission || 0),
        commission: parseFloat(aff.currentCommission || 0),
        paidAmount: parseFloat(aff.paidAmount || 0),
        paid: parseFloat(aff.paidAmount || 0),
        pendingAmount: parseFloat(aff.pendingAmount || 0),
        pending: parseFloat(aff.pendingAmount || 0),
        registrationDate: aff.createdAt,
        joinedAt: aff.createdAt,
        createdAt: aff.createdAt,
        lastUpdate: aff.lastUpdated || aff.updatedAt
      };
    });

    return res.status(200).json({
      success: true,
      data: publicData,
      count: publicData.length
    });

  } catch (error) {
    console.error('Erreur API affiliates publique:', error);
    console.error('Stack:', error.stack);
    
    // Retourner une réponse d'erreur plus détaillée
    return res.status(500).json({ 
      error: 'Erreur serveur',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Une erreur est survenue',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}