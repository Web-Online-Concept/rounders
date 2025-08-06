import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "../hooks/useTranslation";

const BottomBar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  
  const navItems = [
    {
      href: '/jouer-sur-stake',
      icon: '🎰',
      label: 'Stake',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      href: '/affiliation',
      icon: '💰',
      label: t.header?.affiliation || 'Affiliation',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      href: '/commissions',
      icon: '📊',
      label: t.header?.commissions || 'Commissions',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      href: '/declaration',
      icon: '📝',
      label: t.footer?.sitemap?.validateAffiliation || 'Déclaration',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <>
      <div className="bottom-bar-spacer" />
      <nav className="bottom-bar">
        <div className="bottom-bar-container">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`bottom-bar-item ${isActive(item.href) ? 'active' : ''}`}
            >
              <div className={`button-wrapper ${isActive(item.href) ? 'active' : ''}`}>
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      <style jsx>{`
        /* Spacer pour éviter que le contenu soit caché */
        .bottom-bar-spacer {
          display: none;
        }

        /* Bottom Bar */
        .bottom-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(5, 15, 25, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 998;
          box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.3);
        }

        .bottom-bar-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 70px;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 20px;
        }

        .bottom-bar-item {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none !important;
          transition: all 0.3s ease;
          flex: 1;
          padding: 5px;
        }

        .button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 10px 16px;
          border-radius: 12px;
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.3s ease;
          min-width: 70px;
        }

        .bottom-bar-item:nth-child(1) .button-wrapper.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .bottom-bar-item:nth-child(2) .button-wrapper.active {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .bottom-bar-item:nth-child(3) .button-wrapper.active {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .bottom-bar-item:nth-child(4) .button-wrapper.active {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .bottom-bar-item:active .button-wrapper {
          transform: scale(0.95);
        }

        .icon {
          font-size: 20px;
          transition: all 0.3s ease;
          display: block;
        }

        .label {
          font-size: 11px;
          font-weight: 600;
          color: white !important;
          text-decoration: none !important;
          white-space: nowrap;
        }

        /* Media Query - Visible uniquement sur mobile */
        @media (max-width: 768px) {
          .bottom-bar-spacer {
            display: block;
            height: 65px;
          }

          .bottom-bar {
            display: block;
          }
        }

        /* Support pour les téléphones avec encoche */
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .bottom-bar {
            padding-bottom: env(safe-area-inset-bottom);
          }

          .bottom-bar-container {
            height: calc(65px + env(safe-area-inset-bottom));
            padding-bottom: env(safe-area-inset-bottom);
          }

          .bottom-bar-spacer {
            height: calc(65px + env(safe-area-inset-bottom));
          }
        }

        /* Animation d'entrée */
        @media (max-width: 768px) {
          .bottom-bar {
            animation: slideUp 0.3s ease;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default BottomBar;