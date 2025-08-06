import Head from "next/head";
import AdminHeader from "../../components/AdminHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminAffiliates() {
  const router = useRouter();
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCalculModal, setShowCalculModal] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [newValues, setNewValues] = useState({ totalBet: '', totalCommission: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAffiliate, setNewAffiliate] = useState({
    pseudoMasked: '',
    pseudoReal: '',
    email: '',
    totalBet: 0,
    totalCommission: 0,
    joinDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    loadAffiliates();
  }, []);

  // Charger les affiliés depuis l'API Neon
  const loadAffiliates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/affiliates', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAffiliates(data.data || []);
      } else {
        console.error('Erreur lors du chargement des affiliés');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Calculer les commissions
  const openCalculModal = (affiliate) => {
    setSelectedAffiliate(affiliate);
    setNewValues({
      totalBet: affiliate.totalBet?.toString() || '0',
      totalCommission: affiliate.totalCommission?.toString() || '0'
    });
    setShowCalculModal(true);
  };

  const handleCalculateCommission = async () => {
    if (!selectedAffiliate) return;

    const newTotalBet = parseFloat(newValues.totalBet) || 0;
    const newTotalCommission = parseFloat(newValues.totalCommission) || 0;
    
    try {
      const response = await fetch(`/api/affiliates/${selectedAffiliate.id}/commission`, {
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
        setSelectedAffiliate(null);
        setNewValues({ totalBet: '', totalCommission: '' });
        loadAffiliates(); // Recharger la liste
      } else {
        alert('Erreur lors du calcul');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du calcul de la commission');
    }
  };

  // Supprimer un affilié
  const handleDelete = async (id) => {
    const affiliate = affiliates.find(a => a.id === id);
    const message = `Êtes-vous sûr de vouloir supprimer l'affilié ${affiliate.pseudoReal || affiliate.pseudoMasked} ?
    
    ⚠️ Cette action est irréversible !
    
    Montant en attente : ${formatCurrency(affiliate.pendingAmount || 0)}
    Total payé : ${formatCurrency(affiliate.paidAmount || 0)}`;
    
    if (confirm(message)) {
      try {
        const response = await fetch(`/api/affiliates/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (response.ok) {
          alert('Affilié supprimé avec succès');
          loadAffiliates(); // Recharger la liste
        } else {
          alert('Erreur lors de la suppression');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  // Ajouter un nouvel affilié
  const handleAddAffiliate = async () => {
    if (!newAffiliate.pseudoMasked) {
      alert('Le pseudo masqué est obligatoire !');
      return;
    }

    try {
      const response = await fetch('/api/affiliates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          pseudoMasked: newAffiliate.pseudoMasked,
          pseudoReal: newAffiliate.pseudoReal || '',
          email: newAffiliate.email || '',
          totalBet: parseFloat(newAffiliate.totalBet) || 0,
          totalCommission: parseFloat(newAffiliate.totalCommission) || 0,
          registrationDate: newAffiliate.joinDate
        })
      });

      if (response.ok) {
        alert('Affilié ajouté avec succès !');
        
        // Réinitialiser le formulaire
        setNewAffiliate({
          pseudoMasked: '',
          pseudoReal: '',
          email: '',
          totalBet: 0,
          totalCommission: 0,
          joinDate: new Date().toISOString().split('T')[0]
        });
        
        setShowAddModal(false);
        loadAffiliates(); // Recharger la liste
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.message || 'Impossible d\'ajouter l\'affilié'}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout de l\'affilié');
    }
  };

  // Enregistrer un paiement
  const handlePayment = async (affiliateId) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    
    if (confirm(`Confirmer le paiement de ${formatCurrency(affiliate.pendingAmount || 0)} pour ${affiliate.pseudoReal || affiliate.pseudoMasked} ?`)) {
      try {
        const response = await fetch(`/api/affiliates/${affiliateId}/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: JSON.stringify({
            amount: affiliate.pendingAmount || 0,
            crypto: 'USDT'
          })
        });

        if (response.ok) {
          alert(`✅ Paiement de ${formatCurrency(affiliate.pendingAmount || 0)} enregistré !`);
          loadAffiliates(); // Recharger la liste
        } else {
          alert('Erreur lors de l\'enregistrement du paiement');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors du paiement');
      }
    }
  };

  const filteredAffiliates = affiliates.filter(aff => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (aff.pseudoMasked?.toLowerCase().includes(searchLower) || false) ||
      (aff.pseudoReal?.toLowerCase().includes(searchLower) || false)
    );
  });

  // Trier les affiliés par montant en attente décroissant
  const sortedAffiliates = [...filteredAffiliates].sort((a, b) => {
    return (b.pendingAmount || 0) - (a.pendingAmount || 0);
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Connexion à la base de données Neon...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Gestion des Affiliés - Admin Rounders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="admin-dashboard">
        <AdminHeader currentPage="affiliates" />

        <div className="dashboard-content">
          <div className="container">
            <h1 style={{
              fontSize: '24px',
              color: '#1a2c38',
              marginBottom: '25px',
              fontWeight: '700'
            }}>
              Gestion des Affiliés & Commissions
            </h1>

            <div className="actions-bar">
              <input
                type="text"
                placeholder="🔍 Rechercher un affilié..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button 
                onClick={() => setShowAddModal(true)}
                style={{
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(74, 158, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                ➕ Ajouter un affilié
              </button>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '2px solid #f59e0b',
              borderRadius: '12px',
              padding: '15px 20px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <span style={{fontSize: '24px'}}>💡</span>
              <div>
                <strong style={{color: '#92400e'}}>Calcul automatique des commissions :</strong>
                <p style={{margin: '5px 0 0 0', color: '#78350f', fontSize: '14px'}}>
                  Cliquez sur 🧮 pour calculer les nouvelles commissions d'un affilié. 
                  Le système calculera automatiquement la différence et la part de 50% à reverser.
                </p>
              </div>
            </div>

            <div className="affiliates-list">
              {sortedAffiliates.map((affiliate) => (
                <div key={affiliate.id} className="affiliate-card">
                  <div className="affiliate-main">
                    <div className="affiliate-identity">
                      <div className="pseudo-container">
                        <div className="pseudo-masked">{affiliate.pseudoMasked}</div>
                        {affiliate.pseudoReal && (
                          <div className="pseudo-real">{affiliate.pseudoReal}</div>
                        )}
                      </div>
                      <div className="affiliate-meta">
                        {affiliate.registrationDate && (
                          <span className="affiliate-date">
                            Depuis le {formatDate(affiliate.registrationDate)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="affiliate-numbers">
                      <div className="stat-group">
                        <div className="stat-compact">
                          <span className="stat-label">Misé</span>
                          <span className="stat-value">{formatCurrency(affiliate.totalBet || 0)}</span>
                        </div>
                        <div className="stat-compact">
                          <span className="stat-label">Commission</span>
                          <span className="stat-value amount-commission">{formatCurrency(affiliate.totalCommission || 0)}</span>
                        </div>
                      </div>
                      <div className="stat-group">
                        <div className="stat-compact">
                          <span className="stat-label">Payé</span>
                          <span className="stat-value amount-paid">{formatCurrency(affiliate.paidAmount || 0)}</span>
                        </div>
                        <div className="stat-compact">
                          <span className="stat-label">En attente</span>
                          <span className="stat-value amount-pending">{formatCurrency(affiliate.pendingAmount || 0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="affiliate-actions-wrapper">
                      <div className="affiliate-actions-container">
                        <button
                          onClick={() => openCalculModal(affiliate)}
                          className="action-primary"
                          title="Calculer la commission"
                        >
                          🧮 Calculer
                        </button>
                        {affiliate.pendingAmount > 0 && (
                          <button
                            onClick={() => handlePayment(affiliate.id)}
                            className="action-pay"
                            title="Marquer comme payé"
                          >
                            💰 Payer
                          </button>
                        )}
                        <div className="action-group">
                          <button
                            onClick={() => router.push(`/admin/affiliate-detail?id=${affiliate.id}`)}
                            className="action-icon"
                            title="Voir les détails"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleDelete(affiliate.id)}
                            className="action-icon action-danger"
                            title="Supprimer"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="last-payment-info">
                        <span style={{fontSize: '11px', color: '#FFFFFF'}}>
                          Dernier paiement : {affiliate.lastPaymentDate ? formatDate(affiliate.lastPaymentDate) : 'Aucun'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showCalculModal && selectedAffiliate && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <h2 style={{marginTop: 0, color: '#1a2c38'}}>
                🧮 Calculer les commissions
              </h2>
              <p style={{color: '#64748b', marginBottom: '20px'}}>
                Affilié : <strong>{selectedAffiliate?.pseudoReal || selectedAffiliate?.pseudoMasked}</strong>
              </p>

              <div style={{marginBottom: '20px'}}>
                <h4 style={{color: '#1a2c38', marginBottom: '10px'}}>Valeurs actuelles :</h4>
                <div style={{
                  background: '#f8fafc',
                  padding: '15px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}>
                  <div>Total misé : <strong>{formatCurrency(selectedAffiliate?.totalBet || 0)}</strong></div>
                  <div>Commission totale : <strong>{formatCurrency(selectedAffiliate?.totalCommission || 0)}</strong></div>
                  <div>Dernière commission enregistrée : <strong>{formatCurrency(selectedAffiliate?.lastTotalCommission || 0)}</strong></div>
                  <div>Montant en attente actuel : <strong>{formatCurrency(selectedAffiliate?.pendingAmount || 0)}</strong></div>
                </div>
              </div>

              <div style={{marginBottom: '20px'}}>
                <h4 style={{color: '#1a2c38', marginBottom: '10px'}}>Nouvelles valeurs (depuis Stake) :</h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <input
                    type="number"
                    value={newValues.totalBet}
                    onChange={(e) => setNewValues({...newValues, totalBet: e.target.value})}
                    placeholder="Nouveau total misé"
                    style={{
                      padding: '10px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  <input
                    type="number"
                    value={newValues.totalCommission}
                    onChange={(e) => setNewValues({...newValues, totalCommission: e.target.value})}
                    placeholder="Nouvelle commission totale"
                    style={{
                      padding: '10px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              {newValues.totalCommission && (
                <div style={{
                  background: '#dcfce7',
                  border: '2px solid #16a34a',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{color: '#16a34a', marginTop: 0}}>
                    📊 Calcul en temps réel :
                  </h4>
                  <div style={{fontSize: '14px', color: '#15803d'}}>
                    <div>Ancienne commission : <strong>{formatCurrency(selectedAffiliate?.lastTotalCommission || 0)}</strong></div>
                    <div>Nouvelle commission : <strong>{formatCurrency(parseFloat(newValues.totalCommission) || 0)}</strong></div>
                    <div style={{borderTop: '1px solid #16a34a', marginTop: '8px', paddingTop: '8px'}}>
                      Différence : <strong>{formatCurrency((parseFloat(newValues.totalCommission) || 0) - (selectedAffiliate?.lastTotalCommission || 0))}</strong>
                    </div>
                    <div style={{fontSize: '16px', fontWeight: 'bold', marginTop: '8px', color: '#16a34a'}}>
                      Part affilié (50%) : {formatCurrency(((parseFloat(newValues.totalCommission) || 0) - (selectedAffiliate?.lastTotalCommission || 0)) / 2)}
                    </div>
                    <div style={{marginTop: '8px', padding: '8px', background: '#fef3c7', borderRadius: '6px', color: '#92400e'}}>
                      💰 Nouveau total en attente : {formatCurrency((selectedAffiliate?.pendingAmount || 0) + ((parseFloat(newValues.totalCommission) || 0) - (selectedAffiliate?.lastTotalCommission || 0)) / 2)}
                    </div>
                  </div>
                </div>
              )}

              <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                <button
                  onClick={() => {
                    setShowCalculModal(false);
                    setSelectedAffiliate(null);
                    setNewValues({ totalBet: '', totalCommission: '' });
                  }}
                  style={{
                    padding: '10px 20px',
                    background: '#e5e7eb',
                    color: '#1a2c38',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={handleCalculateCommission}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)'
                  }}
                >
                  Valider et calculer
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <h2 style={{marginTop: 0, color: '#1a2c38'}}>
                ➕ Ajouter un nouvel affilié
              </h2>
              
              <div style={{
                background: '#fff3cd',
                border: '1px solid #ffc107',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#856404'
              }}>
                <strong>📌 Note importante :</strong> Les valeurs "Total misé" et "Commission totale" servent de point de départ. 
                L'affilié ne pourra prétendre qu'aux commissions générées APRÈS son ajout dans le système.
                Ces montants représentent ses statistiques actuelles sur Stake et serviront de base pour calculer les futures différences.
              </div>

              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', color: '#1a2c38', fontWeight: '600'}}>
                  Pseudo masqué * (tel qu'affiché sur Stake)
                </label>
                <input
                  type="text"
                  value={newAffiliate.pseudoMasked}
                  onChange={(e) => setNewAffiliate({...newAffiliate, pseudoMasked: e.target.value})}
                  placeholder="Ex: ************S10"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', color: '#1a2c38', fontWeight: '600'}}>
                  Pseudo réel (optionnel - confirmé par l'affilié)
                </label>
                <input
                  type="text"
                  value={newAffiliate.pseudoReal}
                  onChange={(e) => setNewAffiliate({...newAffiliate, pseudoReal: e.target.value})}
                  placeholder="Ex: CryptoKing"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', color: '#1a2c38', fontWeight: '600'}}>
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  value={newAffiliate.email}
                  onChange={(e) => setNewAffiliate({...newAffiliate, email: e.target.value})}
                  placeholder="Ex: affiliate@email.com"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', color: '#1a2c38', fontWeight: '600'}}>
                  Date d'affiliation * (depuis quand il utilise votre code)
                </label>
                <input
                  type="date"
                  value={newAffiliate.joinDate}
                  onChange={(e) => setNewAffiliate({...newAffiliate, joinDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', color: '#1a2c38', fontWeight: '600'}}>
                    Total misé actuel (€)
                  </label>
                  <input
                    type="number"
                    value={newAffiliate.totalBet}
                    onChange={(e) => setNewAffiliate({...newAffiliate, totalBet: e.target.value})}
                    placeholder="0"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  <small style={{color: '#6b7280', fontSize: '12px', marginTop: '4px', display: 'block'}}>
                    Montant total misé sur Stake
                  </small>
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', color: '#1a2c38', fontWeight: '600'}}>
                    Commission totale (€)
                  </label>
                  <input
                    type="number"
                    value={newAffiliate.totalCommission}
                    onChange={(e) => setNewAffiliate({...newAffiliate, totalCommission: e.target.value})}
                    placeholder="0"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  <small style={{color: '#6b7280', fontSize: '12px', marginTop: '4px', display: 'block'}}>
                    Commission totale générée à ce jour
                  </small>
                </div>
              </div>

              <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewAffiliate({
                      pseudoMasked: '',
                      pseudoReal: '',
                      email: '',
                      totalBet: 0,
                      totalCommission: 0,
                      joinDate: new Date().toISOString().split('T')[0]
                    });
                  }}
                  style={{
                    padding: '10px 20px',
                    background: '#e5e7eb',
                    color: '#1a2c38',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddAffiliate}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(74, 158, 255, 0.3)'
                  }}
                >
                  Ajouter l'affilié
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
          max-width: 1400px;
          margin: 0 auto;
        }

        .actions-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 20px;
        }

        .search-input {
          flex: 1;
          max-width: 400px;
          padding: 12px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #4a9eff;
          box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
        }

        .affiliates-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .affiliate-card {
          background: linear-gradient(135deg, #2d4356 0%, #1a2c38 100%);
          border-radius: 16px;
          border: 2px solid rgba(74, 158, 255, 0.2);
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .affiliate-card:hover {
          border-color: rgba(74, 158, 255, 0.4);
          box-shadow: 0 6px 25px rgba(74, 158, 255, 0.3);
          transform: translateY(-2px);
        }

        .affiliate-main {
          display: grid;
          grid-template-columns: 1fr 2fr 200px;
          gap: 30px;
          align-items: center;
        }

        .affiliate-identity {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pseudo-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pseudo-masked {
          color: #94d3ff;
          font-family: monospace;
          font-size: 13px;
          opacity: 0.8;
        }

        .pseudo-real {
          color: #ffffff;
          font-weight: 600;
          font-size: 18px;
        }

        .affiliate-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .affiliate-date {
          color: #94a3b8;
          font-size: 12px;
          font-style: italic;
        }

        .affiliate-numbers {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .stat-group {
          display: flex;
          gap: 30px;
        }

        .stat-compact {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-label {
          font-size: 12px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 16px;
          font-weight: 700;
          color: white;
        }

        .amount-commission {
          color: #60a5fa;
        }

        .amount-paid {
          color: #4ade80;
        }

        .amount-pending {
          color: #ffd700;
        }

        .affiliate-actions-container {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: flex-end;
        }

        .action-primary {
          padding: 8px 16px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .action-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }

        .action-pay {
          padding: 8px 16px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .action-pay:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        .action-group {
          display: flex;
          gap: 6px;
          padding-left: 10px;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-icon:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .action-danger:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ef4444;
        }

        .quick-pay-btn {
          display: none;
        }

        @media (max-width: 1200px) {
          .affiliate-main {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .affiliate-numbers {
            grid-template-columns: repeat(4, 1fr);
          }

          .stat-group {
            flex-direction: column;
            gap: 10px;
          }

          .affiliate-actions-container {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .actions-bar {
            flex-direction: column;
          }

          .search-input {
            max-width: 100%;
          }

          .affiliate-numbers {
            grid-template-columns: repeat(2, 1fr);
          }

          .affiliate-actions-container {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}