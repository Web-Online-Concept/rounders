import playOnStake from './es/playOnStake';
import affiliation from './es/affiliation';
import commissions from './es/commissions';
import terms from './es/legal/terms';
import privacy from './es/legal/privacy';
import notices from './es/legal/notices';
import responsible from './es/legal/responsible';

export default {
  // Header
  header: {
    logo: "Rounders",
    partner: "tu socio",
    affiliation: "Afiliación",
    commissions: "Comisiones",
    playOnStake: "Jugar en Stake",
    guideStake: "Guía Stake",
    menu: {
      inscription: "Inscripción",
      bonus: "Bonos",
      jeux: "Juegos",
      cryptos: "Criptos",
      faq: "FAQ"
    }
  },

  // Página de inicio
  home: {
    meta: {
      title: "Rounders - Afiliación Stake",
      description: "Gana el 50% de nuestras comisiones de afiliado Stake. Programa transparente con pagos mensuales garantizados y guía completa."
    },
    mainTitle: "Juega en la plataforma Stake",
    subtitle: "💰 Recupera el 50% de nuestras Comisiones de Afiliación 💰",
    discoverStake: {
      title: "Descubre la plataforma Stake",
      description: "Explora el casino n°1 mundial. Registro simple, bonos exclusivos, 3000+ juegos, apuestas deportivas y póker. Accesible en todas partes con nuestro método."
    },
    guide: {
      title: "La guía completa de Stake",
      description: "Cómo registrarse en Stake desde tu país. Maximiza tus bonos, explora los juegos y domina las criptomonedas con nuestra guía detallada.",
      button: "Leer la guía completa"
    },
    affiliation: {
      title: "Gana más con nuestra afiliación Stake",
      description: "Únete a nuestro programa y recibe",
      highlight: "50% de nuestras comisiones de afiliado",
      description2: ". Seguimiento transparente y pagos garantizados cada mes.",
      button: "Saber más",
      videoPath: "/videos/affiliation_stake_es.mp4"
    },
    commissions: {
      title: "Seguimiento de comisiones y pagos",
      description: "Panel en tiempo real para seguir tus ganancias. Historial completo y gestión automatizada transparente.",
      button: "Ver mis comisiones"
    },
    cta: {
      text: "¿Listo para empezar? Regístrate en Stake con nuestro enlace de afiliado",
      button: "Unirse a Stake ahora"
    }
  },

  // Página Jugar en Stake (importada)
  playOnStake,

  // Página Afiliación (importada)
  affiliation,

  // Página Comisiones (importada)
  commissions,

  // Páginas Legales (importadas)
  legal: {
    terms,
    privacy,
    notices,
    responsible
  },

  // Página Declaración
  declaration: {
    meta: {
      title: "Declaración de Afiliación - Confirma tu usuario",
      description: "Confirma tu usuario de Stake para recibir tus comisiones de afiliado. Proceso simple y rápido."
    },
    hero: {
      title: "Confirma tu",
      highlight: "Usuario Stake",
      subtitle: "Una vez registrado en Stake a través de nuestro enlace y Código Promocional",
      subtitle2: "Este es el último paso para recibir tus comisiones de afiliado",
      processed: "Una vez que tu solicitud sea procesada por nuestro equipo,",
      appear: "Tu perfil aparecerá en la página"
    },
    form: {
      title: "Formulario de Declaración",
      stakePseudo: "Tu usuario de Stake",
      stakePseudoPlaceholder: "Ej: CryptoKing123",
      stakePseudoHelp: "El usuario exacto que usas en Stake",
      screenshot: "Captura de pantalla de tu perfil Stake",
      screenshotHelp: "Envía una captura de pantalla de tu perfil Stake mostrando tu usuario",
      screenshotExample: "Ejemplo: tu página de perfil con tu usuario visible",
      chooseImage: "Elegir una imagen",
      imageFormat: "Formato aceptado: JPG, PNG (5MB máx)",
      email: "Correo de contacto",
      emailPlaceholder: "tu@correo.com",
      emailHelp: "Usaremos este correo para contactarte si es necesario",
      message: "Mensaje (opcional)",
      messagePlaceholder: "Información adicional...",
      messageHelp: "Añade cualquier información útil para tu declaración",
      submit: "Enviar mi declaración",
      sending: "Enviando...",
      required: "obligatorio",
      success: {
        title: "¡Declaración enviada con éxito!",
        message: "Hemos recibido tu solicitud. Te contactaremos en 24h para confirmar tu afiliación.",
        reminder: "Recordatorio: Las comisiones se calcularán solo a partir de ahora.",
        viewCommissions: "Ver panel de comisiones"
      },
      error: {
        screenshot: "La captura de pantalla es obligatoria",
        general: "Ha ocurrido un error",
        fileSize: "El archivo es demasiado grande (5MB máximo)",
        fileType: "El archivo debe ser una imagen"
      }
    },
    warning: {
      title: "Información importante sobre las comisiones",
      text1: "Las comisiones solo se calculan a partir de tu inscripción oficial en nuestro programa.",
      text2: "Las ganancias generadas antes de tu declaración no pueden reclamarse retroactivamente. Tomamos tus estadísticas de Stake en el momento de agregarte a nuestro sistema como punto de partida, y solo las diferencias futuras serán comisionadas al 50%.",
      example: "Ejemplo: Si al momento de tu inscripción has generado 10.000€ de comisión total en Stake, y una semana después estás en 10.200€, recibirás el 50% de la diferencia (200€), es decir, 100€."
    },
    howItWorks: {
      title: "¿Cómo funciona?",
      step1: {
        title: "Verifica tu registro",
        description: "Asegúrate de haber creado tu cuenta Stake a través de nuestro enlace de afiliado con el código"
      },
      step2: {
        title: "Completa el formulario",
        description: "Indica tu usuario exacto de Stake y tu correo de contacto"
      },
      step3: {
        title: "Procesamiento de tu solicitud",
        description: "Nuestro equipo verifica tu afiliación y te agrega al sistema de comisiones."
      },
      step4: {
        title: "Recibe tus pagos",
        description: "Una vez agregado, recibirás el 50% de nuestras comisiones cada semana. No tienes que hacer nada más."
      }
    },
    faq: {
      title: "Preguntas Frecuentes",
      q1: {
        question: "¿Por qué mi usuario está enmascarado?",
        answer: "Por razones de seguridad, Stake solo nos comunica una parte del usuario de nuestros afiliados. La declaración permite confirmar tu identidad completa."
      },
      q2: {
        question: "¿Cuánto tiempo para el procesamiento?",
        answer: "Procesamos las declaraciones rápidamente. Recibirás un correo de confirmación tan pronto como tu cuenta sea agregada al sistema."
      },
      q3: {
        question: "¿Cómo se calculan las comisiones?",
        answer: "Ganamos comisiones en todos tus juegos. Recibes exactamente el 50% de lo que ganamos gracias a tu actividad, a partir de tu inscripción."
      },
      q4: {
        question: "¿Cuándo se realizan los pagos?",
        answer: "Los pagos se realizan semanalmente a través del sistema de propinas de Stake, directamente en tu cuenta de jugador."
      }
    }
  },

  // Página Contacto
  contact: {
    meta: {
      title: "Contacto - Rounders",
      description: "Contáctanos para cualquier pregunta sobre la afiliación Stake, bonos o seguimiento de tus ganancias."
    },
    hero: {
      title: "Contáctanos",
      subtitle: "¿Tienes una pregunta? ¿Un problema? Estamos aquí para ayudarte"
    },
    form: {
      title: "Envíanos un mensaje",
      name: "Nombre completo",
      namePlaceholder: "Juan Pérez",
      email: "Correo",
      emailPlaceholder: "tu@correo.com",
      subject: "Asunto",
      subjects: {
        general: "Pregunta general",
        affiliation: "Afiliación",
        payment: "Pago",
        technical: "Problema técnico",
        other: "Otro"
      },
      message: "Mensaje",
      messagePlaceholder: "Describe tu solicitud en detalle...",
      send: "Enviar mensaje",
      sending: "Enviando...",
      successTitle: "¡Mensaje enviado!",
      successMessage: "Hemos recibido tu mensaje y responderemos rápidamente.",
      errorMessage: "Ha ocurrido un error. Por favor, inténtalo de nuevo."
    }
  },

  // Footer
  footer: {
    about: {
      title: "Rounders",
      description: "Programa de afiliación Stake transparente con 50% de reversión sobre nuestras comisiones. Pagos mensuales garantizados."
    },
    sitemap: {
      title: "Rounders.pro",
      playOnStake: "Jugar en Stake",
      affiliation: "Afiliación",
      commissions: "Comisiones",
      validateAffiliation: "Validar su Afiliación"
    },
    legal: {
      title: "Legal",
      terms: "Términos de Uso",
      privacy: "Política de Privacidad",
      legal: "Aviso Legal",
      responsible: "Juego Responsable"
    },
    contact: {
      title: "Contacto",
      email: "Correo: rounders.pro@gmail.com",
      contactUs: "Contáctanos",
      joinStake: "Unirse a Stake"
    },
    bottom: {
      copyright: "© {year} Rounders. Todos los derechos reservados.",
      disclaimer: "18+ | Juega responsablemente | Los juegos de azar conllevan riesgos"
    }
  }
}