import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminHeader from '../../components/AdminHeader';

export default function UpdateCommissionsPage() {
  const router = useRouter();
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);

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

      // Charger les affiliés
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
        
        // Initialiser le formulaire avec les valeurs actuelles
        const initialData = {};
        data.affiliates.forEach(affiliate => {
          initialData[affiliate.id] = {
            totalBet: affiliate.currentTotalBet || '',
            totalCommission: affiliate.currentCommission || ''
          };
        });
        setFormData(initialData);
        
        // Récupérer la date de dernière mise à jour
        if (data.lastUpdate) {
          setLastUpdate(new Date(data.lastUpdate));
        }
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

  const handleInputChange = (affiliateId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [affiliateId]: {
        ...prev[affiliateId],
        [field]: value
      }
    }));
  };

  const calculatePreview = (affiliate) => {
    const data = formData[affiliate.id];
    if (!data || !data.totalCommission) return null;

    const newCommission = parseFloat(data.totalCommission) || 0;
    const lastPaidCommission = parseFloat(affiliate.lastPaidCommission) || 0;
    const difference = newCommission - lastPaidCommission;
    
    if (difference <= 0) return null;

    return {
      difference: difference,
      affiliateShare: difference * 0.5,
      newPending: (parseFloat(affiliate.pendingAmount) || 0) + (difference * 0.5)
    };
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      
      // Préparer les données à envoyer
      const updates = [];
      
      affiliates.forEach(affiliate => {
        const data = formData[affiliate.id];
        if (data && data.totalBet && data.totalCommission) {
          const totalBet = parseFloat(data.totalBet);
          const totalCommission = parseFloat(data.totalCommission);
          
          // Seulement envoyer si les valeurs ont changé
          if (totalBet !== affiliate.currentTotalBet || totalCommission !== affiliate.currentCommission) {
            updates.push({
              affiliateId: affiliate.id,
              totalBet: totalBet,
              totalCommission: totalCommission
            });
          }
        }
      });

      if (updates.length === 0) {
        showMessage('warning', 'Aucune modification détectée');
        setSaving(false);
        return;
      }

      const response = await fetch('/api/commissions/update-manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ updates })
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('success', `${result.updated} affiliés mis à jour avec succès !`);
        // Recharger les données
        await loadAffiliates();
      } else {
        showMessage('error', result.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showMessage('error', 'Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <AdminHeader currentPage="update" />
        <div className="loading-container">
          <div className="loading-spinner">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminHeader currentPage="update" />
      
      <div className="update-container">
        <div className="update-header">
          <h1>📊 Mise à jour des Commissions</h1>
          <p>Entrez les montants actuels depuis Stake pour chaque affilié</p>
          {lastUpdate && (
            <p className="last-update">
              Dernière mise à jour : {lastUpdate.toLocaleString('fr-FR')}
            </p>
          )}
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="update-form">
          <table className="affiliates-table">
            <thead>
              <tr>
                <th>Affilié</th>
                <th>Total Misé (€)</th>
                <th>Commission Totale (€)</th>
                <th>Aperçu</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map(affiliate => {
                const preview = calculatePreview(affiliate);
                const data = formData[affiliate.id] || {};
                
                return (
                  <tr key={affiliate.id}>
                    <td className="affiliate-name">
                      <strong>{affiliate.name}</strong>
                      <small>{affiliate.stakeUsername}</small>
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={data.totalBet || ''}
                        onChange={(e) => handleInputChange(affiliate.id, 'totalBet', e.target.value)}
                        className="input-field"
                        disabled={saving}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={data.totalCommission || ''}
                        onChange={(e) => handleInputChange(affiliate.id, 'totalCommission', e.target.value)}
                        className="input-field"
                        disabled={saving}
                      />
                    </td>
                    <td className="preview">
                      {preview ? (
                        <div className="preview-content">
                          <span className="new-commission">
                            +{preview.affiliateShare.toFixed(2)}€
                          </span>
                          <small>
                            Total: {preview.newPending.toFixed(2)}€
                          </small>
                        </div>
                      ) : (
                        <span className="no-change">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="form-actions">
            <button 
              onClick={handleSubmit}
              disabled={saving}
              className="submit-button"
            >
              {saving ? '⏳ Mise à jour en cours...' : '💾 Mettre à jour les commissions'}
            </button>
          </div>
        </div>

        <div className="info-box">
          <h3>ℹ️ Comment ça marche :</h3>
          <ol>
            <li>Allez sur Stake → Affiliate → Referred Users</li>
            <li>Pour chaque affilié, copiez le "Total misé" et la "Commission totale"</li>
            <li>Entrez ces valeurs dans les champs correspondants</li>
            <li>L'aperçu vous montre la nouvelle commission qui sera ajoutée</li>
            <li>Cliquez sur "Mettre à jour" pour enregistrer</li>
          </ol>
          <p><strong>Note :</strong> Les commissions sont calculées automatiquement (50% de la différence depuis le dernier paiement)</p>
        </div>
      </div>

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

        .update-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .update-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .update-header h1 {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .update-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .last-update {
          margin-top: 10px;
          font-size: 0.9rem;
          color: #888;
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

        .update-form {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          margin-bottom: 30px;
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

        .affiliate-name {
          display: flex;
          flex-direction: column;
        }

        .affiliate-name strong {
          font-size: 1rem;
          color: #212529;
        }

        .affiliate-name small {
          color: #6c757d;
          font-size: 0.85rem;
          margin-top: 2px;
        }

        .input-field {
          width: 100%;
          max-width: 150px;
          padding: 8px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.15s;
        }

        .input-field:focus {
          outline: none;
          border-color: #4a9eff;
        }

        .input-field:disabled {
          background: #e9ecef;
          cursor: not-allowed;
        }

        .preview {
          min-width: 150px;
        }

        .preview-content {
          display: flex;
          flex-direction: column;
        }

        .new-commission {
          color: #28a745;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .preview-content small {
          color: #6c757d;
          margin-top: 2px;
        }

        .no-change {
          color: #6c757d;
          font-style: italic;
        }

        .form-actions {
          margin-top: 30px;
          text-align: center;
        }

        .submit-button {
          padding: 15px 40px;
          background: #4a9eff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
        }

        .submit-button:hover:not(:disabled) {
          background: #357abd;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(74, 158, 255, 0.3);
        }

        .submit-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .info-box {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          border-left: 4px solid #4a9eff;
        }

        .info-box h3 {
          margin-top: 0;
          color: #212529;
        }

        .info-box ol {
          margin: 15px 0;
          padding-left: 20px;
        }

        .info-box li {
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .info-box p {
          margin-bottom: 0;
          color: #666;
        }

        @media (max-width: 768px) {
          .update-container {
            padding: 10px;
          }

          .affiliates-table {
            font-size: 0.9rem;
          }

          .affiliates-table th,
          .affiliates-table td {
            padding: 10px 5px;
          }

          .input-field {
            max-width: 100px;
          }

          .submit-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}