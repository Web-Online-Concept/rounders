import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminHeader from '../../components/AdminHeader';
import AddAffiliateModal from '../../components/AddAffiliateModal';

export default function AffiliatesPage() {
  const router = useRouter();
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
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

      await loadAffiliates();
    } catch (error) {
      console.error('Erreur:', error);
      router.push('/admin/login');
    }
  };

  const loadAffiliates = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/affiliates', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAffiliates(data.affiliates || []);
      }
    } catch (error) {
      console.error('Erreur chargement affiliés:', error);
      showMessage('error', 'Erreur lors du chargement des affiliés');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handlePay = async (affiliateId) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    if (!affiliate) return;

    const amount = parseFloat(affiliate.pendingAmount);
    if (!amount || amount <= 0) {
      showMessage('warning', 'Aucun montant à payer');
      return;
    }

    if (!confirm(`Confirmer le paiement de ${amount.toFixed(2)}€ à ${affiliate.name} ?`)) {
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
        showMessage('success', `Paiement de ${amount.toFixed(2)}€ enregistré`);
        await loadAffiliates();
      } else {
        const error = await response.json();
        showMessage('error', error.message || 'Erreur lors du paiement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showMessage('error', 'Erreur lors du paiement');
    }
  };

  const handleDelete = async (affiliateId) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    if (!affiliate) return;

    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${affiliate.name} ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/affiliates/${affiliateId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        showMessage('success', 'Affilié supprimé');
        await loadAffiliates();
      } else {
        const error = await response.json();
        showMessage('error', error.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showMessage('error', 'Erreur lors de la suppression');
    }
  };

  const handleAddSuccess = () => {
    showMessage('success', 'Affilié ajouté avec succès');
    loadAffiliates();
  };

  const totalPending = affiliates.reduce((sum, a) => sum + parseFloat(a.pendingAmount || 0), 0);
  const totalPaid = affiliates.reduce((sum, a) => sum + parseFloat(a.paidAmount || 0), 0);

  if (loading) {
    return (
      <div className="admin-page">
        <AdminHeader currentPage="affiliates" />
        <div className="loading-container">
          <div className="loading-spinner">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminHeader currentPage="affiliates" />
      
      <div className="affiliates-container">
        <div className="page-header">
          <h1>👥 Gestion des Affiliés</h1>
          <button 
            className="add-button"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Ajouter un affilié
          </button>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="stats-row">
          <div className="stat-card">
            <h3>📊 Affiliés actifs</h3>
            <div className="stat-value">{affiliates.length}</div>
          </div>
          <div className="stat-card">
            <h3>💰 Total à payer</h3>
            <div className="stat-value pending">{totalPending.toFixed(2)}€</div>
          </div>
          <div className="stat-card">
            <h3>✅ Total payé</h3>
            <div className="stat-value paid">{totalPaid.toFixed(2)}€</div>
          </div>
        </div>

        <div className="affiliates-table-container">
          <table className="affiliates-table">
            <thead>
              <tr>
                <th>Affilié</th>
                <th>Total misé</th>
                <th>Commission totale</th>
                <th>En attente</th>
                <th>Déjà payé</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map(affiliate => (
                <tr key={affiliate.id}>
                  <td>
                    <div className="affiliate-info">
                      <strong>{affiliate.name}</strong>
                      <small>{affiliate.stakeUsername}</small>
                    </div>
                  </td>
                  <td>{parseFloat(affiliate.currentTotalBet || 0).toFixed(2)}€</td>
                  <td>{parseFloat(affiliate.currentCommission || 0).toFixed(2)}€</td>
                  <td className="pending">
                    {parseFloat(affiliate.pendingAmount || 0).toFixed(2)}€
                  </td>
                  <td className="paid">
                    {parseFloat(affiliate.paidAmount || 0).toFixed(2)}€
                  </td>
                  <td>
                    <div className="actions">
                      <Link href={`/admin/affiliate/${affiliate.id}/history`} className="action-link history">
                        📊
                      </Link>
                      <button 
                        className="action-button pay"
                        onClick={() => handlePay(affiliate.id)}
                        disabled={!affiliate.pendingAmount || affiliate.pendingAmount <= 0}
                      >
                        💰
                      </button>
                      <button 
                        className="action-button delete"
                        onClick={() => handleDelete(affiliate.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {affiliates.length === 0 && (
            <div className="empty-state">
              <p>Aucun affilié déclaré</p>
              <button 
                className="add-button-empty"
                onClick={() => setShowAddModal(true)}
              >
                ➕ Ajouter votre premier affilié
              </button>
            </div>
          )}
        </div>
      </div>

      <AddAffiliateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />

      <style jsx>{`
        .admin-page {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .affiliates-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-header h1 {
          font-size: 2rem;
          margin: 0;
        }

        .add-button {
          padding: 12px 24px;
          background: #4a9eff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-button:hover {
          background: #357abd;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(74, 158, 255, 0.3);
        }

        .message {
          max-width: 800px;
          margin: 20px auto;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
        }

        .message.success {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #4caf50;
        }

        .message.error {
          background: #ffebee;
          color: #c62828;
          border: 1px solid #f44336;
        }

        .message.warning {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
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

        .affiliates-table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .affiliates-table {
          width: 100%;
          border-collapse: collapse;
        }

        .affiliates-table th {
          background: #f8f9fa;
          padding: 15px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #dee2e6;
        }

        .affiliates-table td {
          padding: 15px;
          border-bottom: 1px solid #dee2e6;
        }

        .affiliates-table tr:last-child td {
          border-bottom: none;
        }

        .affiliate-info {
          display: flex;
          flex-direction: column;
        }

        .affiliate-info strong {
          font-size: 1rem;
          color: #212529;
        }

        .affiliate-info small {
          color: #6c757d;
          font-size: 0.85rem;
          margin-top: 2px;
        }

        .pending {
          color: #ff9800;
          font-weight: 500;
        }

        .paid {
          color: #4caf50;
          font-weight: 500;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .action-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
          background: #e3f2fd;
          color: #1976d2;
        }

        .action-link:hover {
          background: #bbdefb;
        }

        .action-button {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          background: #f0f0f0;
        }

        .action-button.pay {
          background: #fff3e0;
          color: #f57c00;
        }

        .action-button.pay:hover:not(:disabled) {
          background: #ffe0b2;
        }

        .action-button.pay:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-button.delete {
          background: #ffebee;
          color: #d32f2f;
        }

        .action-button.delete:hover {
          background: #ffcdd2;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .empty-state p {
          font-size: 1.2rem;
          margin-bottom: 20px;
        }

        .add-button-empty {
          padding: 12px 24px;
          background: #4a9eff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-button-empty:hover {
          background: #357abd;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .affiliates-table {
            font-size: 0.9rem;
          }

          .affiliates-table th,
          .affiliates-table td {
            padding: 10px;
          }

          .actions {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}