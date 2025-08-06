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
  const { method } = req;

  // Vérifier l'authentification pour toutes les méthodes
  const user = verifyToken(req);
  if (!user?.isAdmin) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  try {
    switch (method) {
      case 'GET':
        // Récupérer toutes les déclarations
        const declarations = await prisma.declaration.findMany({
          include: {
            affiliate: {
              select: {
                id: true,
                pseudoMasked: true,
                pseudoReal: true,
                isConfirmed: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        });

        return res.status(200).json({
          success: true,
          data: declarations
        });

      case 'PATCH':
        // Mettre à jour une déclaration (approuver/rejeter)
        const { id, status, reviewNotes, confirmedPseudo } = req.body;

        if (!id || !status) {
          return res.status(400).json({
            success: false,
            error: 'ID et statut requis'
          });
        }

        const updateData = {
          status,
          reviewedAt: new Date(),
          reviewNotes
        };

        // Si on approuve, on peut confirmer le pseudo
        if (status === 'approved' && confirmedPseudo) {
          updateData.confirmedPseudo = confirmedPseudo;
        }

        const updatedDeclaration = await prisma.declaration.update({
          where: { id },
          data: updateData
        });

        // Si approuvé, créer ou mettre à jour l'affilié
        if (status === 'approved') {
          // Chercher si un affilié existe déjà avec ce pseudo masqué
          const existingAffiliate = await prisma.affiliate.findFirst({
            where: {
              pseudoMasked: { contains: confirmedPseudo.slice(-3) }
            }
          });

          if (existingAffiliate) {
            // Mettre à jour l'affilié existant
            await prisma.affiliate.update({
              where: { id: existingAffiliate.id },
              data: {
                pseudoReal: confirmedPseudo,
                isConfirmed: true,
                email: updatedDeclaration.email
              }
            });

            // Lier la déclaration à l'affilié
            await prisma.declaration.update({
              where: { id },
              data: { affiliateId: existingAffiliate.id }
            });
          }
        }

        return res.status(200).json({
          success: true,
          data: updatedDeclaration
        });

      default:
        res.setHeader('Allow', ['GET', 'PATCH']);
        return res.status(405).json({
          success: false,
          message: `Method ${method} Not Allowed`
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}