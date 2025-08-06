import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({
      success: false,
      message: `Method ${method} Not Allowed`
    });
  }

  try {
    // Récupérer le paiement avant de le supprimer
    const payment = await prisma.payment.findUnique({
      where: { id: id },
      include: {
        affiliate: true
      }
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Paiement non trouvé'
      });
    }

    // Supprimer le paiement
    await prisma.payment.delete({
      where: { id: id }
    });

    // Mettre à jour les montants de l'affilié
    // Remettre le montant en "commission en attente"
    await prisma.affiliate.update({
      where: { id: payment.affiliateId },
      data: {
        pendingAmount: payment.affiliate.pendingAmount + payment.amount,
        paidAmount: Math.max(0, payment.affiliate.paidAmount - payment.amount)
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Paiement supprimé avec succès'
    });

  } catch (error) {
    console.error('API Delete Payment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du paiement',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}