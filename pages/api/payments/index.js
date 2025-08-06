import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Récupérer tous les paiements avec les infos affiliés
        const payments = await prisma.payment.findMany({
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
          data: payments
        });

      default:
        res.setHeader('Allow', ['GET']);
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