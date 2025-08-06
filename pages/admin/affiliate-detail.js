import Head from "next/head";
import AdminHeader from "../../components/AdminHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminAffiliateDetail() {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showCalculModal, setShowCalculModal] = useState(false);
  const [newValues, setNewValues] = useState({ totalBet: '', totalCommission: '' });
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
        setNewValues({
          totalBet: data.data.totalBet.toString(),
          totalCommission: data.data.totalCommission.toString()
        });
        
        // Les paiements sont déjà inclus dans la réponse
        if (data.data.payments) {
          setPayments(data.data.payments);
        }
        
        // Charger l'historique des commissions depuis la table Commission
        const commissionsResponse = await fetch(`/api/affiliates/${affiliateId}/commissions`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        if (commissionsResponse.ok) {
          const commissionsData = await commissionsResponse.json();
          setCommissions(commissionsData.data || []);
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
          <p>Chargement des données de l'affilié...</p>
          <button
            onClick={() => router.push('/admin/affiliates')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#4a9eff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ← Retour aux affiliés
          </button>
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

  const handleCalculateCommission = async () => {
    const newTotalBet = parseFloat(newValues.totalBet) || 0;
    const newTotalCommission = parseFloat(newValues.totalCommission) || 0;
    
    try {
      const response = await fetch(`/api/affiliates/${affiliate.id}/commission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          totalBet: newTotalBet,
          totalCommission: newTotalCommission
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        alert(`✅ Commission calculée !\n\nPart affilié ajoutée : ${formatCurrency(result.affiliateShare)}\nNouveau montant en attente : ${formatCurrency(result.newPendingAmount)}`);
        
        setShowCalculModal(false);
        
        // Recharger les données
        loadAffiliateData(affiliate.id);
      } else {
        alert('Erreur lors du calcul de la commission');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du calcul de la commission');
    }
  };

  const handlePayment = () => {
    router.push(`/admin/payments?affiliateId=${affiliate.id}`);
  };

  // Calculer les statistiques
  const stats = {
    totalEarned: affiliate.paidAmount + affiliate.pendingAmount,
    averageCommission: affiliate.totalCommission > 0 ? 
      ((affiliate.paidAmount + affiliate.pendingAmount) / affiliate.totalCommission * 100).toFixed(2) : 0,
    daysActive: Math.floor((new Date() - new Date(affiliate.registrationDate)) / (1000 * 60 * 60 * 24))
  };

  // Calculer la preview
  const calculatePreview = () => {
    const newTotalBet = parseFloat(newValues.totalBet) || 0;
    const newTotalCommission = parseFloat(newValues.totalCommission) || 0;
    const difference = newTotalCommission - (affiliate.lastTotalCommission || 0);
    const affiliateShare = difference * 0.5;
    const newPendingAmount = affiliate.pendingAmount + affiliateShare;
    
    return {
      difference,
      affiliateShare,
      newPendingAmount
    };
  };

  return (
    <>
      <Head>
        <title>{affiliate.pseudoReal || affiliate.pseudoMasked} - Détails - Admin Rounders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="admin-dashboard">
        <AdminHeader currentPage="affiliates" />

        <div className="dashboard-content">
          <div className="container">
            {/* Bouton retour */}
            <button
              onClick={() => router.push('/admin/affiliates')}
              style={{
                marginBottom: '20px',
                padding: '10px 20px',
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600',
                color: '#64748b',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#4a9eff';
                e.currentTarget.style.color = '#4a9eff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              ← Retour aux affiliés
            </button>

            {/* En-tête de l'affilié */}
            <div className="affiliate-header">
              <div className="header-info">
                <h1>{affiliate.pseudoReal || affiliate.pseudoMasked}</h1>
                {affiliate.pseudoReal && (
                  <p className="pseudo-masked">Pseudo masqué : {affiliate.pseudoMasked}</p>
                )}
                <div className="status-badges">
                  <span className="badge badge-info">
                    Inscrit le {formatDate(affiliate.registrationDate)}
                  </span>
                </div>
              </div>
              <div className="header-actions">
                <button
                  onClick={() => setShowCalculModal(true)}
                  className="btn btn-primary"
                >
                  🧮 Calculer commission
                </button>
                {affiliate.pendingAmount > 0 && (
                  <button
                    onClick={handlePayment}
                    className="btn btn-success"
                  >
                    💰 Payer {formatCurrency(affiliate.pendingAmount)}
                  </button>
                )}
              </div>
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
                className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Historique
              </button>
              <button
                className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
              >
                Statistiques
              </button>
            </div>

            {/* Contenu des tabs */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-grid">
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                      <h3>Total misé</h3>
                      <p className="stat-value">{formatCurrency(affiliate.totalBet)}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">💵</div>
                    <div className="stat-content">
                      <h3>Commission totale</h3>
                      <p className="stat-value">{formatCurrency(affiliate.totalCommission)}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                      <h3>En attente</h3>
                      <p className="stat-value pending">{formatCurrency(affiliate.pendingAmount)}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                      <h3>Déjà payé</h3>
                      <p className="stat-value success">{formatCurrency(affiliate.paidAmount)}</p>
                    </div>
                  </div>

                  <div className="stat-card full-width">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                      <h3>Dernière commission enregistrée</h3>
                      <p className="stat-value">{formatCurrency(affiliate.lastTotalCommission || 0)}</p>
                      <small>Base de calcul pour les prochaines différences</small>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="history-section">
                  <h3>Historique des commissions</h3>
                  {commissions.length > 0 ? (
                    <table className="history-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Total misé</th>
                          <th>Commission totale</th>
                          <th>Différence</th>
                          <th>Part affilié</th>
                        </tr>
                      </thead>
                      <tbody>
                        {commissions.map((commission) => (
                          <tr key={commission.id}>
                            <td>{formatDateTime(commission.createdAt)}</td>
                            <td>{formatCurrency(commission.totalBet)}</td>
                            <td>{formatCurrency(commission.totalCommission)}</td>
                            <td>{formatCurrency(commission.difference)}</td>
                            <td>{formatCurrency(commission.affiliateShare)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="no-data">Aucun calcul de commission enregistré</p>
                  )}

                  <h3 style={{marginTop: '40px'}}>Historique des paiements</h3>
                  {payments.length > 0 ? (
                    <table className="history-table">
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
                            <td>{formatCurrency(payment.amount)}</td>
                            <td>
                              <span style={{
                                background: payment.crypto === 'BTC' ? '#f7931a' : 
                                           payment.crypto === 'ETH' ? '#627eea' :
                                           payment.crypto === 'USDT' ? '#26a17b' : '#4a9eff',
                                color: 'white',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                {payment.crypto || 'USDT'}
                              </span>
                            </td>
                            <td style={{fontFamily: 'monospace', fontSize: '13px'}}>
                              {payment.transactionId}
                            </td>
                            <td>{payment.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="no-data">Aucun paiement enregistré</p>
                  )}
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="stats-section">
                  <div className="stats-grid">
                    <div className="stat-item">
                      <h4>Total gagné</h4>
                      <p className="big-value">{formatCurrency(stats.totalEarned)}</p>
                    </div>
                    <div className="stat-item">
                      <h4>Taux de commission moyen</h4>
                      <p className="big-value">{stats.averageCommission}%</p>
                    </div>
                    <div className="stat-item">
                      <h4>Jours d'activité</h4>
                      <p className="big-value">{stats.daysActive} jours</p>
                    </div>
                  </div>

                  <div className="chart-placeholder">
                    <p>📈 Graphique d'évolution (à venir)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de calcul */}
        {showCalculModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>🧮 Calculer les commissions</h2>
              <p className="modal-subtitle">
                Affilié : <strong>{affiliate.pseudoReal || affiliate.pseudoMasked}</strong>
              </p>

              <div className="current-values">
                <h4>Valeurs actuelles :</h4>
                <div className="values-grid">
                  <div>Total misé : <strong>{formatCurrency(affiliate.totalBet)}</strong></div>
                  <div>Commission totale : <strong>{formatCurrency(affiliate.totalCommission)}</strong></div>
                  <div>Dernière commission : <strong>{formatCurrency(affiliate.lastTotalCommission || 0)}</strong></div>
                  <div>En attente : <strong>{formatCurrency(affiliate.pendingAmount)}</strong></div>
                </div>
              </div>

              <div className="new-values">
                <h4>Nouvelles valeurs (depuis Stake) :</h4>
                <input
                  type="number"
                  value={newValues.totalBet}
                  onChange={(e) => setNewValues({...newValues, totalBet: e.target.value})}
                  placeholder="Nouveau total misé"
                />
                <input
                  type="number"
                  value={newValues.totalCommission}
                  onChange={(e) => setNewValues({...newValues, totalCommission: e.target.value})}
                  placeholder="Nouvelle commission totale"
                />
              </div>

              {newValues.totalCommission && (
                <div className="calculation-preview">
                  <h4>📊 Calcul en temps réel :</h4>
                  <div className="calc-details">
                    <div>Ancienne commission : <strong>{formatCurrency(affiliate.lastTotalCommission || 0)}</strong></div>
                    <div>Nouvelle commission : <strong>{formatCurrency(parseFloat(newValues.totalCommission) || 0)}</strong></div>
                    <div className="calc-diff">
                      Différence : <strong>{formatCurrency(calculatePreview().difference)}</strong>
                    </div>
                    <div className="calc-result">
                      Part affilié (50%) : {formatCurrency(calculatePreview().affiliateShare)}
                    </div>
                    <div className="calc-total">
                      💰 Nouveau total en attente : {formatCurrency(calculatePreview().newPendingAmount)}
                    </div>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button
                  onClick={() => setShowCalculModal(false)}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCalculateCommission}
                  className="btn btn-primary"
                >
                  Valider et calculer
                </button>
              </div>
            </div>
          </div>
        )}
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

        .badge-info {
          background: #dbeafe;
          color: #2563eb;
        }

        .header-actions {
          display: flex;
          gap: 12px;
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

        .btn-primary {
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(74, 158, 255, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(74, 158, 255, 0.4);
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

        .btn-secondary {
          background: #e5e7eb;
          color: #1a2c38;
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

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: #f8fafc;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .stat-card.full-width {
          grid-column: 1 / -1;
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

        .stat-value.pending {
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

        .history-section h3 {
          margin: 0 0 20px 0;
          color: #1a2c38;
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
        }

        .history-table th {
          text-align: left;
          padding: 12px;
          background: #f8fafc;
          color: #64748b;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 2px solid #e5e7eb;
        }

        .history-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .no-data {
          text-align: center;
          color: #94a3b8;
          padding: 40px;
        }

        .stats-section {
          padding: 20px 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .stat-item h4 {
          margin: 0 0 10px 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
        }

        .big-value {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: #1a2c38;
        }

        .chart-placeholder {
          background: #f8fafc;
          border-radius: 10px;
          padding: 60px;
          text-align: center;
          color: #94a3b8;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: 16px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal h2 {
          margin: 0 0 10px 0;
          color: #1a2c38;
        }

        .modal-subtitle {
          color: #64748b;
          margin-bottom: 20px;
        }

        .current-values {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .current-values h4 {
          margin: 0 0 10px 0;
          color: #1a2c38;
          font-size: 14px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 14px;
        }

        .new-values {
          margin-bottom: 20px;
        }

        .new-values h4 {
          margin: 0 0 10px 0;
          color: #1a2c38;
          font-size: 14px;
        }

        .new-values input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
        }

        .calculation-preview {
          background: #dcfce7;
          border: 2px solid #16a34a;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .calculation-preview h4 {
          margin: 0 0 10px 0;
          color: #16a34a;
        }

        .calc-details {
          font-size: 14px;
          color: #15803d;
        }

        .calc-diff {
          border-top: 1px solid #16a34a;
          margin-top: 8px;
          padding-top: 8px;
        }

        .calc-result {
          font-size: 16px;
          font-weight: bold;
          margin-top: 8px;
          color: #16a34a;
        }

        .calc-total {
          margin-top: 8px;
          padding: 8px;
          background: #fef3c7;
          border-radius: 6px;
          color: #92400e;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .affiliate-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .header-actions {
            width: 100%;
          }

          .header-actions .btn {
            flex: 1;
          }

          .tabs {
            flex-direction: column;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}