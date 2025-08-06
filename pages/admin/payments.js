import Head from "next/head";
import AdminHeader from "../../components/AdminHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminPayments() {
  const router = useRouter();
  const [affiliates, setAffiliates] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentCrypto, setPaymentCrypto] = useState('USDT');
  const [paymentNote, setPaymentNote] = useState('');

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger les affiliés depuis l'API Neon
      const affiliatesResponse = await fetch('/api/affiliates');
      if (affiliatesResponse.ok) {
        const affiliatesResult = await affiliatesResponse.json();
        setAffiliates(affiliatesResult.data || []);
      }

      // Charger les paiements depuis l'API Neon
      const paymentsResponse = await fetch('/api/payments');
      if (paymentsResponse.ok) {
        const paymentsResult = await paymentsResponse.json();
        setPayments(paymentsResult.data || []);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setAffiliates([]);
      setPayments([]);
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNewPayment = async () => {
    if (!selectedAffiliate || !paymentAmount) {
      alert('Veuillez sélectionner un affilié et entrer un montant');
      return;
    }

    const affiliate = affiliates.find(a => a.id === selectedAffiliate);
    
    try {
      // Enregistrer le paiement dans Neon
      const response = await fetch(`/api/affiliates/${selectedAffiliate}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          amount: parseFloat(paymentAmount),
          crypto: paymentCrypto,
          note: paymentNote || 'Paiement hebdomadaire'
        })
      });

      if (response.ok) {
        // Recharger les données
        await loadData();
        
        // Reset form
        setSelectedAffiliate('');
        setPaymentAmount('');
        setPaymentCrypto('USDT');
        setPaymentNote('');
        setShowNewPayment(false);
        
        alert('Paiement enregistré avec succès !');
      } else {
        alert('Erreur lors de l\'enregistrement du paiement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement du paiement');
    }
  };

  const handleDeletePayment = async (paymentId, affiliateId, amount) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ce paiement de ${formatCurrency(amount)} ?\n\nCette action va :\n- Supprimer le paiement de l'historique\n- Remettre le montant en "commission en attente"`)) {
      return;
    }

    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        // Recharger les données
        await loadData();
        alert('Paiement supprimé avec succès !');
      } else {
        alert('Erreur lors de la suppression du paiement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression du paiement');
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = affiliates.reduce((sum, a) => sum + (a.pendingAmount || 0), 0);

  return (
    <>
      <Head>
        <title>Gestion des Paiements - Admin Rounders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="admin-dashboard">
        {/* Header Admin avec stats intégrées */}
        <AdminHeader currentPage="payments" />

        {/* Contenu principal */}
        <div className="dashboard-content">
          <div className="container">
            {/* Titre et bouton de nettoyage */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <h1 style={{
                fontSize: '24px',
                color: '#1a2c38',
                margin: 0,
                fontWeight: '700'
              }}>
                Gestion des Paiements
              </h1>
            </div>

            {/* Statistiques */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <span style={{fontSize: '40px'}}>💰</span>
                <div>
                  <p style={{color: '#64748b', fontSize: '14px', marginBottom: '5px'}}>Total payé</p>
                  <p style={{fontSize: '28px', fontWeight: '800', color: '#16a34a', margin: 0}}>
                    {formatCurrency(totalPaid)}
                  </p>
                </div>
              </div>
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <span style={{fontSize: '40px'}}>⏳</span>
                <div>
                  <p style={{color: '#64748b', fontSize: '14px', marginBottom: '5px'}}>En attente</p>
                  <p style={{fontSize: '28px', fontWeight: '800', color: '#d97706', margin: 0}}>
                    {formatCurrency(totalPending)}
                  </p>
                </div>
              </div>
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <span style={{fontSize: '40px'}}>📊</span>
                <div>
                  <p style={{color: '#64748b', fontSize: '14px', marginBottom: '5px'}}>Nombre de paiements</p>
                  <p style={{fontSize: '28px', fontWeight: '800', color: '#1a2c38', margin: 0}}>
                    {payments.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton nouveau paiement */}
            <div style={{marginBottom: '30px'}}>
              <button
                onClick={() => setShowNewPayment(!showNewPayment)}
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 30px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)'
                }}
              >
                <span style={{fontSize: '20px'}}>➕</span>
                Effectuer un nouveau paiement
              </button>
            </div>

            {/* Formulaire nouveau paiement */}
            {showNewPayment && (
              <div style={{
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                border: '2px solid #16a34a',
                borderRadius: '12px',
                padding: '30px',
                marginBottom: '30px'
              }}>
                <h3 style={{color: '#14532d', marginBottom: '20px'}}>
                  💳 Enregistrer un nouveau paiement
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr', gap: '20px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#15803d', fontWeight: '600'}}>
                      Sélectionner l'affilié
                    </label>
                    <select
                      value={selectedAffiliate}
                      onChange={(e) => setSelectedAffiliate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '2px solid #16a34a',
                        fontSize: '16px',
                        background: 'white'
                      }}
                    >
                      <option value="">-- Choisir --</option>
                      {affiliates && affiliates.length > 0 ? (
                        affiliates.filter(a => a.isConfirmed && a.pendingAmount > 0).map(affiliate => (
                          <option key={affiliate.id} value={affiliate.id}>
                            {affiliate.pseudoReal} ({formatCurrency(affiliate.pendingAmount)} en attente)
                          </option>
                        ))
                      ) : (
                        <option disabled>Aucun affilié confirmé avec montant en attente</option>
                      )}
                      {affiliates && affiliates.filter(a => a.isConfirmed).length === 0 && (
                        <option disabled>Aucun affilié confirmé</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#15803d', fontWeight: '600'}}>
                      Montant
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Ex: 100.00"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '2px solid #16a34a',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#15803d', fontWeight: '600'}}>
                      Crypto
                    </label>
                    <select
                      value={paymentCrypto}
                      onChange={(e) => setPaymentCrypto(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '2px solid #16a34a',
                        fontSize: '16px',
                        background: 'white'
                      }}
                    >
                      <option value="USDT">USDT</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="LTC">LTC</option>
                      <option value="DOGE">DOGE</option>
                      <option value="TRX">TRX</option>
                      <option value="XRP">XRP</option>
                      <option value="BNB">BNB</option>
                      <option value="USDC">USDC</option>
                      <option value="APE">APE</option>
                      <option value="BUSD">BUSD</option>
                      <option value="CRO">CRO</option>
                      <option value="DAI">DAI</option>
                      <option value="LINK">LINK</option>
                      <option value="SAND">SAND</option>
                      <option value="SHIB">SHIB</option>
                      <option value="UNI">UNI</option>
                      <option value="MATIC">MATIC</option>
                    </select>
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#15803d', fontWeight: '600'}}>
                      Note (optionnel)
                    </label>
                    <input
                      type="text"
                      value={paymentNote}
                      onChange={(e) => setPaymentNote(e.target.value)}
                      placeholder="Ex: Paiement hebdomadaire"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '2px solid #16a34a',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>
                <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
                  <button
                    onClick={handleNewPayment}
                    style={{
                      background: '#16a34a',
                      color: 'white',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Confirmer le paiement
                  </button>
                  <button
                    onClick={() => setShowNewPayment(false)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ❌ Annuler
                  </button>
                </div>
              </div>
            )}

            {/* Affiliés avec paiements en attente */}
            {affiliates && affiliates.filter(a => a.pendingAmount > 0).length > 0 && (
              <div style={{marginBottom: '40px'}}>
                <h2 style={{fontSize: '20px', marginBottom: '20px', color: '#1a2c38'}}>
                  Affiliés avec commissions en attente
                </h2>
                <div style={{display: 'grid', gap: '15px'}}>
                  {affiliates.filter(a => a.pendingAmount > 0).map(affiliate => (
                    <div key={affiliate.id} style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '10px',
                      border: '2px solid #ffd700',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <h4 style={{margin: '0 0 5px 0', color: '#1a2c38'}}>
                          {affiliate.isConfirmed ? affiliate.pseudoReal : affiliate.pseudoMasked}
                          {!affiliate.isConfirmed && (
                            <span style={{
                              marginLeft: '10px',
                              fontSize: '12px',
                              color: '#dc2626',
                              fontStyle: 'italic'
                            }}>
                              (Pseudo non confirmé)
                            </span>
                          )}
                        </h4>
                        <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                          Montant en attente
                        </p>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <p style={{fontSize: '24px', fontWeight: '700', color: '#d97706', margin: 0}}>
                          {formatCurrency(affiliate.pendingAmount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Historique des paiements */}
            <div>
              <h2 style={{fontSize: '20px', marginBottom: '20px', color: '#1a2c38'}}>
                Historique des paiements
              </h2>
              {payments.length > 0 ? (
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead style={{background: '#f8fafc'}}>
                      <tr>
                        <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Date</th>
                        <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Affilié</th>
                        <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Montant</th>
                        <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Crypto</th>
                        <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Transaction ID</th>
                        <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Note</th>
                        <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Statut</th>
                        <th style={{padding: '15px', textAlign: 'center', color: '#64748b', fontWeight: '600'}}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, index) => (
                        <tr key={payment.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '15px', color: '#1a2c38'}}>
                            {formatDate(payment.createdAt)}
                          </td>
                          <td style={{padding: '15px', color: '#1a2c38', fontWeight: '600'}}>
                            {payment.affiliate?.pseudoReal || payment.affiliate?.pseudoMasked || 'N/A'}
                          </td>
                          <td style={{padding: '15px', color: '#16a34a', fontWeight: '700'}}>
                            {formatCurrency(payment.amount)}
                          </td>
                          <td style={{padding: '15px'}}>
                            <span style={{
                              background: payment.crypto === 'BTC' ? '#f7931a' : 
                                         payment.crypto === 'ETH' ? '#627eea' :
                                         payment.crypto === 'USDT' ? '#26a17b' :
                                         payment.crypto === 'LTC' ? '#345d9d' :
                                         payment.crypto === 'DOGE' ? '#c2a633' :
                                         '#4a9eff',
                              color: 'white',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {payment.crypto || 'USDT'}
                            </span>
                          </td>
                          <td style={{padding: '15px', color: '#64748b', fontFamily: 'monospace', fontSize: '14px'}}>
                            {payment.transactionId}
                          </td>
                          <td style={{padding: '15px', color: '#64748b'}}>
                            {payment.note}
                          </td>
                          <td style={{padding: '15px'}}>
                            <span style={{
                              background: '#dcfce7',
                              color: '#16a34a',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              ✓ Complété
                            </span>
                          </td>
                          <td style={{padding: '15px', textAlign: 'center'}}>
                            <button
                              onClick={() => handleDeletePayment(payment.id, payment.affiliateId, payment.amount)}
                              style={{
                                background: '#fee2e2',
                                color: '#dc2626',
                                border: '1px solid #dc2626',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#dc2626';
                                e.currentTarget.style.color = 'white';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#fee2e2';
                                e.currentTarget.style.color = '#dc2626';
                              }}
                            >
                              🗑️ Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '60px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{fontSize: '48px', marginBottom: '20px'}}>💸</div>
                  <p style={{fontSize: '18px', color: '#64748b', marginBottom: '10px'}}>
                    Aucun paiement enregistré
                  </p>
                  <p style={{fontSize: '14px', color: '#94a3b8'}}>
                    Les paiements effectués apparaîtront ici
                  </p>
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
          max-width: 1400px;
          margin: 0 auto;
        }

        button:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          table {
            font-size: 14px;
          }

          th, td {
            padding: 10px !important;
          }
        }
      `}</style>
    </>
  );
}