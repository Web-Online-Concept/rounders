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
  // Vérifier l'authentification pour les opérations admin
  if (req.method !== 'GET') {
    const user = verifyToken(req);
    if (!user?.isAdmin) {
      return res.status(401).json({ error: 'Non autorisé' });
    }
  }

  try {
    switch (req.method) {
      case 'GET':
        // Récupérer tous les affiliés
        const affiliates = await prisma.affiliate.findMany({
          orderBy: { createdAt: 'desc' }
        });
        
        // Calculer les montants pour chaque affilié
        const affiliatesWithAmounts = await Promise.all(
          affiliates.map(async (affiliate) => {
            // Calculer le total payé
            const payments = await prisma.payment.aggregate({
              where: { affiliateId: affiliate.id },
              _sum: { amount: true }
            });
            
            return {
              ...affiliate,
              totalBet: parseFloat(affiliate.totalBet || 0),
              totalCommission: parseFloat(affiliate.totalCommission || 0),
              pendingAmount: parseFloat(affiliate.pendingAmount || 0),
              paidAmount: parseFloat(payments._sum.amount || 0),
              lastTotalCommission: parseFloat(affiliate.lastTotalCommission || 0)
            };
          })
        );
        
        return res.status(200).json({ 
          success: true, 
          data: affiliatesWithAmounts 
        });

      case 'POST':
        // Créer un nouvel affilié
        const { 
          pseudoMasked, 
          pseudoReal, 
          email, 
          totalBet,
          totalCommission,
          registrationDate 
        } = req.body;

        if (!pseudoMasked) {
          return res.status(400).json({ error: 'Pseudo masqué requis' });
        }

        const newAffiliate = await prisma.affiliate.create({
          data: {
            pseudoMasked,
            pseudoReal: pseudoReal || null,
            email: email || null,
            totalBet: totalBet || 0,
            totalCommission: totalCommission || 0,
            lastTotalCommission: totalCommission || 0,
            registrationDate: registrationDate ? new Date(registrationDate) : new Date(),
            pendingAmount: 0,
            paidAmount: 0
          }
        });

        return res.status(201).json({ 
          success: true, 
          data: newAffiliate 
        });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}