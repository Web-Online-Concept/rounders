const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDuplicates() {
  try {
    console.log('🔍 Vérification des doublons...\n');

    // Récupérer tous les affiliés
    const affiliates = await prisma.affiliate.findMany({
      select: {
        id: true,
        stakeUsername: true,
        name: true,
        email: true
      }
    });

    console.log(`Total affiliés: ${affiliates.length}`);

    // Grouper par stakeUsername pour trouver les doublons
    const usernameMap = {};
    
    affiliates.forEach(affiliate => {
      const username = affiliate.stakeUsername || 'VIDE';
      if (!usernameMap[username]) {
        usernameMap[username] = [];
      }
      usernameMap[username].push(affiliate);
    });

    // Afficher les doublons
    let hasDuplicates = false;
    
    for (const [username, affiliatesList] of Object.entries(usernameMap)) {
      if (affiliatesList.length > 1) {
        hasDuplicates = true;
        console.log(`\n⚠️  Doublon trouvé pour: ${username}`);
        affiliatesList.forEach(affiliate => {
          console.log(`   - ID: ${affiliate.id}, Nom: ${affiliate.name || 'Sans nom'}, Email: ${affiliate.email || 'Sans email'}`);
        });
      }
    }

    if (!hasDuplicates) {
      console.log('\n✅ Aucun doublon trouvé ! Vous pouvez appliquer la migration en toute sécurité.');
    } else {
      console.log('\n❌ Des doublons ont été trouvés. Vous devez les corriger avant d\'appliquer la migration.');
      console.log('\nOptions:');
      console.log('1. Supprimer les doublons manuellement dans Prisma Studio');
      console.log('2. Modifier les stakeUsername pour les rendre uniques');
      console.log('3. Fusionner les comptes en double');
    }

    // Vérifier aussi les valeurs vides/null
    const emptyUsernames = affiliates.filter(a => !a.stakeUsername || a.stakeUsername.trim() === '');
    if (emptyUsernames.length > 0) {
      console.log(`\n⚠️  ${emptyUsernames.length} affilié(s) sans stakeUsername:`);
      emptyUsernames.forEach(affiliate => {
        console.log(`   - ID: ${affiliate.id}, Nom: ${affiliate.name || 'Sans nom'}`);
      });
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDuplicates();