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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vérifier l'authentification
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');
    
    const isAdmin = await verifyAdminToken(token);
    if (!isAdmin) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    const { stakeUsername, name, email, startingCommission } = req.body;

    // Validation des données
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

    // Créer l'affilié avec la commission de départ
    const commission = parseFloat(startingCommission) || 0;
    
    const newAffiliate = await prisma.affiliate.create({
      data: {
        stakeUsername,
        name,
        email: email || null,
        startingCommission: commission,
        lastPaidCommission: commission, // On part de cette commission
        currentCommission: commission,
        currentTotalBet: 0,
        pendingAmount: 0,
        paidAmount: 0,
        isActive: true,
        createdAt: new Date(),
        lastUpdated: new Date()
      }
    });

    console.log(`✅ Affilié ${name} ajouté avec succès`);
    console.log(`   Commission de départ: ${commission}€`);

    // Créer une entrée dans l'historique système
    await prisma.systemLog.create({
      data: {
        action: 'AFFILIATE_ADDED',
        details: `Nouvel affilié ajouté: ${name} (${stakeUsername}) - Commission de départ: ${commission}€`,
        createdAt: new Date()
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Affilié ajouté avec succès',
      affiliate: newAffiliate
    });

  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'affilié:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'ajout de l\'affilié',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}