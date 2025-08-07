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
  const [transactionId, setTransactionId] = useState('');

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
      const token = localStorage.getItem('adminToken');
      
      // Charger les affiliés
      const affiliatesResponse = await fetch('/api/affiliates', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (affiliatesResponse.ok) {
        const affiliatesResult = await affiliatesResponse.json();
        setAffiliates(affiliatesResult.affiliates || []);
      }

      // Charger les paiements
      const paymentsResponse = await fetch('/api/payments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (paymentsResponse.ok) {
        const paymentsResult = await paymentsResponse.json();
        setPayments(paymentsResult.payments || []);
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
    }).format(amount || 0);
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
    const amount = parseFloat(paymentAmount);
    
    if (amount > parseFloat(affiliate.pendingAmount)) {
      alert(`Le montant ne peut pas dépasser ${formatCurrency(affiliate.pendingAmount)}`);
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      
      // Enregistrer le paiement
      const response = await fetch(`/api/affiliates/${selectedAffiliate}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: amount,
          paymentMethod: paymentCrypto, // On envoie la crypto comme paymentMethod
          transactionId: transactionId || null,
          note: paymentNote || 'Paiement commission'
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
        setTransactionId('');
        setShowNewPayment(false);
        
        alert('Paiement enregistré avec succès !');
      } else {
        const error = await response.json();
        alert(error.message || 'Erreur lors de l\'enregistrement du paiement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement du paiement');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?\n\nCette action est irréversible.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
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

  const totalPaid = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
  const totalPending = affiliates.reduce((sum, a) => sum + parseFloat(a.pendingAmount || 0), 0);

  return (
    <>
      <Head>
        <title>Gestion des Paiements - Admin Rounders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="admin-dashboard">
        <AdminHeader currentPage="payments" />

        <div className="dashboard-content">
          <div className="container">
            {/* Titre */}
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
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#15803d', fontWeight: '600'}}>
                      Sélectionner l'affilié
                    </label>
                    <select
                      value={selectedAffiliate}
                      onChange={(e) => {
                        setSelectedAffiliate(e.target.value);
                        const affiliate = affiliates.find(a => a.id === e.target.value);
                        if (affiliate) {
                          setPaymentAmount(affiliate.pendingAmount.toString());
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '2px solid #16a34a',
                        fontSize: '16px',
                        background: 'white'
                      }}
                    >
                      <option value="">-- Choisir un affilié --</option>
                      {affiliates.filter(a => a.pendingAmount > 0).map(affiliate => (
                        <option key={affiliate.id} value={affiliate.id}>
                          {affiliate.name} ({formatCurrency(affiliate.pendingAmount)} en attente)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#15803d', fontWeight: '600'}}>
                      Montant à payer
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="0.00"
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
                      Crypto utilisée
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
                      <option value="USDT">USDT (Tether)</option>
                      <option value="BTC">BTC (Bitcoin)</option>
                      <option value="ETH">ETH (Ethereum)</option>
                      <option value="LTC">LTC (Litecoin)</option>
                      <option value="DOGE">DOGE (Dogecoin)</option>
                      <option value="TRX">TRX (Tron)</option>
                      <option value="XRP">XRP (Ripple)</option>
                      <option value="BNB">BNB (Binance Coin)</option>
                      <option value="USDC">USDC (USD Coin)</option>
                      <option value="MATIC">MATIC (Polygon)</option>
                      <option value="SOL">SOL (Solana)</option>
                      <option value="ADA">ADA (Cardano)</option>
                      <option value="AVAX">AVAX (Avalanche)</option>
                      <option value="DOT">DOT (Polkadot)</option>
                      <option value="TON">TON (Toncoin)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', color: '#15803d', fontWeight: '600'}}>
                      ID de transaction (optionnel)
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Ex: 0x123..."
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '2px solid #16a34a',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div style={{gridColumn: 'span 2'}}>
                    <label style={{display: 'block', marginBottom: '8px', color: '#15803d', fontWeight: '600'}}>
                      Note (optionnel)
                    </label>
                    <input
                      type="text"
                      value={paymentNote}
                      onChange={(e) => setPaymentNote(e.target.value)}
                      placeholder="Ex: Paiement hebdomadaire semaine 45"
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
                    onClick={() => {
                      setShowNewPayment(false);
                      setSelectedAffiliate('');
                      setPaymentAmount('');
                      setPaymentCrypto('USDT');
                      setPaymentNote('');
                      setTransactionId('');
                    }}
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
            {affiliates.filter(a => a.pendingAmount > 0).length > 0 && (
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
                          {affiliate.name}
                          <span style={{
                            marginLeft: '10px',
                            fontSize: '14px',
                            color: '#64748b',
                            fontWeight: 'normal'
                          }}>
                            ({affiliate.stakeUsername})
                          </span>
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
                        <th style={{padding: '15px', textAlign: 'center', color: '#64748b', fontWeight: '600'}}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '15px', color: '#1a2c38'}}>
                            {formatDate(payment.paidAt)}
                          </td>
                          <td style={{padding: '15px', color: '#1a2c38', fontWeight: '600'}}>
                            {payment.affiliate?.name || 'N/A'}
                          </td>
                          <td style={{padding: '15px', color: '#16a34a', fontWeight: '700'}}>
                            {formatCurrency(payment.amount)}
                          </td>
                          <td style={{padding: '15px'}}>
                            <span style={{
                              background: payment.paymentMethod === 'BTC' ? '#f7931a' : 
                                         payment.paymentMethod === 'ETH' ? '#627eea' :
                                         payment.paymentMethod === 'USDT' ? '#26a17b' :
                                         payment.paymentMethod === 'LTC' ? '#345d9d' :
                                         payment.paymentMethod === 'DOGE' ? '#c2a633' :
                                         payment.paymentMethod === 'TRX' ? '#eb0029' :
                                         payment.paymentMethod === 'XRP' ? '#23292f' :
                                         payment.paymentMethod === 'BNB' ? '#f3ba2f' :
                                         payment.paymentMethod === 'USDC' ? '#2775ca' :
                                         payment.paymentMethod === 'MATIC' ? '#8247e5' :
                                         payment.paymentMethod === 'SOL' ? '#14f195' :
                                         '#4a9eff',
                              color: 'white',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {payment.paymentMethod || 'USDT'}
                            </span>
                          </td>
                          <td style={{padding: '15px', color: '#64748b', fontFamily: 'monospace', fontSize: '14px'}}>
                            {payment.transactionId || '-'}
                          </td>
                          <td style={{padding: '15px', color: '#64748b'}}>
                            {payment.note || '-'}
                          </td>
                          <td style={{padding: '15px', textAlign: 'center'}}>
                            <button
                              onClick={() => handleDeletePayment(payment.id)}
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