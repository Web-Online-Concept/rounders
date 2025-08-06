import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AdminHeader({ currentPage }) {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalAffiliates: 0,
    confirmedAffiliates: 0,
    pendingDeclarations: 0,
    totalCommissions: 0,
    totalPaid: 0,
    unpaidCommissions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalAffiliates: data.totalAffiliates,
          confirmedAffiliates: data.confirmedAffiliates,
          pendingDeclarations: data.pendingDeclarations,
          totalCommissions: data.totalCommissions,
          totalPaid: data.totalPaid,
          unpaidCommissions: data.totalPending // unpaidCommissions = totalPending
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      {/* Header avec titre et stats sur la même ligne */}
      <header style={{
        background: 'linear-gradient(135deg, #1a2c38 0%, #2d4356 100%)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          padding: '20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '30px'
          }}>
            {/* Titre à gauche */}
            <h1 style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: '800',
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              Administration Rounders
            </h1>

            {/* Stats au centre */}
            <div style={{
              display: 'flex',
              gap: '25px',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {/* Affiliés */}
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{fontSize: '18px'}}>👥</span>
                <div>
                  <div style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                    Affiliés
                  </div>
                  <div style={{color: 'white', fontSize: '14px', fontWeight: '700'}}>
                    {loading ? '...' : `${stats.confirmedAffiliates}/${stats.totalAffiliates}`}
                  </div>
                </div>
              </div>

              {/* Déclarations en attente */}
              {stats.pendingDeclarations > 0 && (
                <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                  <span style={{fontSize: '18px'}}>⏳</span>
                  <div>
                    <div style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      Attente
                    </div>
                    <div style={{color: '#ffd700', fontSize: '14px', fontWeight: '700'}}>
                      {stats.pendingDeclarations}
                    </div>
                  </div>
                </div>
              )}

              {/* Séparateur */}
              <div style={{
                width: '1px',
                height: '30px',
                background: 'rgba(255, 255, 255, 0.2)'
              }}></div>

              {/* Total Commission */}
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{fontSize: '18px'}}>💰</span>
                <div>
                  <div style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                    Total
                  </div>
                  <div style={{color: 'white', fontSize: '14px', fontWeight: '700'}}>
                    {loading ? '...' : formatCurrency(stats.totalCommissions)}
                  </div>
                </div>
              </div>

              {/* Déjà Payé (inversé) */}
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{fontSize: '18px'}}>✅</span>
                <div>
                  <div style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                    Payé
                  </div>
                  <div style={{color: '#4ade80', fontSize: '14px', fontWeight: '700'}}>
                    {loading ? '...' : formatCurrency(stats.totalPaid)}
                  </div>
                </div>
              </div>

              {/* À Payer (inversé) */}
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{fontSize: '18px'}}>💸</span>
                <div>
                  <div style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                    À Payer
                  </div>
                  <div style={{color: '#ff6b6b', fontSize: '14px', fontWeight: '700'}}>
                    {loading ? '...' : formatCurrency(stats.unpaidCommissions)}
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton déconnexion à droite */}
            <button 
              onClick={handleLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'linear-gradient(to bottom, white, #f8fafc)',
        borderBottom: '2px solid #e5e7eb',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link href="/admin/declarations" style={{
            padding: '15px 30px',
            color: currentPage === 'declarations' ? 'white' : '#64748b',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            background: currentPage === 'declarations' 
              ? 'linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%)' 
              : 'white',
            border: '2px solid ' + (currentPage === 'declarations' ? 'transparent' : '#e5e7eb'),
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: currentPage === 'declarations'
              ? '0 6px 20px rgba(74, 158, 255, 0.35)'
              : '0 2px 8px rgba(0, 0, 0, 0.05)',
            transform: currentPage === 'declarations' ? 'translateY(-2px)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            <span style={{fontSize: '24px'}}>📝</span>
            <span>Déclarations</span>
            {stats.pendingDeclarations > 0 && (
              <span style={{
                background: '#ff6b6b',
                color: 'white',
                borderRadius: '10px',
                padding: '2px 8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {stats.pendingDeclarations}
              </span>
            )}
          </Link>
          <Link href="/admin/affiliates" style={{
            padding: '15px 30px',
            color: currentPage === 'affiliates' ? 'white' : '#64748b',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            background: currentPage === 'affiliates' 
              ? 'linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%)' 
              : 'white',
            border: '2px solid ' + (currentPage === 'affiliates' ? 'transparent' : '#e5e7eb'),
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: currentPage === 'affiliates'
              ? '0 6px 20px rgba(74, 158, 255, 0.35)'
              : '0 2px 8px rgba(0, 0, 0, 0.05)',
            transform: currentPage === 'affiliates' ? 'translateY(-2px)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            <span style={{fontSize: '24px'}}>👥</span>
            <span>Affiliés & Commissions</span>
          </Link>
          <Link href="/admin/payments" style={{
            padding: '15px 30px',
            color: currentPage === 'payments' ? 'white' : '#64748b',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            background: currentPage === 'payments' 
              ? 'linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%)' 
              : 'white',
            border: '2px solid ' + (currentPage === 'payments' ? 'transparent' : '#e5e7eb'),
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: currentPage === 'payments'
              ? '0 6px 20px rgba(74, 158, 255, 0.35)'
              : '0 2px 8px rgba(0, 0, 0, 0.05)',
            transform: currentPage === 'payments' ? 'translateY(-2px)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            <span style={{fontSize: '24px'}}>💳</span>
            <span>Paiements</span>
          </Link>
        </div>
      </nav>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1200px) {
          .header-stats {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </>
  );
}