import Head from "next/head";
import AdminHeader from "../../components/AdminHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalAffiliates: 0,
    pendingTotal: 0,
    paidTotal: 0,
    lastUpdate: null
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [topAffiliates, setTopAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Charger les stats globales
      const affiliatesResponse = await fetch('/api/affiliates', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (affiliatesResponse.ok) {
        const affiliatesData = await affiliatesResponse.json();
        const affiliates = affiliatesData.affiliates || [];
        
        // Calculer les stats
        const totalAffiliates = affiliates.length;
        const pendingTotal = affiliates.reduce((sum, aff) => sum + parseFloat(aff.pendingAmount || 0), 0);
        const paidTotal = affiliates.reduce((sum, aff) => sum + parseFloat(aff.paidAmount || 0), 0);
        
        setStats({
          totalAffiliates,
          pendingTotal,
          paidTotal,
          lastUpdate: affiliatesData.lastUpdate
        });
        
        // Top 5 affiliés par montant en attente
        const topByPending = [...affiliates]
          .filter(a => a.pendingAmount > 0)
          .sort((a, b) => parseFloat(b.pendingAmount) - parseFloat(a.pendingAmount))
          .slice(0, 5);
        setTopAffiliates(topByPending);
      }
      
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePay = async (affiliateId) => {
    const affiliate = topAffiliates.find(a => a.id === affiliateId);
    if (!affiliate) return;

    const amount = parseFloat(affiliate.pendingAmount);
    if (!confirm(`Confirmer le paiement de ${formatCurrency(amount)} à ${affiliate.name} ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/affiliates/${affiliateId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
      });

      if (response.ok) {
        // Recharger les données
        loadDashboardData();
      }
    } catch (error) {
      console.error('Erreur paiement:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - Admin Rounders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="admin-dashboard">
        <AdminHeader currentPage="dashboard" />

        <div className="dashboard-content">
          <div className="container">
            <div className="welcome-section">
              <h1>Bienvenue dans votre espace admin</h1>
              <p>Gérez vos affiliés et suivez les commissions</p>
            </div>

            {/* Statistiques principales */}
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>Affiliés actifs</h3>
                  <p className="stat-value">{stats.totalAffiliates}</p>
                  <Link href="/admin/affiliates" className="stat-link">
                    Voir tous →
                  </Link>
                </div>
              </div>

              <div className="stat-card warning">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>À payer</h3>
                  <p className="stat-value">{formatCurrency(stats.pendingTotal)}</p>
                  <span className="stat-detail">Montant total en attente</span>
                </div>
              </div>

              <div className="stat-card success">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>Total payé</h3>
                  <p className="stat-value">{formatCurrency(stats.paidTotal)}</p>
                  <span className="stat-detail">Depuis le début</span>
                </div>
              </div>

              <div className="stat-card info">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>Mise à jour</h3>
                  <p className="stat-value">Manuelle</p>
                  <Link href="/admin/update-commissions" className="stat-link">
                    Mettre à jour →
                  </Link>
                </div>
              </div>
            </div>

            <div className="content-grid">
              {/* Top affiliés */}
              <div className="card">
                <div className="card-header">
                  <h2>Affiliés à payer</h2>
                  <Link href="/admin/affiliates" className="view-all">
                    Voir tous →
                  </Link>
                </div>
                <div className="card-content">
                  {topAffiliates.length > 0 ? (
                    <div className="top-list">
                      {topAffiliates.map((affiliate, index) => (
                        <div key={affiliate.id} className="top-item">
                          <span className="rank">{index + 1}</span>
                          <div className="affiliate-info">
                            <span className="name">
                              {affiliate.name}
                            </span>
                            <span className="amount">
                              {formatCurrency(affiliate.pendingAmount)}
                            </span>
                          </div>
                          <button
                            onClick={() => handlePay(affiliate.id)}
                            className="pay-button"
                          >
                            💰 Payer
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty">Aucun paiement en attente</p>
                  )}
                </div>
              </div>

              {/* Guide rapide */}
              <div className="card">
                <div className="card-header">
                  <h2>Guide rapide</h2>
                </div>
                <div className="card-content">
                  <div className="guide-steps">
                    <div className="guide-step">
                      <span className="step-number">1</span>
                      <div className="step-content">
                        <h4>Ajouter des affiliés</h4>
                        <p>Déclarez vos affiliés avec leur commission de départ</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-number">2</span>
                      <div className="step-content">
                        <h4>Mettre à jour les commissions</h4>
                        <p>Copiez les montants depuis Stake et mettez à jour</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-number">3</span>
                      <div className="step-content">
                        <h4>Payer les affiliés</h4>
                        <p>Marquez les paiements hebdomadaires effectués</p>
                      </div>
                    </div>
                  </div>
                  {stats.lastUpdate && (
                    <p className="last-update">
                      Dernière mise à jour : {formatDateTime(stats.lastUpdate)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="quick-actions">
              <h2>Actions rapides</h2>
              <div className="actions-grid">
                <Link href="/admin/affiliates" className="action-card">
                  <span className="action-icon">➕</span>
                  <span className="action-text">Ajouter un affilié</span>
                </Link>
                <Link href="/admin/update-commissions" className="action-card">
                  <span className="action-icon">📊</span>
                  <span className="action-text">Mettre à jour</span>
                </Link>
                <Link href="/admin/affiliates" className="action-card">
                  <span className="action-icon">💸</span>
                  <span className="action-text">Gérer les paiements</span>
                </Link>
                <a 
                  href="https://stake.bet/affiliate/referred-users" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-card external"
                >
                  <span className="action-icon">🎰</span>
                  <span className="action-text">Aller sur Stake</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .loading-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #4a9eff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .admin-dashboard {
          min-height: 100vh;
          background: #f8fafc;
        }

        .dashboard-content {
          padding: 40px 20px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .welcome-section {
          margin-bottom: 40px;
        }

        .welcome-section h1 {
          margin: 0 0 10px 0;
          font-size: 32px;
          color: #1a2c38;
        }

        .welcome-section p {
          margin: 0;
          color: #64748b;
          font-size: 18px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .stat-card.primary {
          border-color: #e0f2fe;
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
        }

        .stat-card.warning {
          border-color: #fed7aa;
          background: linear-gradient(135deg, #ffffff 0%, #fff7ed 100%);
        }

        .stat-card.success {
          border-color: #bbf7d0;
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
        }

        .stat-card.info {
          border-color: #ddd6fe;
          background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
        }

        .stat-icon {
          font-size: 40px;
          line-height: 1;
        }

        .stat-content {
          flex: 1;
        }

        .stat-content h3 {
          margin: 0 0 10px 0;
          font-size: 16px;
          color: #64748b;
          font-weight: 600;
        }

        .stat-value {
          margin: 0 0 5px 0;
          font-size: 28px;
          font-weight: 700;
          color: #1a2c38;
        }

        .stat-detail {
          font-size: 13px;
          color: #94a3b8;
        }

        .stat-card :global(.stat-link) {
          font-size: 14px;
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .stat-card :global(.stat-link:hover) {
          color: #2563eb;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 40px;
        }

        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .card-header {
          padding: 20px 25px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-header h2 {
          margin: 0;
          font-size: 20px;
          color: #1a2c38;
        }

        .card-header :global(.view-all) {
          font-size: 14px;
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        .card-content {
          padding: 25px;
        }

        .top-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .top-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8fafc;
          border-radius: 10px;
        }

        .rank {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .affiliate-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .affiliate-info .name {
          font-weight: 600;
          color: #1a2c38;
        }

        .affiliate-info .amount {
          font-weight: 700;
          color: #f59e0b;
        }

        .pay-button {
          padding: 8px 16px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pay-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .guide-steps {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .guide-step {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .step-number {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-content h4 {
          margin: 0 0 5px 0;
          font-size: 16px;
          color: #1a2c38;
        }

        .step-content p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .last-update {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #94a3b8;
          font-size: 13px;
        }

        .empty {
          text-align: center;
          color: #94a3b8;
          padding: 40px 0;
          margin: 0;
        }

        .quick-actions {
          margin-top: 40px;
        }

        .quick-actions h2 {
          margin: 0 0 20px 0;
          font-size: 24px;
          color: #1a2c38;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .actions-grid :global(.action-card) {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 30px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .actions-grid :global(.action-card:hover) {
          border-color: #4a9eff;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(74, 158, 255, 0.2);
        }

        .actions-grid :global(.action-card.external) {
          border-style: dashed;
        }

        .action-icon {
          font-size: 40px;
        }

        .action-text {
          font-size: 16px;
          font-weight: 600;
          color: #1a2c38;
          text-align: center;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }

          .welcome-section h1 {
            font-size: 24px;
          }

          .stat-value {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}