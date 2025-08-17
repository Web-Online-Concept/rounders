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

    const { updates } = req.body;

    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ error: 'Données invalides' });
    }

    console.log(`📊 Mise à jour manuelle pour ${updates.length} affiliés`);

    let updatedCount = 0;
    const errors = [];
    const paymentsToMake = []; // Liste des paiements à effectuer

    // Traiter chaque mise à jour
    for (const update of updates) {
      try {
        const { affiliateId, totalBet, totalCommission } = update;

        // Récupérer l'affilié actuel
        const affiliate = await prisma.affiliate.findUnique({
          where: { id: affiliateId }
        });

        if (!affiliate) {
          errors.push(`Affilié ${affiliateId} introuvable`);
          continue;
        }

        // Calculer la différence de commission
        const lastPaidCommission = parseFloat(affiliate.lastPaidCommission) || 0;
        const newCommission = parseFloat(totalCommission) || 0;
        const commissionDifference = newCommission - lastPaidCommission;

        console.log(`🧮 ${affiliate.name}:`);
        console.log(`   Commission actuelle: ${affiliate.currentCommission}€ → ${newCommission}€`);
        console.log(`   Dernière payée: ${lastPaidCommission}€`);
        console.log(`   Différence: ${commissionDifference}€`);

        // Mettre à jour les valeurs actuelles ET lastPaidCommission (toujours)
        await prisma.affiliate.update({
          where: { id: affiliateId },
          data: {
            currentTotalBet: totalBet,
            currentCommission: newCommission,
            lastPaidCommission: newCommission, // On met toujours à jour avec la dernière valeur
            lastUpdated: new Date()
          }
        });

        // Si différence positive, préparer le paiement
        if (commissionDifference > 0) {
          const affiliateShare = commissionDifference * 0.5; // 50%

          // Créer un historique
          await prisma.commissionHistory.create({
            data: {
              affiliateId: affiliateId,
              previousTotalBet: affiliate.currentTotalBet || 0,
              newTotalBet: totalBet,
              previousCommission: affiliate.currentCommission || 0,
              newCommission: newCommission,
              commissionDifference: commissionDifference,
              affiliateShare: affiliateShare,
              calculatedAt: new Date(),
              method: 'MANUAL'
            }
          });

          // Ajouter à la liste des paiements à faire
          paymentsToMake.push({
            affiliateId: affiliate.id,
            affiliateName: affiliate.name,
            affiliateEmail: affiliate.email,
            amount: affiliateShare,
            commission: newCommission,
            difference: commissionDifference
          });

          updatedCount++;
          console.log(`✅ ${affiliate.name}: ${affiliateShare.toFixed(2)}€ à payer`);
        } else {
          updatedCount++;
          console.log(`✅ ${affiliate.name}: Valeurs mises à jour (pas de nouvelle commission)`);
        }

      } catch (error) {
        console.error(`❌ Erreur pour l'affilié ${update.affiliateId}:`, error);
        errors.push(`Erreur pour l'affilié ${update.affiliateId}: ${error.message}`);
      }
    }

    // Créer un snapshot global pour garder une trace
    await prisma.systemLog.create({
      data: {
        action: 'MANUAL_UPDATE',
        details: `Mise à jour manuelle de ${updatedCount} affiliés - ${paymentsToMake.length} paiements à effectuer`,
        createdAt: new Date()
      }
    });

    console.log(`\n✅ Mise à jour terminée: ${updatedCount}/${updates.length} affiliés traités`);
    console.log(`💰 ${paymentsToMake.length} paiements à effectuer`);

    return res.status(200).json({
      success: true,
      message: 'Mise à jour réussie',
      updated: updatedCount,
      paymentsToMake: paymentsToMake, // Retourner la liste des paiements
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la mise à jour',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}