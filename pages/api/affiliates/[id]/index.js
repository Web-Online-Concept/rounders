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
  // Vérifier l'authentification pour toutes les méthodes
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  
  const isAdmin = await verifyAdminToken(token);
  if (!isAdmin) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      // Récupérer un affilié
      const affiliate = await prisma.affiliate.findUnique({
        where: { id }
      });

      if (!affiliate) {
        return res.status(404).json({ error: 'Affilié introuvable' });
      }

      // Convertir toutes les valeurs Decimal en nombres
      const affiliateData = {
        ...affiliate,
        startingCommission: parseFloat(affiliate.startingCommission || 0),
        lastPaidCommission: parseFloat(affiliate.lastPaidCommission || 0),
        currentCommission: parseFloat(affiliate.currentCommission || 0),
        currentTotalBet: parseFloat(affiliate.currentTotalBet || 0),
        pendingAmount: parseFloat(affiliate.pendingAmount || 0),
        paidAmount: parseFloat(affiliate.paidAmount || 0)
      };

      return res.status(200).json(affiliateData);

    } else if (req.method === 'DELETE') {
      // Supprimer un affilié
      
      // Vérifier que l'affilié existe
      const affiliate = await prisma.affiliate.findUnique({
        where: { id }
      });

      if (!affiliate) {
        return res.status(404).json({ error: 'Affilié introuvable' });
      }

      console.log(`🗑️ Suppression de l'affilié: ${affiliate.name} (${affiliate.stakeUsername})`);

      // Supprimer l'affilié (les relations sont en cascade)
      await prisma.affiliate.delete({
        where: { id }
      });

      // Log système
      await prisma.systemLog.create({
        data: {
          action: 'AFFILIATE_DELETED',
          details: `Affilié supprimé: ${affiliate.name} (${affiliate.stakeUsername})`
        }
      });

      console.log(`✅ Affilié ${affiliate.name} supprimé avec succès`);

      return res.status(200).json({
        success: true,
        message: 'Affilié supprimé avec succès'
      });

    } else if (req.method === 'PUT') {
      // Modifier un affilié
      const { name, email, isActive } = req.body;

      // Vérifier que l'affilié existe
      const affiliate = await prisma.affiliate.findUnique({
        where: { id }
      });

      if (!affiliate) {
        return res.status(404).json({ error: 'Affilié introuvable' });
      }

      // Préparer les données à mettre à jour
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (email !== undefined) updateData.email = email;
      if (isActive !== undefined) updateData.isActive = isActive;

      // Mettre à jour l'affilié
      const updatedAffiliate = await prisma.affiliate.update({
        where: { id },
        data: updateData
      });

      // Log système
      await prisma.systemLog.create({
        data: {
          action: 'AFFILIATE_UPDATED',
          details: `Affilié modifié: ${updatedAffiliate.name} (${updatedAffiliate.stakeUsername})`
        }
      });

      console.log(`✅ Affilié ${updatedAffiliate.name} modifié avec succès`);

      return res.status(200).json({
        success: true,
        message: 'Affilié modifié avec succès',
        affiliate: updatedAffiliate
      });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Erreur API affiliates/[id]:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}