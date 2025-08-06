// Script pour générer un hash de mot de passe sécurisé
// Utilisation : node scripts/generate-password.js

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

console.log('=================================');
console.log('Générateur de mot de passe admin');
console.log('=================================\n');

// Fonction pour masquer le mot de passe lors de la saisie
const hidden = (query, callback) => {
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.resume();
  stdout.write(query);

  let input = '';
  
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');

  const onData = (char) => {
    char = char.toString('utf8');

    switch (char) {
      case '\n':
      case '\r':
      case '\u0004':
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        stdout.write('\n');
        callback(input);
        break;
      case '\u0003':
        process.exit();
        break;
      case '\u007f':
      case '\b':
        if (input.length > 0) {
          input = input.slice(0, -1);
          stdout.clearLine();
          stdout.cursorTo(0);
          stdout.write(query + '*'.repeat(input.length));
        }
        break;
      default:
        input += char;
        stdout.write('*');
        break;
    }
  };

  stdin.on('data', onData);
};

// Demander le mot de passe
hidden('Entrez le mot de passe admin à hasher : ', async (password) => {
  if (!password) {
    console.log('\n❌ Mot de passe vide !');
    process.exit(1);
  }

  // Vérifier la force du mot de passe
  if (password.length < 8) {
    console.log('\n⚠️  Attention : Le mot de passe fait moins de 8 caractères');
  }

  console.log('\nGénération du hash...\n');

  try {
    // Générer le hash avec bcrypt (10 rounds)
    const hash = await bcrypt.hash(password, 10);
    
    console.log('✅ Hash généré avec succès !\n');
    console.log('=================================');
    console.log('Copiez cette ligne dans votre fichier .env.local :');
    console.log('=================================\n');
    console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
    console.log('=================================');
    console.log('\n📝 Instructions :');
    console.log('1. Créez un fichier .env.local à la racine du projet');
    console.log('2. Ajoutez la ligne ci-dessus dans ce fichier');
    console.log('3. Ajoutez aussi : ADMIN_EMAIL=votre-email@domain.com');
    console.log('4. Ajoutez aussi : JWT_SECRET=une-cle-secrete-longue-et-complexe');
    console.log('5. Ne JAMAIS commit le fichier .env.local !');
    console.log('\n🔒 Votre admin sera maintenant sécurisé !');
    
  } catch (error) {
    console.error('\n❌ Erreur lors de la génération du hash :', error);
  }

  rl.close();
  process.exit(0);
});