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
  // Vérifier l'authentification
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  
  const isAdmin = await verifyAdminToken(token);
  if (!isAdmin) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  try {
    if (req.method === 'GET') {
      // Récupérer tous les affiliés actifs
      const affiliates = await prisma.affiliate.findMany({
        where: {
          isActive: true
        },
        orderBy: {
          createdAt: 'desc'
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

      return res.status(200).json({
        success: true,
        affiliates,
        lastUpdate: lastUpdate?.createdAt || null
      });

    } else if (req.method === 'POST') {
      // Ajouter un nouvel affilié
      const { stakeUsername, name, email, startingCommission } = req.body;

      // Validation
      if (!stakeUsername || !name) {
        return res.status(400).json({ 
          error: 'Le pseudo Stake et le nom sont obligatoires' 
        });
      }

      // Vérifier si l'affilié existe déjà
      const existingAffiliate = await prisma.affiliate.findUnique({
        where: { stakeUsername }
      });

      if (existingAffiliate) {
        return res.status(400).json({ 
          error: 'Cet affilié est déjà déclaré dans le système' 
        });
      }

      console.log(`➕ Ajout d'un nouvel affilié: ${name} (${stakeUsername})`);

      // Créer l'affilié
      const commission = parseFloat(startingCommission) || 0;
      
      const newAffiliate = await prisma.affiliate.create({
        data: {
          stakeUsername,
          name,
          email: email || null,
          startingCommission: commission,
          lastPaidCommission: commission,
          currentCommission: commission,
          currentTotalBet: 0,
          pendingAmount: 0,
          paidAmount: 0,
          isActive: true,
          lastUpdated: new Date()
        }
      });

      // Log système
      await prisma.systemLog.create({
        data: {
          action: 'AFFILIATE_ADDED',
          details: `Nouvel affilié ajouté: ${name} (${stakeUsername}) - Commission de départ: ${commission}€`
        }
      });

      console.log(`✅ Affilié ${name} ajouté avec succès`);

      return res.status(200).json({
        success: true,
        message: 'Affilié ajouté avec succès',
        affiliate: newAffiliate
      });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Erreur API affiliates:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}