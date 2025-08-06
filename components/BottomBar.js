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
      label: t.header?.playOnStake || 'Jouer',
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
          background: rgba(15, 25, 35, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 998;
          box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.3);
        }

        .bottom-bar-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 65px;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 10px;
        }

        .bottom-bar-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          text-decoration: none;
          color: #94a3b8;
          transition: all 0.3s ease;
          padding: 8px 12px;
          border-radius: 12px;
          position: relative;
          flex: 1;
          max-width: 80px;
        }

        .bottom-bar-item:active {
          transform: scale(0.95);
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon {
          font-size: 24px;
          transition: all 0.3s ease;
          display: block;
          filter: grayscale(100%);
          opacity: 0.7;
        }

        .bottom-bar-item.active .icon {
          filter: grayscale(0%);
          opacity: 1;
          transform: translateY(-2px);
        }

        .bottom-bar-item:hover .icon {
          filter: grayscale(0%);
          opacity: 0.9;
        }

        .label {
          font-size: 11px;
          font-weight: 500;
          transition: all 0.3s ease;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .bottom-bar-item.active .label {
          color: #ffffff;
          font-weight: 600;
        }

        .bottom-bar-item:hover .label {
          color: #e2e8f0;
        }

        /* Indicateur actif avec gradient */
        .active-indicator {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 3px;
          border-radius: 3px 3px 0 0;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 32px;
            opacity: 1;
          }
        }

        /* Effet de ripple au tap */
        .bottom-bar-item::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .bottom-bar-item:active::before {
          width: 100px;
          height: 100px;
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