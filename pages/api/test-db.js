export default async function handler(req, res) {
  try {
    // Test 1: Sans DB
    if (req.query.test === '1') {
      return res.json({ success: true, message: 'API fonctionne' });
    }

    // Test 2: Import Prisma
    if (req.query.test === '2') {
      const { PrismaClient } = require('@prisma/client');
      return res.json({ success: true, message: 'Prisma importé' });
    }

    // Test 3: Connexion DB
    if (req.query.test === '3') {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      
      try {
        const count = await prisma.affiliate.count();
        return res.json({ success: true, count });
      } finally {
        await prisma.$disconnect();
      }
    }

    return res.json({ error: 'Ajoutez ?test=1, 2 ou 3' });
    
  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
}