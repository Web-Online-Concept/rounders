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
      label: 'Affiliation',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      href: '/commissions',
      icon: '📊',
      label: 'Commissions',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      href: '/declaration',
      icon: '📝',
      label: 'Déclaration',
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
              <div className="icon-wrapper">
                <span className="icon">{item.icon}</span>
                {isActive(item.href) && (
                  <div className="active-indicator" style={{ background: item.gradient }} />
                )}
              </div>
              <span className="label">{item.label}</span>
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          text-decoration: none !important;
          color: white !important;
          transition: all 0.3s ease;
          padding: 8px;
          border-radius: 12px;
          position: relative;
          flex: 1;
          max-width: 90px;
        }

        .bottom-bar-item:hover {
          text-decoration: none !important;
        }

        .bottom-bar-item:active {
          transform: scale(0.95);
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        /* Couleurs pour chaque bouton */
        .bottom-bar-item:nth-child(1) .icon-wrapper {
          background: rgba(102, 126, 234, 0.15);
        }

        .bottom-bar-item:nth-child(1).active .icon-wrapper,
        .bottom-bar-item:nth-child(1):hover .icon-wrapper {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .bottom-bar-item:nth-child(2) .icon-wrapper {
          background: rgba(240, 147, 251, 0.15);
        }

        .bottom-bar-item:nth-child(2).active .icon-wrapper,
        .bottom-bar-item:nth-child(2):hover .icon-wrapper {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .bottom-bar-item:nth-child(3) .icon-wrapper {
          background: rgba(79, 172, 254, 0.15);
        }

        .bottom-bar-item:nth-child(3).active .icon-wrapper,
        .bottom-bar-item:nth-child(3):hover .icon-wrapper {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .bottom-bar-item:nth-child(4) .icon-wrapper {
          background: rgba(67, 233, 123, 0.15);
        }

        .bottom-bar-item:nth-child(4).active .icon-wrapper,
        .bottom-bar-item:nth-child(4):hover .icon-wrapper {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .icon {
          font-size: 24px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: none;
          opacity: 1;
        }

        .bottom-bar-item.active .icon {
          transform: scale(1.1);
        }

        .label {
          font-size: 11px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          color: white !important;
          text-decoration: none !important;
        }

        .bottom-bar-item.active .label {
          color: white !important;
          font-weight: 700;
        }

        /* Enlever l'indicateur du bas */
        .active-indicator {
          display: none;
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