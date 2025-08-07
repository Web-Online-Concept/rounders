import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AdminHeader({ currentPage }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <header className="admin-header">
      <div className="header-container">
        <div className="header-brand">
          <Link href="/admin" className="brand-link">
            <h1>🎰 Rounders Admin</h1>
          </Link>
        </div>
        
        <nav className="header-nav">
          <Link href="/admin" className={currentPage === 'dashboard' ? 'active' : ''}>
            📊 Dashboard
          </Link>
          <Link href="/admin/affiliates" className={currentPage === 'affiliates' ? 'active' : ''}>
            👥 Affiliés
          </Link>
          <Link href="/admin/payments" className={currentPage === 'payments' ? 'active' : ''}>
            💰 Paiements
          </Link>
          <Link href="/admin/update-commissions" className={currentPage === 'update' ? 'active' : ''}>
            📊 Mise à jour
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Déconnexion
          </button>
        </nav>
      </div>

      <style jsx>{`
        .admin-header {
          background: linear-gradient(135deg, #1a2c38 0%, #2d4356 100%);
          color: white;
          padding: 20px 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .header-brand :global(.brand-link) {
          text-decoration: none;
          color: white;
        }

        .header-brand h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }

        .sync-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 12px;
        }

        .sync-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #94a3b8;
        }

        .sync-indicator.active .sync-dot {
          background: #10b981;
          animation: pulse 2s infinite;
        }

        .sync-indicator.warning .sync-dot {
          background: #f59e0b;
          animation: pulse 1s infinite;
        }

        .sync-indicator.error .sync-dot {
          background: #ef4444;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .header-nav :global(a) {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          padding: 8px 0;
          border-bottom: 2px solid transparent;
        }

        .header-nav :global(a:hover) {
          color: white;
        }

        .header-nav :global(a.active) {
          color: white;
          border-bottom-color: #4a9eff;
        }

        .logout-btn {
          background: rgba(239, 68, 68, 0.2);
          color: white;
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.3);
          border-color: rgba(239, 68, 68, 0.5);
        }

        @media (max-width: 768px) {
          .header-container {
            flex-direction: column;
            gap: 20px;
          }

          .header-brand {
            flex-direction: column;
            text-align: center;
          }

          .header-nav {
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
          }

          .header-nav :global(a) {
            font-size: 14px;
          }
        }
      `}</style>
    </header>
  );
}