import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminHeader from '../../../../components/AdminHeader';

export default function AffiliateHistoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [affiliate, setAffiliate] = useState(null);
  const [history, setHistory] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      checkAuthAndLoadData();
    }
  }, [id]);

  const checkAuthAndLoadData = async () => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      // Vérifier l'auth
      const authResponse = await fetch('/api/admin/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!authResponse.ok) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      // Charger les données
      await loadAffiliateData(token);
    } catch (error) {
      console.error('Erreur:', error);
      router.push('/admin/login');
    }
  };

  const loadAffiliateData = async (token) => {
    try {
      // Charger l'affilié
      const affiliateResponse = await fetch(`/api/affiliates/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (affiliateResponse.ok) {
        const affiliateData = await affiliateResponse.json();
        console.log('Affiliate data received:', affiliateData);
        console.log('pendingAmount:', affiliateData.pendingAmount, 'type:', typeof affiliateData.pendingAmount);
        setAffiliate(affiliateData);
      }

      // Charger l'historique
      const historyResponse = await fetch(`/api/affiliates/${id}/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        setHistory(historyData.history || []);
      }

      // Charger les paiements
      const paymentsResponse = await fetch(`/api/affiliates/${id}/payments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        setPayments(paymentsData.payments || []);
      }

    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <AdminHeader />
        <div className="loading-container">
          <div className="loading-spinner">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="admin-page">
        <AdminHeader />
        <div className="error-container">
          <p>Affilié introuvable</p>
          <Link href="/admin/affiliates" className="back-link">
            Retour aux affiliés
          </Link>
        </div>
      </div>
    );
  }

  const totalPaid = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
  const totalEarned = history.reduce((sum, h) => sum + parseFloat(h.affiliateShare || 0), 0);

  return (
    <div className="admin-page">
      <AdminHeader />
      
      <div className="history-container">
        <div className="history-header">
          <Link href="/admin/affiliates" className="back-link">
            ← Retour
          </Link>
          <h1>📊 Historique - {affiliate.name}</h1>
          <p className="username">{affiliate.stakeUsername}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>💰 En attente</h3>
            <div className="stat-value pending">
              {affiliate.pendingAmount !== null && affiliate.pendingAmount !== undefined 
                ? parseFloat(affiliate.pendingAmount).toFixed(2) 
                : '0.00'}€
            </div>
          </div>
          <div className="stat-card">
            <h3>✅ Total payé</h3>
            <div className="stat-value paid">
              {totalPaid.toFixed(2)}€
            </div>
          </div>
          <div className="stat-card">
            <h3>📈 Total gagné</h3>
            <div className="stat-value earned">
              {totalEarned.toFixed(2)}€
            </div>
          </div>
          <div className="stat-card">
            <h3>🎯 Commission totale</h3>
            <div className="stat-value">
              {parseFloat(affiliate.currentCommission || 0).toFixed(2)}€
            </div>
          </div>
        </div>

        <div className="content-tabs">
          <div className="tab-content">
            <h2>📈 Évolution des commissions</h2>
            {history.length > 0 ? (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Commission</th>
                    <th>Différence</th>
                    <th>Part affilié (50%)</th>
                    <th>Méthode</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry) => (
                    <tr key={entry.id}>
                      <td>{new Date(entry.calculatedAt).toLocaleString('fr-FR')}</td>
                      <td>
                        {parseFloat(entry.previousCommission).toFixed(2)}€ → {parseFloat(entry.newCommission).toFixed(2)}€
                      </td>
                      <td className="positive">
                        +{parseFloat(entry.commissionDifference).toFixed(2)}€
                      </td>
                      <td className="highlight">
                        +{parseFloat(entry.affiliateShare).toFixed(2)}€
                      </td>
                      <td>
                        <span className={`method ${entry.method?.toLowerCase() || 'auto'}`}>
                          {entry.method === 'MANUAL' ? '✏️ Manuel' : '🤖 Auto'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">Aucun historique de commission</p>
            )}
          </div>

          <div className="tab-content">
            <h2>💸 Historique des paiements</h2>
            {payments.length > 0 ? (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Méthode</th>
                    <th>Référence</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{new Date(payment.paidAt).toLocaleString('fr-FR')}</td>
                      <td className="highlight">{parseFloat(payment.amount).toFixed(2)}€</td>
                      <td>{payment.paymentMethod || 'Non spécifié'}</td>
                      <td>{payment.transactionId || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">Aucun paiement effectué</p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-page {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          gap: 20px;
        }

        .history-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .history-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .back-link {
          display: inline-block;
          color: #4a9eff;
          text-decoration: none;
          margin-bottom: 20px;
          font-weight: 500;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: #357abd;
        }

        .history-header h1 {
          font-size: 2rem;
          margin-bottom: 5px;
        }

        .username {
          color: #666;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          text-align: center;
        }

        .stat-card h3 {
          margin: 0 0 10px 0;
          font-size: 1rem;
          color: #666;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: #212529;
        }

        .stat-value.pending {
          color: #ff9800;
        }

        .stat-value.paid {
          color: #4caf50;
        }

        .stat-value.earned {
          color: #2196f3;
        }

        .content-tabs {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .tab-content {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .tab-content h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: #212529;
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
        }

        .history-table th {
          background: #f8f9fa;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #dee2e6;
        }

        .history-table td {
          padding: 12px;
          border-bottom: 1px solid #dee2e6;
        }

        .history-table tr:hover {
          background: #f8f9fa;
        }

        .positive {
          color: #28a745;
          font-weight: 500;
        }

        .highlight {
          color: #007bff;
          font-weight: bold;
        }

        .method {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .method.manual {
          background: #fff3cd;
          color: #856404;
        }

        .method.auto {
          background: #d1ecf1;
          color: #0c5460;
        }

        .no-data {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 40px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .history-table {
            font-size: 0.9rem;
          }

          .history-table th,
          .history-table td {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
}