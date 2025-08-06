import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Récupérer tous les affiliés avec leurs commissions et paiements
      const affiliates = await prisma.affiliate.findMany({
        include: {
          commissions: {
            orderBy: {
              periodEnd: 'desc'
            }
          },
          payments: {
            orderBy: {
              paidAt: 'desc'
            },
            take: 10 // Limiter à 10 derniers paiements
          }
        }
      });

      // Calculer les statistiques pour chaque affilié
      const affiliatesWithStats = affiliates.map(affiliate => {
        // Calculer les totaux
        const totalBet = affiliate.commissions.reduce(
          (sum, comm) => sum + parseFloat(comm.totalBet), 
          0
        );
        
        const totalCommission = affiliate.commissions.reduce(
          (sum, comm) => sum + parseFloat(comm.totalCommission), 
          0
        );
        
        const paidCommission = affiliate.payments.reduce(
          (sum, payment) => sum + parseFloat(payment.amount), 
          0
        );
        
        // Calculer les commissions en attente (non payées)
        const unpaidCommissions = affiliate.commissions.filter(comm => !comm.isPaid);
        const pendingCommission = unpaidCommissions.reduce(
          (sum, comm) => sum + parseFloat(comm.affiliateShare), 
          0
        );

        return {
          id: affiliate.id,
          pseudo: affiliate.isConfirmed ? affiliate.pseudoReal : affiliate.pseudoMasked,
          pseudoConfirmed: affiliate.isConfirmed,
          vipLevel: affiliate.vipLevel,
          totalBet,
          totalCommission,
          paidCommission,
          pendingCommission,
          registrationDate: affiliate.registrationDate,
          lastDepositDate: affiliate.lastDepositDate,
          paymentHistory: affiliate.payments.map(payment => ({
            date: payment.paidAt,
            amount: parseFloat(payment.amount),
            type: payment.type
          }))
        };
      });

      res.status(200).json({
        success: true,
        data: affiliatesWithStats
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des affiliés:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des données'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}