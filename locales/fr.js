import playOnStake from './fr/playOnStake';
import affiliation from './fr/affiliation';
import commissions from './fr/commissions';
import terms from './fr/legal/terms';
import privacy from './fr/legal/privacy';
import notices from './fr/legal/notices';
import responsible from './fr/legal/responsible';

export default {
  // Header
  header: {
    logo: "Rounders",
    partner: "votre partenaire",
    affiliation: "Affiliation",
    commissions: "Commissions",
    playOnStake: "Jouer sur Stake",
    guideStake: "Guide Stake",
    menu: {
      inscription: "Inscription",
      bonus: "Bonus",
      jeux: "Jeux",
      cryptos: "Cryptos",
      faq: "FAQ"
    }
  },

  // Page d'accueil
  home: {
    meta: {
      title: "Rounders - Affiliation Stake",
      description: "Gagnez 50% de nos commissions d'affiliation Stake. Programme transparent avec paiements mensuels garantis et guide complet."
    },
    mainTitle: "Jouez sur la plateforme Stake",
    subtitle: "💰 Récupérez 50% de nos Commissions d'Affiliation 💰",
    discoverStake: {
      title: "Découvrez la plateforme Stake",
      description: "Explorez le casino n°1 mondial. Inscription simple, bonus exclusifs, 3000+ jeux, paris sportifs et poker. Accessible partout avec notre méthode."
    },
    guide: {
      title: "Le Guide Complet Stake",
      description: "Comment s'inscrire sur Stake depuis votre pays. Maximisez vos bonus, explorez les jeux et maîtrisez les cryptos avec notre guide détaillé.",
      button: "Lire le guide complet"
    },
    affiliation: {
      title: "Gagnez plus avec notre affiliation Stake",
      description: "Rejoignez notre programme et recevez",
      highlight: "50% de nos commissions",
      description2: " d'affiliation. Suivi transparent et paiements mensuels garantis.",
      button: "En savoir plus",
      videoPath: "/videos/affiliation_stake_fr.mp4"
    },
    commissions: {
      title: "Suivi et paiements des commissions",
      description: "Tableau de bord en temps réel pour suivre vos gains. Historique complet et gestion automatisée transparente.",
      button: "Voir mes commissions"
    },
    cta: {
      text: "Prêt à commencer ? Inscrivez-vous sur Stake avec notre lien d'affiliation",
      button: "Rejoindre Stake maintenant"
    }
  },

  // Page Jouer sur Stake (importée)
  playOnStake,

  // Page Affiliation (importée)
  affiliation,

  // Page Commissions (importée)
  commissions,

  // Pages Légales (importées)
  legal: {
    terms,
    privacy,
    notices,
    responsible
  },

  // Page Déclaration
  declaration: {
    meta: {
      title: "Déclaration d'Affiliation - Confirmez Votre Pseudo",
      description: "Confirmez votre pseudo Stake pour recevoir vos commissions d'affiliation. Processus simple et rapide."
    },
    hero: {
      title: "Confirmez votre",
      highlight: "Pseudo Stake",
      subtitle: "Une fois inscrit sur Stake via notre lien et Code Promo",
      subtitle2: "C'est la dernière étape pour recevoir vos commissions d'affiliation",
      processed: "Une fois votre demande traitée par notre équipe,",
      appear: "Votre profil apparaîtra sur le"
    },
    form: {
      title: "Formulaire de déclaration",
      stakePseudo: "Votre pseudo Stake",
      stakePseudoPlaceholder: "Ex: CryptoKing123",
      stakePseudoHelp: "Le pseudo exact que vous utilisez sur Stake",
      screenshot: "Capture d'écran de votre profil Stake",
      screenshotHelp: "Envoyez une capture d'écran de votre profil Stake montrant votre pseudo",
      screenshotExample: "Exemple : votre page de profil avec votre pseudo visible",
      chooseImage: "Choisir une image",
      imageFormat: "Format accepté : JPG, PNG (5MB max)",
      email: "Email de contact",
      emailPlaceholder: "votre@email.com",
      emailHelp: "Nous utiliserons cet email pour vous contacter si nécessaire",
      message: "Message (optionnel)",
      messagePlaceholder: "Informations supplémentaires...",
      messageHelp: "Ajoutez toute information utile pour votre déclaration",
      submit: "Envoyer ma déclaration",
      sending: "Envoi en cours...",
      required: "requis",
      success: {
        title: "Déclaration envoyée avec succès !",
        message: "Nous avons bien reçu votre demande. Nous vous contacterons dans les 24h pour confirmer votre affiliation.",
        reminder: "Rappel : Les commissions seront calculées à partir de maintenant uniquement.",
        viewCommissions: "Voir le tableau des commissions"
      },
      error: {
        screenshot: "La capture d'écran est requise",
        general: "Une erreur est survenue",
        fileSize: "Le fichier est trop volumineux (5MB maximum)",
        fileType: "Le fichier doit être une image"
      }
    },
    warning: {
      title: "Information importante sur les commissions",
      text1: "Les commissions sont calculées uniquement à partir de votre inscription officielle dans notre programme.",
      text2: "Les gains générés avant votre déclaration ne peuvent pas être réclamés rétroactivement. Nous prenons vos statistiques Stake au moment de l'ajout dans notre système comme point de départ, et seules les différences futures seront commissionnées à 50%.",
      example: "Exemple : Si au moment de l'inscription vous avez généré 10 000€ de commission totale sur Stake, et qu'une semaine après vous êtes à 10 200€, vous recevrez 50% de la différence (200€), soit 100€."
    },
    howItWorks: {
      title: "Comment ça marche ?",
      step1: {
        title: "Vérifiez votre inscription",
        description: "Assurez-vous d'avoir créé votre compte Stake via notre lien d'affiliation avec le code"
      },
      step2: {
        title: "Remplissez le formulaire",
        description: "Entrez votre pseudo Stake exact et votre email de contact"
      },
      step3: {
        title: "Traitement de votre demande",
        description: "Notre équipe vérifie votre affiliation et vous ajoute au système de commissions."
      },
      step4: {
        title: "Recevez vos paiements",
        description: "Une fois ajouté, vous recevrez 50% de nos commissions chaque semaine. Vous n'avez plus rien à faire."
      }
    },
    faq: {
      title: "Questions Fréquentes",
      q1: {
        question: "Pourquoi mon pseudo est masqué ?",
        answer: "Pour des raisons de sécurité, Stake ne nous communique qu'une partie du pseudo de nos affiliés. La déclaration nous permet de confirmer votre identité complète."
      },
      q2: {
        question: "Combien de temps pour le traitement ?",
        answer: "Nous traitons les déclarations rapidement. Vous recevrez un email de confirmation dès que votre compte sera ajouté au système."
      },
      q3: {
        question: "Comment sont calculées les commissions ?",
        answer: "Nous gagnons des commissions sur l'ensemble de vos jeux. Vous recevez exactement 50% de ce que nous gagnons grâce à votre activité, à partir de votre inscription."
      },
      q4: {
        question: "Quand sont effectués les paiements ?",
        answer: "Les paiements sont effectués chaque semaine via le système de tip de Stake, directement sur votre compte joueur."
      }
    }
  },

  // Page Contact
  contact: {
    meta: {
      title: "Contact - Rounders",
      description: "Contactez-nous pour toute question sur l'affiliation Stake, les bonus ou le suivi de vos gains."
    },
    hero: {
      title: "Contactez-nous",
      subtitle: "Une question ? Un problème ? Nous sommes là pour vous aider"
    },
    form: {
      title: "Envoyez-nous un message",
      name: "Nom complet",
      namePlaceholder: "Jean Dupont",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      subject: "Sujet",
      subjects: {
        general: "Question générale",
        affiliation: "Affiliation",
        payment: "Paiement",
        technical: "Problème technique",
        other: "Autre"
      },
      message: "Message",
      messagePlaceholder: "Décrivez votre demande en détail...",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      successTitle: "Message envoyé !",
      successMessage: "Nous avons bien reçu votre message et vous répondrons rapidement.",
      errorMessage: "Une erreur est survenue. Veuillez réessayer."
    }
  },

  // Footer
  footer: {
    about: {
      title: "Rounders",
      description: "Programme d'affiliation Stake transparent avec partage de 50% des commissions. Paiements mensuels garantis."
    },
    sitemap: {
      title: "Rounders.pro",
      playOnStake: "Jouer sur Stake",
      affiliation: "Affiliation",
      commissions: "Commissions",
      validateAffiliation: "Valider son Affiliation"
    },
    legal: {
      title: "Légal",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      legal: "Mentions légales",
      responsible: "Jeu responsable"
    },
    contact: {
      title: "Contact",
      email: "Email : rounders.pro@gmail.com",
      contactUs: "Nous contacter",
      joinStake: "Rejoindre Stake"
    },
    bottom: {
      copyright: "© {year} Rounders. Tous droits réservés.",
      disclaimer: "18+ | Jouez responsable | Le jeu comporte des risques"
    }
  }
}