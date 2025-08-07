import Head from "next/head";
import AdminHeader from "../../components/AdminHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminAffiliateDetail() {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Charger l'affilié
    if (router.isReady) {
      const { id } = router.query;
      if (id) {
        loadAffiliateData(id);
      }
    }
  }, [router.isReady, router.query]);

  const loadAffiliateData = async (affiliateId) => {
    try {
      // Charger les données de l'affilié
      const response = await fetch(`/api/affiliates/${affiliateId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAffiliate(data.data);
        
        // Charger les snapshots
        const snapshotsResponse = await fetch(`/api/affiliates/${affiliateId}/snapshots`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        if (snapshotsResponse.ok) {
          const snapshotsData = await snapshotsResponse.json();
          setSnapshots(snapshotsData.data || []);
        }
        
        // Charger les paiements
        const paymentsResponse = await fetch(`/api/affiliates/${affiliateId}/payments`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        if (paymentsResponse.ok) {
          const paymentsData = await paymentsResponse.json();
          setPayments(paymentsData.data || []);
        }
        
        setLoading(false);
      } else {
        alert('Affilié introuvable');
        router.push('/admin/affiliates');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des données');
      router.push('/admin/affiliates');
    }
  };

  if (loading || !affiliate) {
    return (
      <>
        <Head>
          <title>Chargement... - Admin Rounders</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement des données...</p>
        </div>
      </>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePayment = () => {
    router.push(`/admin/payments?affiliateId=${affiliate.id}&amount=${affiliate.pendingAmount}`);
  };

  // Calculer les statistiques
  const stats = {
    totalEarned: affiliate.paidAmount + affiliate.pendingAmount,
    commissionRate: 50, // Toujours 50%
    daysActive: Math.floor((new Date() - new Date(affiliate.registrationDate)) / (1000 * 60 * 60 * 24)),
    averagePerDay: affiliate.paidAmount > 0 ? 
      (affiliate.paidAmount / Math.max(1, Math.floor((new Date() - new Date(affiliate.registrationDate)) / (1000 * 60 * 60 * 24)))).toFixed(2) : 0
  };

  // Préparer les données pour le graphique
  const chartData = snapshots.slice(-30).map(snapshot => ({
    date: new Date(snapshot.extractedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    commission: snapshot.totalCommission
  }));

  return (
    <>
      <Head>
        <title>{affiliate.pseudoReal || affiliate.pseudoMasked} - Admin Rounders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="admin-dashboard">
        <AdminHeader currentPage="affiliates" />

        <div className="dashboard-content">
          <div className="container">
            {/* Bouton retour */}
            <button
              onClick={() => router.push('/admin/affiliates')}
              className="btn-back"
            >
              ← Retour aux affiliés
            </button>

            {/* En-tête de l'affilié */}
            <div className="affiliate-header">
              <div className="header-info">
                <h1>{affiliate.pseudoReal || affiliate.pseudoMasked}</h1>
                {affiliate.pseudoReal && (
                  <p className="pseudo-masked">Pseudo Stake : {affiliate.pseudoMasked}</p>
                )}
                <div className="status-badges">
                  <span className="badge badge-primary">
                    Affilié depuis {stats.daysActive} jours
                  </span>
                  {affiliate.lastUpdate && (
                    <span className="badge badge-info">
                      Dernière MAJ : {formatDateTime(affiliate.lastUpdate)}
                    </span>
                  )}
                </div>
              </div>
              {affiliate.pendingAmount > 0 && (
                <div className="header-actions">
                  <button
                    onClick={handlePayment}
                    className="btn btn-success"
                  >
                    💰 Payer {formatCurrency(affiliate.pendingAmount)}
                  </button>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Vue d'ensemble
              </button>
              <button
                className={`tab ${activeTab === 'evolution' ? 'active' : ''}`}
                onClick={() => setActiveTab('evolution')}
              >
                Évolution
              </button>
              <button
                className={`tab ${activeTab === 'payments' ? 'active' : ''}`}
                onClick={() => setActiveTab('payments')}
              >
                Paiements
              </button>
            </div>

            {/* Contenu des tabs */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <div className="stats-grid">
                    <div className="stat-card primary">
                      <div className="stat-icon">💰</div>
                      <div className="stat-content">
                        <h3>Total gagné</h3>
                        <p className="stat-value">{formatCurrency(stats.totalEarned)}</p>
                        <small>Payé + En attente</small>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">⏳</div>
                      <div className="stat-content">
                        <h3>En attente</h3>
                        <p className="stat-value warning">{formatCurrency(affiliate.pendingAmount)}</p>
                        <small>À payer prochainement</small>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">✅</div>
                      <div className="stat-content">
                        <h3>Déjà payé</h3>
                        <p className="stat-value success">{formatCurrency(affiliate.paidAmount)}</p>
                        <small>Total historique</small>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">📊</div>
                      <div className="stat-content">
                        <h3>Commission actuelle</h3>
                        <p className="stat-value">{formatCurrency(affiliate.currentCommission)}</p>
                        <small>Sur Stake</small>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Informations importantes</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="label">Commission de départ :</span>
                        <span className="value">{formatCurrency(affiliate.startingCommission)}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Dernière référence payée :</span>
                        <span className="value">{formatCurrency(affiliate.lastPaidCommission)}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Taux de reversement :</span>
                        <span className="value">{stats.commissionRate}%</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Moyenne par jour :</span>
                        <span className="value">{formatCurrency(stats.averagePerDay)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'evolution' && (
                <div className="evolution-content">
                  <h3>Évolution des commissions (30 derniers jours)</h3>
                  
                  {chartData.length > 0 ? (
                    <div className="chart-container">
                      <div className="simple-chart">
                        {chartData.map((data, index) => (
                          <div key={index} className="chart-bar-wrapper">
                            <div 
                              className="chart-bar"
                              style={{
                                height: `${(data.commission / Math.max(...chartData.map(d => d.commission))) * 200}px`
                              }}
                              title={`${data.date}: ${formatCurrency(data.commission)}`}
                            />
                            <span className="chart-label">{data.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="no-data">Pas assez de données pour afficher l'évolution</p>
                  )}

                  <div className="snapshots-list">
                    <h4>Derniers snapshots</h4>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Total misé</th>
                          <th>Commission totale</th>
                          <th>Niveau VIP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {snapshots.slice(0, 10).map((snapshot) => (
                          <tr key={snapshot.id}>
                            <td>{formatDateTime(snapshot.extractedAt)}</td>
                            <td>{formatCurrency(snapshot.totalWagered)}</td>
                            <td>{formatCurrency(snapshot.totalCommission)}</td>
                            <td>{snapshot.vipLevel || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="payments-content">
                  <h3>Historique des paiements</h3>
                  
                  {payments.length > 0 ? (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Montant</th>
                          <th>Crypto</th>
                          <th>Transaction ID</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.id}>
                            <td>{formatDateTime(payment.paidAt || payment.createdAt)}</td>
                            <td className="amount">{formatCurrency(payment.amount)}</td>
                            <td>
                              <span className={`crypto-badge ${payment.crypto?.toLowerCase()}`}>
                                {payment.crypto || 'USDT'}
                              </span>
                            </td>
                            <td className="tx-id">{payment.transactionId}</td>
                            <td>{payment.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="no-data">Aucun paiement enregistré</p>
                  )}

                  <div className="payment-summary">
                    <div className="summary-item">
                      <span>Total payé :</span>
                      <strong>{formatCurrency(affiliate.paidAmount)}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Nombre de paiements :</span>
                      <strong>{payments.length}</strong>
                    </div>
                    {affiliate.lastPaymentDate && (
                      <div className="summary-item">
                        <span>Dernier paiement :</span>
                        <strong>{formatDate(affiliate.lastPaymentDate)}</strong>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
          max-width: 1200px;
          margin: 0 auto;
        }

        .btn-back {
          padding: 10px 20px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #64748b;
          transition: all 0.2s ease;
          margin-bottom: 20px;
        }

        .btn-back:hover {
          border-color: #4a9eff;
          color: #4a9eff;
        }

        .affiliate-header {
          background: white;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-info h1 {
          margin: 0 0 10px 0;
          color: #1a2c38;
          font-size: 28px;
        }

        .pseudo-masked {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 15px;
          font-family: monospace;
        }

        .status-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .badge {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .badge-primary {
          background: #dbeafe;
          color: #2563eb;
        }

        .badge-info {
          background: #e0f2fe;
          color: #0284c7;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-success {
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
        }

        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.4);
        }

        .tabs {
          display: flex;
          gap: 5px;
          margin-bottom: 30px;
          background: white;
          padding: 5px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .tab {
          flex: 1;
          padding: 12px;
          background: transparent;
          border: none;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .tab:hover {
          background: #f8fafc;
        }

        .tab.active {
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          color: white;
        }

        .tab-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: #f8fafc;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 15px;
          border: 1px solid #e5e7eb;
        }

        .stat-card.primary {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-color: #3b82f6;
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-content h3 {
          margin: 0 0 8px 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
        }

        .stat-value {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          color: #1a2c38;
        }

        .stat-value.warning {
          color: #d97706;
        }

        .stat-value.success {
          color: #16a34a;
        }

        .stat-content small {
          display: block;
          margin-top: 5px;
          color: #94a3b8;
          font-size: 12px;
        }

        .info-section {
          background: #f8fafc;
          border-radius: 10px;
          padding: 20px;
          margin-top: 20px;
        }

        .info-section h3 {
          margin: 0 0 15px 0;
          color: #1a2c38;
          font-size: 18px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .info-item .label {
          color: #64748b;
          font-size: 14px;
        }

        .info-item .value {
          font-weight: 600;
          color: #1a2c38;
        }

        .evolution-content h3,
        .payments-content h3 {
          margin: 0 0 20px 0;
          color: #1a2c38;
        }

        .chart-container {
          background: #f8fafc;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .simple-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 250px;
          gap: 5px;
          padding: 20px 0;
        }

        .chart-bar-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .chart-bar {
          width: 100%;
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          border-radius: 4px 4px 0 0;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .chart-bar:hover {
          opacity: 0.8;
        }

        .chart-label {
          font-size: 11px;
          color: #64748b;
          transform: rotate(-45deg);
        }

        .snapshots-list h4 {
          margin: 0 0 15px 0;
          color: #1a2c38;
          font-size: 16px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: 12px;
          background: #f8fafc;
          color: #64748b;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 2px solid #e5e7eb;
        }

        .data-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .data-table .amount {
          font-weight: 600;
          color: #16a34a;
        }

        .crypto-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: white;
        }

        .crypto-badge.btc {
          background: #f7931a;
        }

        .crypto-badge.eth {
          background: #627eea;
        }

        .crypto-badge.usdt {
          background: #26a17b;
        }

        .tx-id {
          font-family: monospace;
          font-size: 13px;
          color: #64748b;
        }

        .no-data {
          text-align: center;
          color: #94a3b8;
          padding: 40px;
        }

        .payment-summary {
          background: #f8fafc;
          border-radius: 10px;
          padding: 20px;
          margin-top: 30px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
        }

        .summary-item span {
          color: #64748b;
        }

        .summary-item strong {
          color: #1a2c38;
        }

        @media (max-width: 768px) {
          .affiliate-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .tabs {
            flex-direction: column;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .simple-chart {
            height: 150px;
          }

          .chart-label {
            font-size: 9px;
          }
        }
      `}</style>
    </>
  );
}