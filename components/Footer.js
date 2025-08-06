import Link from "next/link";
import { useTranslation } from "../hooks/useTranslation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Colonne 1 - À propos */}
          <div className="footer-column">
            <h3 className="footer-title">{t.footer.about.title}</h3>
            <p className="footer-description">
              {t.footer.about.description}
              <Link href="/admin/login" style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                background: '#64748b',
                borderRadius: '50%',
                marginLeft: '4px',
                verticalAlign: 'middle',
                cursor: 'pointer',
                opacity: '0.5',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0.5';
              }}
              aria-label="Admin">
              </Link>
            </p>
          </div>

          {/* Colonne 2 - Rounders.pro */}
          <div className="footer-column">
            <h4 className="footer-subtitle">{t.footer.sitemap.title}</h4>
            <ul className="footer-links">
              <li><Link href="/jouer-sur-stake">{t.footer.sitemap.playOnStake}</Link></li>
              <li><Link href="/affiliation">{t.footer.sitemap.affiliation}</Link></li>
              <li><Link href="/commissions">{t.footer.sitemap.commissions}</Link></li>
              <li><Link href="/declaration">{t.footer.sitemap.validateAffiliation}</Link></li>
            </ul>
          </div>

          {/* Colonne 3 - Légal */}
          <div className="footer-column">
            <h4 className="footer-subtitle">{t.footer.legal.title}</h4>
            <ul className="footer-links">
              <li><Link href="/conditions-utilisation">{t.footer.legal.terms}</Link></li>
              <li><Link href="/politique-confidentialite">{t.footer.legal.privacy}</Link></li>
              <li><Link href="/mentions-legales">{t.footer.legal.legal}</Link></li>
              <li><Link href="/jeu-responsable">{t.footer.legal.responsible}</Link></li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div className="footer-column">
            <h4 className="footer-subtitle">{t.footer.contact.title}</h4>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '15px'
            }}>
              <a 
                href="https://x.com/rounders_pro" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: '#1DA1F2',
                  borderRadius: '50%',
                  fontSize: '16px',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.background = '#1a8cd8';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = '#1DA1F2';
                }}
                aria-label="Twitter/X"
              >
                𝕏
              </a>
              <a 
                href="https://www.youtube.com/@Rounders_pro" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: '#FF0000',
                  borderRadius: '50%',
                  fontSize: '18px',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, background 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.background = '#CC0000';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = '#FF0000';
                }}
                aria-label="YouTube"
              >
                ▶
              </a>
            </div>
            <p className="footer-text" style={{marginBottom: '20px'}}>
              <Link href="/contact" style={{
                color: 'inherit',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'inherit';
              }}>
                {t.footer.contact.contactUs}
              </Link>
            </p>
            <div className="footer-stake-link">
              <a 
                href="https://stake.bet/?c=rounders&offer=rounders" 
                target="_blank" 
                rel="noopener noreferrer"
                className="stake-button"
              >
                {t.footer.contact.joinStake}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>{t.footer.bottom.copyright.replace('{year}', currentYear)}</p>
          <p className="footer-disclaimer">
            {t.footer.bottom.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;