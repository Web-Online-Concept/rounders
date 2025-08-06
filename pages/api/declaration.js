import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { declaredPseudo, email, message, screenshot } = req.body;

      // Validation des données
      if (!declaredPseudo || !email) {
        return res.status(400).json({
          success: false,
          error: 'Le pseudo et l\'email sont obligatoires'
        });
      }

      // Vérifier si une déclaration existe déjà pour cet email
      const existingDeclaration = await prisma.declaration.findFirst({
        where: {
          email,
          status: 'pending'
        }
      });

      if (existingDeclaration) {
        return res.status(400).json({
          success: false,
          error: 'Une déclaration est déjà en cours pour cet email'
        });
      }

      // Créer la nouvelle déclaration avec le screenshot
      const declaration = await prisma.declaration.create({
        data: {
          declaredPseudo,
          email,
          message,
          screenshot, // Ajout du champ screenshot
          status: 'pending'
        }
      });

      res.status(201).json({
        success: true,
        message: 'Votre déclaration a été enregistrée. Nous vous contacterons prochainement.',
        data: {
          id: declaration.id,
          createdAt: declaration.createdAt
        }
      });
    } catch (error) {
      console.error('Erreur lors de la création de la déclaration:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'enregistrement de votre déclaration'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}