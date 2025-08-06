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
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
  }

  // Vérifier l'authentification
  const user = verifyToken(req);
  if (!user?.isAdmin) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  try {
    // Récupérer tous les affiliés pour les stats
    const affiliates = await prisma.affiliate.findMany();
    
    // Calculer les totaux
    const totalAffiliates = affiliates.length;
    const confirmedAffiliates = affiliates.filter(a => a.isConfirmed).length;
    const totalPending = affiliates.reduce((sum, aff) => sum + (aff.pendingAmount || 0), 0);
    const totalPaid = affiliates.reduce((sum, aff) => sum + (aff.paidAmount || 0), 0);
    const totalCommissions = affiliates.reduce((sum, aff) => sum + (aff.totalCommission || 0), 0);
    
    // Récupérer les déclarations en attente
    const pendingDeclarations = await prisma.declaration.count({
      where: {
        status: 'PENDING'
      }
    });
    
    // Calculer le volume mensuel (somme des paris du mois en cours)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const monthlyCommissions = await prisma.commission.findMany({
      where: {
        createdAt: {
          gte: startOfMonth
        }
      }
    });
    
    const monthlyVolume = monthlyCommissions.reduce((sum, comm) => sum + (comm.totalBet || 0), 0);

    return res.status(200).json({
      totalAffiliates,
      confirmedAffiliates,
      totalPending,
      totalPaid,
      totalCommissions,
      pendingDeclarations,
      monthlyVolume
    });

  } catch (error) {
    console.error('Erreur stats:', error);
    return res.status(500).json({ 
      error: 'Erreur lors du calcul des statistiques',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}