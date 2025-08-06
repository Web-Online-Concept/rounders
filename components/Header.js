import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";

const Header = () => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { t, locale, changeLanguage } = useTranslation();
  const dropdownRef = useRef(null);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setShowMobileMenu(false);
  }, [locale]);

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      flag: (
        <svg className="flag" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
          <rect width="30" height="20" fill="#012169"/>
          <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" strokeWidth="4"/>
          <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="2.5"/>
          <path d="M15,0 L15,20 M0,10 L30,10" stroke="#FFFFFF" strokeWidth="6.5"/>
          <path d="M15,0 L15,20 M0,10 L30,10" stroke="#C8102E" strokeWidth="4"/>
        </svg>
      )
    },
    { 
      code: 'es', 
      name: 'Español', 
      flag: (
        <svg className="flag" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
          <rect width="30" height="5" y="0" fill="#AA151B"/>
          <rect width="30" height="10" y="5" fill="#F1BF00"/>
          <rect width="30" height="5" y="15" fill="#AA151B"/>
        </svg>
      )
    },
    { 
      code: 'fr', 
      name: 'Français', 
      flag: (
        <svg className="flag" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="20" fill="#002654"/>
          <rect x="10" width="10" height="20" fill="#FFFFFF"/>
          <rect x="20" width="10" height="20" fill="#ED2939"/>
        </svg>
      )
    },
    { 
      code: 'ru', 
      name: 'Русский', 
      flag: (
        <svg className="flag" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
          <rect width="30" height="6.67" y="0" fill="#FFFFFF"/>
          <rect width="30" height="6.67" y="6.67" fill="#0039A6"/>
          <rect width="30" height="6.67" y="13.33" fill="#D52B1E"/>
        </svg>
      )
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Bouton hamburger mobile SEULEMENT */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${showMobileMenu ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${showMobileMenu ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${showMobileMenu ? 'open' : ''}`}></span>
          </button>

          <Link href="/" className="logo">
            <Image
              src="/images/logo.png"
              alt="Rounders Logo"
              width={90}
              height={90}
              className="logo-image"
              priority
            />
            <span className="logo-text">
              Rounders.pro, {t.header.partner}
              <Image
                src="/images/logo_stake.png"
                alt="Stake Logo"
                width={30}
                height={30}
                className="stake-logo"
                priority
                unoptimized
              />
            </span>
          </Link>
          
          {/* Navigation Desktop INTACTE */}
          <nav className="nav">
            <Link href="/jouer-sur-stake">
              {t.header.playOnStake || "Jouer sur Stake"}
            </Link>
            <Link href="/affiliation">
              {t.header.affiliation}
            </Link>
            <Link href="/commissions">
              {t.header.commissions}
            </Link>
            
            {/* Sélecteur de langue desktop INTACT */}
            <div className="language-selector-dropdown" ref={dropdownRef}>
              <button 
                className="language-current"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                aria-label="Select language"
              >
                {currentLanguage.flag}
                <span className="language-name">{currentLanguage.name}</span>
                <svg 
                  className="dropdown-arrow" 
                  width="12" 
                  height="8" 
                  viewBox="0 0 12 8" 
                  fill="currentColor"
                  style={{
                    transform: showLanguageMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </button>
              
              {showLanguageMenu && (
                <div className="language-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-option ${locale === lang.code ? 'active' : ''}`}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                    >
                      {lang.flag}
                      <span className="language-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Menu mobile UNIQUEMENT */}
      <div className={`mobile-menu ${showMobileMenu ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {/* Boutons comme les langues */}
          <button 
            className="mobile-nav-button"
            onClick={() => {
              window.location.href = '/jouer-sur-stake';
              setShowMobileMenu(false);
            }}
          >
            <span className="button-emoji">🎰</span>
            <span>{t.header.playOnStake || "Jouer sur Stake"}</span>
          </button>

          <button 
            className="mobile-nav-button"
            onClick={() => {
              window.location.href = '/affiliation';
              setShowMobileMenu(false);
            }}
          >
            <span className="button-emoji">💰</span>
            <span>{t.header.affiliation}</span>
          </button>

          <button 
            className="mobile-nav-button"
            onClick={() => {
              window.location.href = '/commissions';
              setShowMobileMenu(false);
            }}
          >
            <span className="button-emoji">📊</span>
            <span>{t.header.commissions}</span>
          </button>

          <button 
            className="mobile-nav-button"
            onClick={() => {
              window.location.href = '/declaration';
              setShowMobileMenu(false);
            }}
          >
            <span className="button-emoji">📝</span>
            <span>Déclarez votre affiliation</span>
          </button>
          
          {/* Sélecteur de langue mobile */}
          <div className="mobile-language-selector">
            <h3>LANGAGE</h3>
            <div className="mobile-language-options">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`mobile-language-option ${locale === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setShowMobileMenu(false);
                  }}
                >
                  {lang.flag}
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <style jsx>{`
        /* Menu hamburger - visible uniquement sur mobile */
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          margin-left: -10px;
          margin-right: 15px;
        }

        .hamburger-line {
          display: block;
          width: 25px;
          height: 3px;
          background: white;
          margin: 5px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .hamburger-line.open:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger-line.open:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.open:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Menu mobile */
        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: #0f1923;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 999;
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-nav {
          padding: 20px;
        }

        /* Boutons de navigation mobile */
        .mobile-nav-button {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 15px;
          margin-bottom: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .mobile-nav-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .button-emoji {
          font-size: 20px;
          width: 30px;
          text-align: center;
        }

        /* Section langue mobile */
        .mobile-language-selector {
          margin-top: 40px;
          padding-top: 40px;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-language-selector h3 {
          color: white;
          font-size: 16px;
          text-align: center;
          letter-spacing: 2px;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .mobile-language-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .mobile-language-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-language-option:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .mobile-language-option.active {
          background: rgba(0, 214, 50, 0.1);
          border-color: #00d632;
          color: #00d632;
        }

        .mobile-language-option .flag {
          width: 30px;
          height: 20px;
        }

        /* Media Query - Active le menu mobile SEULEMENT sur mobile */
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }

          .nav {
            display: none;
          }

          .header-container {
            padding: 15px 20px;
          }

          .logo-text {
            font-size: 14px;
          }

          .logo-image {
            width: 60px !important;
            height: 60px !important;
          }

          .stake-logo {
            width: 20px !important;
            height: 20px !important;
          }
        }

        /* Styles existants pour desktop - NE PAS TOUCHER */
        .language-selector-dropdown {
          position: relative;
          margin-left: 20px;
        }

        .language-current {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
          font-size: 14px;
          font-weight: 500;
        }

        .language-current:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .language-name {
          min-width: 60px;
          text-align: left;
        }

        .dropdown-arrow {
          margin-left: 4px;
        }

        .language-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: #213743;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          min-width: 100%;
          overflow: hidden;
          z-index: 1000;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .language-option {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
          font-size: 14px;
          font-weight: 500;
          text-align: left;
        }

        .language-option:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .language-option.active {
          background: rgba(0, 214, 50, 0.1);
          color: #00d632;
        }

        .flag {
          width: 24px;
          height: 16px;
          display: block;
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
};

export default Header;