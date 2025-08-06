import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../hooks/useTranslation";
import SEOHead from "../components/SEOHead";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead 
        title={t.home.meta.title}
        description={t.home.meta.description}
      />

      <main className="main-container">
        {/* Titre élégant */}
        <div style={{
          textAlign: 'center',
          marginTop: '-20px',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '8px',
            color: '#1a2c38',
            letterSpacing: '-0.5px',
            lineHeight: '1.1',
            textTransform: 'uppercase'
          }}>
            {t.home.mainTitle}
          </h1>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: '1.2',
            margin: '0',
            color: '#2d4356'
          }}>
            {t.home.subtitle}
          </h2>
        </div>

        <div className="blocks-wrapper">
          
          {/* Bloc 1 - Découvrir Stake */}
          <Link href="/jouer-sur-stake" className="block-link">
            <div className="block">
              <div className="block-inner">
                <div className="block-image">
                  <Image
                    src="/images/guide.jpg"
                    alt={t.home.discoverStake.title}
                    width={300}
                    height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    priority
                  />
                </div>
                <div className="block-content">
                  <h2 className="block-title">
                    {t.home.discoverStake.title}
                  </h2>
                  <p className="block-description">
                    {t.home.discoverStake.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Bloc 2 - Affiliation avec vidéo */}
          <Link href="/affiliation" className="block-link">
            <div className="block">
              <div className="block-inner">
                <div className="block-image">
                  <video
                    src={t.home.affiliation.videoPath}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="block-video"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  >
                    <Image
                      src="/images/presentation.jpg"
                      alt={t.home.affiliation.title}
                      width={300}
                      height={200}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </video>
                </div>
                <div className="block-content">
                  <h2 className="block-title">
                    {t.home.affiliation.title}
                  </h2>
                  <p className="block-description">
                    {t.home.affiliation.description} <span className="highlight">{t.home.affiliation.highlight}</span>{t.home.affiliation.description2}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Bloc 3 - Commissions */}
          <Link href="/commissions" className="block-link">
            <div className="block">
              <div className="block-inner">
                <div className="block-image">
                  <Image
                    src="/images/commissions.jpg"
                    alt={t.home.commissions.title}
                    width={300}
                    height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="block-content">
                  <h2 className="block-title">
                    {t.home.commissions.title}
                  </h2>
                  <p className="block-description">
                    {t.home.commissions.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* Call to Action final */}
        <div className="cta-section" style={{marginTop: '30px'}}>
          <p className="cta-text">
            {t.home.cta.text}
          </p>
          <a 
            href="https://stake.bet/?c=rounders&offer=rounders" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 60px',
              background: 'linear-gradient(135deg, #00d632 0%, #00a826 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              fontSize: '20px',
              fontWeight: '800',
              transition: 'all 0.3s',
              boxShadow: '0 6px 20px rgba(0, 214, 50, 0.3)',
              border: '2px solid transparent',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 214, 50, 0.4)';
              e.currentTarget.style.border = '2px solid #00d632';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 214, 50, 0.3)';
              e.currentTarget.style.border = '2px solid transparent';
            }}
          >
            {t.home.cta.button}
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '24px', height: '24px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </main>
    </>
  );
}