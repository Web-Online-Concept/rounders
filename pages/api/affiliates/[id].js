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
  // Vérifier l'authentification
  const user = verifyToken(req);
  if (!user?.isAdmin) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        // Récupérer un affilié spécifique
        const affiliate = await prisma.affiliate.findUnique({
          where: { id },
          include: {
            payments: {
              orderBy: { paidAt: 'desc' },
              take: 10
            }
          }
        });

        if (!affiliate) {
          return res.status(404).json({ error: 'Affilié non trouvé' });
        }

        return res.status(200).json({ 
          success: true, 
          data: affiliate 
        });

      case 'PATCH':
        // Mettre à jour un affilié
        const updateData = { ...req.body };
        
        // Ajouter lastUpdate
        updateData.lastUpdate = new Date();

        const updatedAffiliate = await prisma.affiliate.update({
          where: { id },
          data: updateData
        });

        return res.status(200).json({ 
          success: true, 
          data: updatedAffiliate 
        });

      case 'DELETE':
        // Supprimer un affilié
        await prisma.affiliate.delete({
          where: { id }
        });

        return res.status(200).json({ 
          success: true, 
          message: 'Affilié supprimé' 
        });

      default:
        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
        return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Affilié non trouvé' });
    }
    
    return res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}