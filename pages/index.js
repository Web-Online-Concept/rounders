import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rounders - Affiliation Stake</title>
        <meta name="description" content="Gagnez 50% de nos commissions affiliées Stake. Programme transparent avec paiements mensuels garantis et guide complet." />
        <meta name="keywords" content="stake, affiliation, casino, crypto, commissions, bonus" />
      </Head>

      <main className="main-container">
        <div className="blocks-wrapper">
          
          {/* Bloc 1 - Présentation */}
          <div className="block">
            <div className="block-image">
              <Image
                src="/images/presentation.jpg"
                alt="Présentation du programme d&apos;affiliation"
                width={300}
                height={200}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="block-content">
              <h2 className="block-title">
                Gagnez plus avec notre affiliation Stake
              </h2>
              <p className="block-description">
                Rejoignez notre programme et recevez <span className="highlight">50% de nos commissions affiliées</span>. 
                Suivi transparent et paiements garantis chaque mois.
              </p>
              <Link href="/affiliation" className="block-button button-blue">
                En savoir plus
              </Link>
            </div>
          </div>

          {/* Bloc 2 - Commissions */}
          <div className="block">
            <div className="block-image">
              <Image
                src="/images/commissions.jpg"
                alt="Suivi des commissions"
                width={300}
                height={200}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="block-content">
              <h2 className="block-title">
                Suivi des commissions et paiements
              </h2>
              <p className="block-description">
                Tableau de bord en temps réel pour suivre vos gains. 
                Historique complet et gestion automatisée transparente.
              </p>
              <Link href="/commissions" className="block-button button-purple">
                Voir mes commissions
              </Link>
            </div>
          </div>

          {/* Bloc 3 - Guide Stake */}
          <div className="block">
            <div className="block-image">
              <Image
                src="/images/guide.jpg"
                alt="Guide complet Stake"
                width={300}
                height={200}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="block-content">
              <h2 className="block-title">
                Le guide complet Stake
              </h2>
              <p className="block-description">
                Maximisez vos bonus, explorez les jeux et maîtrisez les cryptos 
                avec notre guide détaillé et conseils d&apos;experts.
              </p>
              <Link href="/guide" className="block-button button-green">
                Lire le guide complet
              </Link>
            </div>
          </div>

        </div>

        {/* Call to Action final */}
        <div className="cta-section">
          <p className="cta-text">
            Prêt à commencer ? Inscrivez-vous sur Stake avec notre lien affilié
          </p>
          <a 
            href="https://stake.com/?c=rounders" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button"
          >
            Rejoindre Stake maintenant
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </main>
    </>
  );
}