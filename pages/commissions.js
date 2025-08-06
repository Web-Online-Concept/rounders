import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import SEOHead from "../components/SEOHead";

export default function CommissionsPage() {
  const { t } = useTranslation();
  const [affiliates, setAffiliates] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger les affiliés depuis l'API Neon
      const affiliatesResponse = await fetch('/api/affiliates');
      
      if (affiliatesResponse.ok) {
        const affiliatesResult = await affiliatesResponse.json();
        const affiliatesData = affiliatesResult.data || [];
        
        // Charger les paiements depuis l'API Neon
        const paymentsResponse = await fetch('/api/payments');
        const paymentsResult = paymentsResponse.ok ? await paymentsResponse.json() : { data: [] };
        const paymentsData = paymentsResult.data || [];
        
        // Transformer les données pour le format de la page
        const transformedData = affiliatesData.map(aff => {
          // Récupérer les paiements de cet affilié
          const affiliatePayments = paymentsData
            .filter(p => p.affiliateId === aff.id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3) // Les 3 derniers paiements
            .map(p => ({
              date: new Date(p.createdAt).toLocaleDateString('fr-FR'),
              type: p.crypto || 'USDT',
              amount: p.amount
            }));
          
          return {
            id: aff.id,
            pseudo: aff.pseudoMasked, // Toujours masqué sur la page publique
            totalBet: aff.totalBet || 0,
            totalCommission: aff.totalCommission || 0,
            paidCommission: aff.paidAmount || 0,
            pendingCommission: aff.pendingAmount || 0,
            paymentHistory: affiliatePayments,
            lastUpdate: aff.lastUpdate || null,
            joinDate: aff.registrationDate || null
          };
        });
        
        setAffiliates(transformedData);
      } else {
        console.error('Erreur lors du chargement des données');
        setAffiliates([]);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setAffiliates([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <>
      <SEOHead 
        title={`${t.commissions.meta.title} | Rounders`}
        description={t.commissions.meta.description}
      />

      <main className="commissions-page">
        {/* Hero Section */}
        <section className="hero-section" style={{
          minHeight: '400px',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a2c38 0%, #2d4356 100%)'
        }}>
          <div className="hero-content">
            <h1 className="hero-title" style={{color: 'white'}} dangerouslySetInnerHTML={{ 
              __html: `${t.commissions.hero.title} <span class="highlight">${t.commissions.hero.highlight}</span>` 
            }} />
            <p className="hero-subtitle" style={{color: '#cbd5e1'}}>
              {t.commissions.hero.subtitle}
            </p>
            
            <div style={{marginTop: '30px', textAlign: 'center'}}>
              <p style={{color: '#94a3b8', fontSize: '18px', marginBottom: '15px'}}>
                {t.commissions.hero.notReceiving}
              </p>
              <Link href="/declaration" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%)',
                color: 'white',
                padding: '14px 30px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(74, 158, 255, 0.3)',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(74, 158, 255, 0.4)';
                e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(74, 158, 255, 0.3)';
                e.currentTarget.style.border = '2px solid transparent';
              }}>
                {t.commissions.hero.declare}
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats globales */}
        <section className="section-wrapper" style={{
          paddingTop: '30px', 
          paddingBottom: '30px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%)'
        }}>
          <div className="section-container">
            <div className="global-stats">
              <div className="stat-card" style={{
                padding: '18px 20px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div className="stat-icon" style={{fontSize: '28px'}}>👥</div>
                <div className="stat-content">
                  <h3 style={{
                    fontSize: '12px',
                    marginBottom: '4px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>{t.commissions.stats.activeAffiliates}</h3>
                  <p className="stat-value" style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1a2c38',
                    margin: 0
                  }}>{affiliates.length}</p>
                </div>
              </div>
              <div className="stat-card" style={{
                padding: '18px 20px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div className="stat-icon" style={{fontSize: '28px'}}>💰</div>
                <div className="stat-content">
                  <h3 style={{
                    fontSize: '12px',
                    marginBottom: '4px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>{t.commissions.stats.totalCommissions}</h3>
                  <p className="stat-value" style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1a2c38',
                    margin: 0
                  }}>
                    {formatCurrency(affiliates.reduce((sum, aff) => sum + aff.totalCommission, 0))}
                  </p>
                </div>
              </div>
              <div className="stat-card" style={{
                padding: '18px 20px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div className="stat-icon" style={{fontSize: '28px'}}>✅</div>
                <div className="stat-content">
                  <h3 style={{
                    fontSize: '12px',
                    marginBottom: '4px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>{t.commissions.stats.totalPaid}</h3>
                  <p className="stat-value" style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#16a34a',
                    margin: 0
                  }}>
                    {formatCurrency(affiliates.reduce((sum, aff) => sum + aff.paidCommission, 0))}
                  </p>
                </div>
              </div>
              <div className="stat-card" style={{
                padding: '18px 20px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div className="stat-icon" style={{fontSize: '28px'}}>⏳</div>
                <div className="stat-content">
                  <h3 style={{
                    fontSize: '12px',
                    marginBottom: '4px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>{t.commissions.stats.pending}</h3>
                  <p className="stat-value" style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#f59e0b',
                    margin: 0
                  }}>
                    {formatCurrency(affiliates.reduce((sum, aff) => sum + aff.pendingCommission, 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
<section className="section-wrapper dark-bg" style={{paddingTop: '30px'}}>
          <div className="section-container">
            <h2 className="section-title" style={{
              marginTop: 0,
              marginBottom: '30px'
            }}>{t.commissions.table.title}</h2>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>{t.commissions.table.loading || "Chargement des données..."}</p>
              </div>
            ) : (
              <div className="affiliates-list">
                {affiliates
                  .sort((a, b) => b.totalBet - a.totalBet) // Tri par total misé décroissant
                  .map((affiliate) => (
                  <div key={affiliate.id} className="affiliate-item">
                    <div 
                      className="affiliate-header"
                      onClick={() => toggleExpand(affiliate.id)}
                    >
                      <div className="affiliate-main-info">
                        <div className="affiliate-identity">
                          <h3 className="masked">
                            {affiliate.pseudo}  {/* TOUJOURS afficher le pseudo masqué */}
                          </h3>
                          {affiliate.joinDate && (
                            <span style={{
                              color: '#ffffff',
                              fontStyle: 'italic',
                              fontSize: '14px',
                              marginLeft: '10px',
                              opacity: 0.9
                            }}>
                              ({t.commissions.table.since} {new Date(affiliate.joinDate).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })})
                            </span>
                          )}
                          <span style={{
                            marginLeft: 'auto',
                            fontSize: '11px',
                            color: '#ffffff',
                            fontWeight: '500',
                            marginRight: '15px'
                          }}>
                            📅 {t.commissions.table.lastUpdate} : {affiliate.lastUpdate ? new Date(affiliate.lastUpdate).toLocaleString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'N/A'}
                          </span>
                        </div>
                        <div className="affiliate-stats">
                          <div className="stat">
                            <span className="stat-label">{t.commissions.table.totalBet}</span>
                            <span className="stat-value">{formatCurrency(affiliate.totalBet)}</span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">{t.commissions.table.totalCommission}</span>
                            <span className="stat-value">{formatCurrency(affiliate.totalCommission)}</span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">{t.commissions.table.paid}</span>
                            <span className="stat-value paid">{formatCurrency(affiliate.paidCommission)}</span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">{t.commissions.table.pending}</span>
                            <span className="stat-value pending">{formatCurrency(affiliate.pendingCommission)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="expand-icon">
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          style={{
                            transform: expandedId === affiliate.id ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>

                    {expandedId === affiliate.id && (
                      <div className="affiliate-details">
                        {affiliate.paymentHistory && affiliate.paymentHistory.length > 0 ? (
                          <div className="payment-history">
                            <h4>{t.commissions.table.lastPayments}</h4>
                            <div className="history-list">
                              {affiliate.paymentHistory.map((payment, index) => (
                                <div key={index} className="history-item">
                                  <span className="history-date">📅 {payment.date}</span>
                                  <span className="history-type">
                                    <span style={{
                                      background: payment.type === 'BTC' ? '#f7931a' : 
                                                 payment.type === 'ETH' ? '#627eea' :
                                                 payment.type === 'USDT' ? '#26a17b' : '#4a9eff',
                                      color: 'white',
                                      padding: '4px 10px',
                                      borderRadius: '6px',
                                      fontSize: '12px',
                                      fontWeight: '600'
                                    }}>
                                      {payment.type}
                                    </span>
                                  </span>
                                  <span className="history-amount">{formatCurrency(payment.amount)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            textAlign: 'center',
                            padding: '30px',
                            color: '#94a3b8'
                          }}>
                            <p>{t.commissions.table.noPayments}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
<style jsx>{`
        .commissions-page {
          min-height: 100vh;
          background: #ffffff;
        }

        .global-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 0;
        }

        .stat-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          border: 2px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          font-size: 48px;
          line-height: 1;
        }

        .stat-content h3 {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #1a2c38;
          margin: 0;
        }

        .loading {
          text-align: center;
          padding: 60px;
          color: #94a3b8;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #4a9eff;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .affiliates-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .affiliate-item {
          background: linear-gradient(135deg, #2d4356 0%, #1a2c38 100%);
          border-radius: 16px;
          border: 2px solid rgba(74, 158, 255, 0.2);
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .affiliate-item:hover {
          border-color: rgba(74, 158, 255, 0.4);
          box-shadow: 0 6px 25px rgba(74, 158, 255, 0.3);
          transform: translateY(-2px);
        }

        .affiliate-header {
          padding: 25px 30px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s ease;
        }

        .affiliate-header:hover {
          background: rgba(74, 158, 255, 0.05);
        }

        .affiliate-main-info {
          flex: 1;
        }

        .affiliate-identity {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          width: 100%;
        }

        .affiliate-identity h3 {
          font-size: 20px;
          margin: 0;
          color: #60a5fa;
          display: flex;
          align-items: center;
          gap: 8px;
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }

        .affiliate-identity h3.masked {
          color: #60a5fa;
          font-style: italic;
        }

        .verified-badge {
          background: #00d632;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .vip-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #1a2c38;
        }

        .affiliate-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 13px;
          color: #94a3b8;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: white;
        }

        .stat-value.paid {
          color: #00d632;
        }

        .stat-value.pending {
          color: #ffd700;
        }

        .expand-icon {
          color: #94a3b8;
        }

        .affiliate-details {
          padding: 20px 30px 30px 30px;
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(74, 158, 255, 0.2);
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 20px 0;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-size: 13px;
          color: #94a3b8;
        }

        .detail-value {
          font-size: 16px;
          color: white;
          font-weight: 600;
        }

        .payment-history {
          margin-top: 0;
        }

        .payment-history h4 {
          color: white;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 18px;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .history-item {
          display: grid;
          grid-template-columns: 120px 1fr auto;
          gap: 20px;
          padding: 15px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          align-items: center;
        }

        .history-date {
          color: #94a3b8;
          font-size: 14px;
        }

        .history-type {
          color: white;
          font-size: 14px;
        }

        .history-amount {
          color: #00d632;
          font-weight: 700;
          font-size: 16px;
        }

        .confirmation-notice {
          background: rgba(255, 204, 0, 0.1);
          border: 1px solid rgba(255, 204, 0, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
        }

        .confirmation-notice p {
          color: #ffd700;
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
        }

        .process-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .process-card {
          background: #f8fafc;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid #e5e7eb;
          position: relative;
        }

        .process-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: #4a9eff;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
        }

        .process-card h3 {
          color: #1a2c38;
          margin: 20px 0 15px;
          font-size: 20px;
        }

        .process-card p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .declaration-cta {
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          padding: 80px 20px;
          text-align: center;
          margin-top: 60px;
        }

        .declaration-cta .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .declaration-cta h2 {
          color: white;
          font-size: 36px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .declaration-cta p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 20px;
          margin-bottom: 30px;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #4a9eff;
          padding: 16px 40px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .affiliate-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .history-item {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .declaration-cta h2 {
            font-size: 28px;
          }

          .declaration-cta p {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}	  