import playOnStake from './en/playOnStake';
import affiliation from './en/affiliation';
import commissions from './en/commissions';
import terms from './en/legal/terms';
import privacy from './en/legal/privacy';
import notices from './en/legal/notices';
import responsible from './en/legal/responsible';

export default {
  // Header
  header: {
    logo: "Rounders",
    partner: "your partner",
    affiliation: "Affiliation",
    commissions: "Commissions",
    playOnStake: "Play on Stake",
    guideStake: "Stake Guide",
    menu: {
      inscription: "Registration",
      bonus: "Bonuses",
      jeux: "Games",
      cryptos: "Cryptos",
      faq: "FAQ"
    }
  },

  // Homepage
  home: {
    meta: {
      title: "Rounders - Stake Affiliation",
      description: "Earn 50% of our Stake affiliate commissions. Transparent program with guaranteed monthly payments and complete guide."
    },
    mainTitle: "Play on the Stake Platform",
    subtitle: "💰 Get 50% of our Affiliate Commissions 💰",
    discoverStake: {
      title: "Discover the Stake Platform",
      description: "Explore the world's #1 casino. Simple registration, exclusive bonuses, 3000+ games, sports betting and poker. Accessible everywhere with our method."
    },
    guide: {
      title: "The Complete Stake Guide",
      description: "How to register on Stake from your country. Maximize your bonuses, explore games and master cryptos with our detailed guide.",
      button: "Read the complete guide"
    },
    affiliation: {
      title: "Earn more with our Stake affiliation",
      description: "Join our program and receive",
      highlight: "50% of our affiliate commissions",
      description2: ". Transparent tracking and guaranteed monthly payments.",
      button: "Learn more",
      videoPath: "/videos/affiliation_stake_en.mp4"
    },
    commissions: {
      title: "Commission tracking and payments",
      description: "Real-time dashboard to track your earnings. Complete history and transparent automated management.",
      button: "View my commissions"
    },
    cta: {
      text: "Ready to start? Sign up on Stake with our affiliate link",
      button: "Join Stake now"
    }
  },

  // Play on Stake Page (imported)
  playOnStake,

  // Affiliation Page (imported)
  affiliation,

  // Commissions Page (imported)
  commissions,

  // Legal Pages (imported)
  legal: {
    terms,
    privacy,
    notices,
    responsible
  },

  // Declaration Page
  declaration: {
    meta: {
      title: "Affiliate Declaration - Confirm Your Username",
      description: "Confirm your Stake username to receive your affiliate commissions. Simple and fast process."
    },
    hero: {
      title: "Confirm your",
      highlight: "Stake Username",
      subtitle: "Once registered on Stake via our link and Promo Code",
      subtitle2: "This is the final step to receive your affiliate commissions",
      processed: "Once your request is processed by our team,",
      appear: "Your profile will appear on the"
    },
    form: {
      title: "Declaration Form",
      stakePseudo: "Your Stake username",
      stakePseudoPlaceholder: "Ex: CryptoKing123",
      stakePseudoHelp: "The exact username you use on Stake",
      screenshot: "Screenshot of your Stake profile",
      screenshotHelp: "Send a screenshot of your Stake profile showing your username",
      screenshotExample: "Example: your profile page with your username visible",
      chooseImage: "Choose an image",
      imageFormat: "Accepted format: JPG, PNG (5MB max)",
      email: "Contact email",
      emailPlaceholder: "your@email.com",
      emailHelp: "We'll use this email to contact you if needed",
      message: "Message (optional)",
      messagePlaceholder: "Additional information...",
      messageHelp: "Add any useful information for your declaration",
      submit: "Send my declaration",
      sending: "Sending...",
      required: "required",
      success: {
        title: "Declaration sent successfully!",
        message: "We have received your request. We will contact you within 24h to confirm your affiliation.",
        reminder: "Reminder: Commissions will be calculated from now on only.",
        viewCommissions: "View commission dashboard"
      },
      error: {
        screenshot: "Screenshot is required",
        general: "An error occurred",
        fileSize: "File is too large (5MB maximum)",
        fileType: "File must be an image"
      }
    },
    warning: {
      title: "Important Information about Commissions",
      text1: "Commissions are only calculated from your official registration in our program.",
      text2: "Earnings generated before your declaration cannot be claimed retroactively. We take your Stake statistics at the time of addition to our system as a starting point, and only future differences will be commissioned at 50%.",
      example: "Example: If at the time of registration you have generated €10,000 in total commission on Stake, and a week later you are at €10,200, you will receive 50% of the difference (€200), i.e. €100."
    },
    howItWorks: {
      title: "How does it work?",
      step1: {
        title: "Verify your registration",
        description: "Make sure you created your Stake account via our affiliate link with the code"
      },
      step2: {
        title: "Fill out the form",
        description: "Enter your exact Stake username and contact email"
      },
      step3: {
        title: "Processing your request",
        description: "Our team verifies your affiliation and adds you to the commission system."
      },
      step4: {
        title: "Receive your payments",
        description: "Once added, you'll receive 50% of our commissions every week. You have nothing more to do."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: {
        question: "Why is my username masked?",
        answer: "For security reasons, Stake only communicates part of our affiliates' usernames to us. The declaration allows us to confirm your complete identity."
      },
      q2: {
        question: "How long for processing?",
        answer: "We process declarations quickly. You'll receive a confirmation email as soon as your account is added to the system."
      },
      q3: {
        question: "How are commissions calculated?",
        answer: "We earn commissions on all your games. You receive exactly 50% of what we earn from your activity, starting from your registration."
      },
      q4: {
        question: "When are payments made?",
        answer: "Payments are made weekly via Stake's tip system, directly to your player account."
      }
    }
  },

  // Contact Page
  contact: {
    meta: {
      title: "Contact - Rounders",
      description: "Contact us for any questions about Stake affiliation, bonuses or tracking your earnings."
    },
    hero: {
      title: "Contact Us",
      subtitle: "Have a question? A problem? We're here to help"
    },
    form: {
      title: "Send us a message",
      name: "Full name",
      namePlaceholder: "John Doe",
      email: "Email",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjects: {
        general: "General question",
        affiliation: "Affiliation",
        payment: "Payment",
        technical: "Technical issue",
        other: "Other"
      },
      message: "Message",
      messagePlaceholder: "Describe your request in detail...",
      send: "Send message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successMessage: "We have received your message and will respond quickly.",
      errorMessage: "An error occurred. Please try again."
    }
  },

  // Footer
  footer: {
    about: {
      title: "Rounders",
      description: "Transparent Stake affiliate program with 50% commission sharing. Guaranteed monthly payments."
    },
    sitemap: {
      title: "Rounders.pro",
      playOnStake: "Play on Stake",
      affiliation: "Affiliation",
      commissions: "Commissions",
      validateAffiliation: "Validate your Affiliation"
    },
    legal: {
      title: "Legal",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      legal: "Legal Notice",
      responsible: "Responsible Gaming"
    },
    contact: {
      title: "Contact",
      email: "Email: rounders.pro@gmail.com",
      contactUs: "Contact Us",
      joinStake: "Join Stake"
    },
    bottom: {
      copyright: "© {year} Rounders. All rights reserved.",
      disclaimer: "18+ | Gamble responsibly | Gambling involves risks"
    }
  }
}