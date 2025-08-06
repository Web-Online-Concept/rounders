import Head from "next/head";
import AdminHeader from "../../components/AdminHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminDeclarations() {
  const router = useRouter();
  const [declarations, setDeclarations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    loadDeclarations();
  }, []);

  const loadDeclarations = async () => {
    try {
      const response = await fetch('/api/declarations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setDeclarations(result.data || []);
      } else {
        console.error('Erreur lors du chargement des déclarations');
        setDeclarations([]);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      setDeclarations([]);
      setIsLoading(false);
    }
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

  const getStatusBadge = (status) => {
    const styles = {
      pending: { background: '#fef3c7', color: '#d97706', label: 'En attente' },
      approved: { background: '#dcfce7', color: '#16a34a', label: 'Approuvée' },
      rejected: { background: '#fee2e2', color: '#dc2626', label: 'Rejetée' }
    };
    return styles[status] || styles.pending;
  };

  const filteredDeclarations = declarations.filter(decl => {
    if (filter === 'all') return true;
    return decl.status === filter;
  });

  const handleApprove = async (declarationId) => {
    const pseudo = prompt('Confirmer le pseudo réel de l\'affilié:');
    if (pseudo) {
      try {
        const response = await fetch('/api/declarations', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: JSON.stringify({
            id: declarationId,
            status: 'approved',
            confirmedPseudo: pseudo
          })
        });

        if (response.ok) {
          alert('Déclaration approuvée !');
          await loadDeclarations(); // Recharger les données
        } else {
          alert('Erreur lors de l\'approbation');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'approbation');
      }
    }
  };

  const handleReject = async (declarationId) => {
    const reason = prompt('Raison du rejet:');
    if (reason) {
      try {
        const response = await fetch('/api/declarations', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: JSON.stringify({
            id: declarationId,
            status: 'rejected',
            reviewNotes: reason
          })
        });

        if (response.ok) {
          alert('Déclaration rejetée.');
          await loadDeclarations(); // Recharger les données
        } else {
          alert('Erreur lors du rejet');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors du rejet');
      }
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

  const pendingCount = declarations.filter(d => d.status === 'pending').length;

  return (
    <>
      <Head>
        <title>Gestion des Déclarations - Admin Rounders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="admin-dashboard">
        {/* Header Admin avec stats intégrées */}
        <AdminHeader currentPage="declarations" />

        {/* Contenu principal */}
        <div className="dashboard-content">
          <div className="container">
            {/* Titre de la page */}
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
                Gestion des Déclarations
              </h1>
            </div>

            {/* Notification si des déclarations sont en attente */}
            {pendingCount > 0 && (
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
                <span style={{fontSize: '24px'}}>🔔</span>
                <div>
                  <strong style={{color: '#92400e'}}>
                    {pendingCount} déclaration{pendingCount > 1 ? 's' : ''} en attente
                  </strong>
                  <p style={{margin: '5px 0 0 0', color: '#78350f', fontSize: '14px'}}>
                    Vérifiez les pseudos sur Stake avant d'approuver
                  </p>
                </div>
              </div>
            )}

            {/* Filtres */}
            <div className="filters" style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '30px',
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
            }}>
              <span style={{fontWeight: '600', color: '#64748b'}}>Filtrer:</span>
              <button
                onClick={() => setFilter('all')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: filter === 'all' ? '2px solid #4a9eff' : '2px solid #e5e7eb',
                  background: filter === 'all' ? '#eff6ff' : 'white',
                  color: filter === 'all' ? '#4a9eff' : '#64748b',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Toutes ({declarations.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: filter === 'pending' ? '2px solid #d97706' : '2px solid #e5e7eb',
                  background: filter === 'pending' ? '#fef3c7' : 'white',
                  color: filter === 'pending' ? '#d97706' : '#64748b',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                En attente ({pendingCount})
              </button>
              <button
                onClick={() => setFilter('approved')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: filter === 'approved' ? '2px solid #16a34a' : '2px solid #e5e7eb',
                  background: filter === 'approved' ? '#dcfce7' : 'white',
                  color: filter === 'approved' ? '#16a34a' : '#64748b',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Approuvées ({declarations.filter(d => d.status === 'approved').length})
              </button>
              <button
                onClick={() => setFilter('rejected')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: filter === 'rejected' ? '2px solid #dc2626' : '2px solid #e5e7eb',
                  background: filter === 'rejected' ? '#fee2e2' : 'white',
                  color: filter === 'rejected' ? '#dc2626' : '#64748b',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Rejetées ({declarations.filter(d => d.status === 'rejected').length})
              </button>
            </div>

            {/* Liste des déclarations */}
            {filteredDeclarations.length > 0 ? (
              <div className="declarations-list">
                {filteredDeclarations.map((declaration) => {
                  const statusStyle = getStatusBadge(declaration.status);
                  return (
                    <div key={declaration.id} className="declaration-card" style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '25px',
                      marginBottom: '20px',
                      border: declaration.status === 'pending' ? '2px solid #ffd700' : '1px solid #e5e7eb',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <div style={{flex: 1}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
                            <h3 style={{color: '#1a2c38', fontSize: '20px', margin: 0}}>
                              {declaration.declaredPseudo}
                            </h3>
                            <span style={{
                              ...statusStyle,
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              fontWeight: '600'
                            }}>
                              {statusStyle.label}
                            </span>
                          </div>
                          
                          <div style={{marginBottom: '15px'}}>
                            <p style={{color: '#64748b', margin: '5px 0'}}>
                              <strong>Email:</strong> {declaration.email}
                            </p>
                            <p style={{color: '#64748b', margin: '5px 0'}}>
                              <strong>Date:</strong> {formatDate(declaration.createdAt)}
                            </p>
                            {declaration.message && (
                              <p style={{color: '#64748b', margin: '10px 0', fontStyle: 'italic'}}>
                                <strong>Message:</strong> "{declaration.message}"
                              </p>
                            )}
                            {declaration.confirmedPseudo && (
                              <p style={{color: '#16a34a', margin: '10px 0'}}>
                                <strong>Pseudo confirmé:</strong> {declaration.confirmedPseudo}
                              </p>
                            )}
                            {declaration.reviewNotes && (
                              <p style={{color: '#dc2626', margin: '10px 0'}}>
                                <strong>Raison du rejet:</strong> {declaration.reviewNotes}
                              </p>
                            )}
                            {declaration.affiliate && (
                              <p style={{color: '#4a9eff', margin: '10px 0'}}>
                                <strong>Lié à l'affilié:</strong> {declaration.affiliate.pseudoReal || declaration.affiliate.pseudoMasked}
                              </p>
                            )}
                          </div>
                        </div>

                        {declaration.status === 'pending' && (
                          <div style={{display: 'flex', gap: '10px'}}>
                            <button
                              onClick={() => handleApprove(declaration.id)}
                              style={{
                                background: '#16a34a',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(22, 163, 74, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              ✓ Approuver
                            </button>
                            <button
                              onClick={() => handleReject(declaration.id)}
                              style={{
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              ✗ Rejeter
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '60px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{fontSize: '48px', marginBottom: '20px'}}>📋</div>
                <p style={{fontSize: '18px', color: '#64748b', marginBottom: '10px'}}>
                  Aucune déclaration pour le moment
                </p>
                <p style={{fontSize: '14px', color: '#94a3b8'}}>
                  Les nouvelles déclarations d'affiliés apparaîtront ici
                </p>
              </div>
            )}
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

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
            align-items: stretch !important;
          }

          .filters button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}