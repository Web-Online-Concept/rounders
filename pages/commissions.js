import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import SEOHead from "../components/SEOHead";

export default function CommissionsPage() {
  const { t } = useTranslation();
  const [affiliates, setAffiliates] = useState([]);
  const [stats, setStats] = useState({
    totalAffiliates: 0,
    totalCommission: 0,
    totalBet: 0,
    totalPending: 0,
    totalPaid: 0,
    lastUpdate: null
  });
  const [loading, setLoading] = useState(true);
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/affiliates/public');
      
      if (response.ok) {
        const result = await response.json();
        const affiliatesData = result.data || [];
        
        setAffiliates(affiliatesData.map(aff => ({
          id: aff.id,
          username: aff.pseudoMasked || '***',
          commission: aff.totalCommission || 0,
          totalBet: aff.totalBet || 0,
          pending: aff.pendingAmount || 0,
          paid: aff.paidAmount || 0,
          joinedAt: aff.registrationDate || aff.createdAt,
          lastUpdate: aff.lastUpdate || null
        })));
        
        setStats({
          totalAffiliates: affiliatesData.length,
          totalCommission: affiliatesData.reduce((sum, aff) => sum + (aff.totalCommission || 0), 0),
          totalBet: affiliatesData.reduce((sum, aff) => sum + (aff.totalBet || 0), 0),
          totalPending: affiliatesData.reduce((sum, aff) => sum + (aff.pendingAmount || 0), 0),
          totalPaid: affiliatesData.reduce((sum, aff) => sum + (aff.paidAmount || 0), 0),
          lastUpdate: new Date()
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAffiliateHistory = async (affiliateId) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    if (affiliate) {
      setSelectedAffiliate({
        affiliate: affiliate,
        history: [],
        payments: []
      });
      setShowModal(true);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <SEOHead 
        title={`${t.commissions.meta.title} | Rounders`}
        description={t.commissions.meta.description}
      />

      <main className="commissions-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title" dangerouslySetInnerHTML={{ 
              __html: `${t.commissions.hero.title} <span class="highlight">${t.commissions.hero.highlight}</span>` 
            }} />
            <p className="hero-subtitle">
              {t.commissions.hero.subtitle}
            </p>
            
            <div className="hero-cta">
              <p>{t.commissions.hero.notReceiving}</p>
              <Link href="/declaration" className="cta-button">
                {t.commissions.hero.declare}
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="section-container">
            <div className="global-stats">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{t.commissions.stats.activeAffiliates}</h3>
                  <p className="stat-value">{stats.totalAffiliates}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>{t.commissions.stats.totalCommissions}</h3>
                  <p className="stat-value">{formatCurrency(stats.totalCommission)}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>{t.commissions.stats.totalPaid}</h3>
                  <p className="stat-value green">{formatCurrency(stats.totalPaid)}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>{t.commissions.stats.pending}</h3>
                  <p className="stat-value orange">{formatCurrency(stats.totalPending)}</p>
                </div>
              </div>
            </div>

            {stats.lastUpdate && (
              <div className="update-info">
                {t.commissions.table.lastUpdate} : {formatDate(stats.lastUpdate)}
              </div>
            )}
          </div>
        </section>
{/* Affiliates List */}
        <section className="affiliates-section">
          <div className="section-container">
            <h2 className="section-title">{t.commissions.table.title}</h2>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>{t.commissions.table.loading}</p>
              </div>
            ) : (
              <div className="affiliates-list">
                {affiliates
                  .sort((a, b) => b.totalBet - a.totalBet)
                  .map((affiliate) => (
                  <div key={affiliate.id} className="affiliate-card" onClick={() => loadAffiliateHistory(affiliate.id)}>
                    <div className="affiliate-header">
                      <h3 className="masked">
                        <span style={{color: '#FFFFFF', fontStyle: 'normal'}}>{t.commissions.table.pseudoStake || 'Pseudo Stake'} : </span>
                        {affiliate.username}
                      </h3>
                      <span className="join-date">
                        {t.commissions.table.since} {new Date(affiliate.joinedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="affiliate-stats">
                      <div className="stat-item">
                        <span className="label">{t.commissions.table.totalBet}</span>
                        <span className="value">{formatCurrency(affiliate.totalBet)}</span>
                      </div>
                      <div className="stat-item">
                        <span className="label">{t.commissions.table.totalCommission}</span>
                        <span className="value">{formatCurrency(affiliate.commission)}</span>
                      </div>
                      <div className="stat-item">
                        <span className="label">{t.commissions.table.paid}</span>
                        <span className="value green">{formatCurrency(affiliate.paid)}</span>
                      </div>
                      <div className="stat-item">
                        <span className="label">{t.commissions.table.pending}</span>
                        <span className="value orange">{formatCurrency(affiliate.pending)}</span>
                      </div>
                    </div>
                    <div className="view-details">
                      <span>{t.commissions.table.viewDetails || t.commissions.table.expand || 'Voir détails'}</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        {showModal && selectedAffiliate && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              
              <h2>{t.commissions.details?.title || 'Historique détaillé'}</h2>
              <div className="modal-info">
                <h3>{selectedAffiliate.affiliate.username}</h3>
                <div className="modal-stats">
                  <div>
                    <span>{t.commissions.table.totalBet}</span>
                    <strong>{formatCurrency(selectedAffiliate.affiliate.totalBet)}</strong>
                  </div>
                  <div>
                    <span>{t.commissions.table.totalCommission}</span>
                    <strong>{formatCurrency(selectedAffiliate.affiliate.commission)}</strong>
                  </div>
                  <div>
                    <span>{t.commissions.table.paid}</span>
                    <strong className="green">{formatCurrency(selectedAffiliate.affiliate.paid)}</strong>
                  </div>
                  <div>
                    <span>{t.commissions.table.pending}</span>
                    <strong className="orange">{formatCurrency(selectedAffiliate.affiliate.pending)}</strong>
                  </div>
                </div>
              </div>

              <p className="no-data">{t.commissions.details?.noHistory || 'Aucun historique disponible'}</p>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .commissions-page {
          min-height: 100vh;
          background: #ffffff;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #1a2c38 0%, #2d4356 100%);
          padding: 80px 20px;
          text-align: center;
        }

        .hero-title {
          color: white;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero-title :global(.highlight) {
          color: #4a9eff;
        }

        .hero-subtitle {
          color: #cbd5e1;
          font-size: 1.25rem;
          margin-bottom: 2rem;
        }

        .hero-cta {
          margin-top: 2rem;
        }

        .hero-cta p {
          color: #94a3b8;
          font-size: 1.125rem;
          margin-bottom: 1rem;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          color: white;
          padding: 14px 30px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(74, 158, 255, 0.4);
        }

        /* Stats Section */
        .stats-section {
          background: #f8fafc;
          padding: 40px 20px;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .global-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-content h3 {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a2c38;
          margin: 0;
        }

        .stat-value.green {
          color: #16a34a;
        }

        .stat-value.orange {
          color: #f59e0b;
        }

        .update-info {
          text-align: center;
          margin-top: 20px;
          color: #64748b;
          font-size: 0.875rem;
        }

        /* Affiliates Section - MÊME FOND QUE LES STATS */
        .affiliates-section {
          padding: 40px 20px;
          background: #f8fafc;
        }

        .section-title {
          color: #1a2c38;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
        }

        .loading {
          text-align: center;
          padding: 60px;
          color: #94a3b8;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #2d4356;
          border-top: 4px solid #4a9eff;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .affiliates-list {
          display: grid;
          gap: 20px;
        }

        .affiliate-card {
          background: linear-gradient(135deg, #2d4356 0%, #1a2c38 100%);
          border-radius: 16px;
          padding: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid rgba(74, 158, 255, 0.2);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .affiliate-card:hover {
          transform: translateY(-2px);
          border-color: rgba(74, 158, 255, 0.4);
          box-shadow: 0 6px 25px rgba(74, 158, 255, 0.3);
        }

        .affiliate-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .affiliate-header h3 {
          color: #60a5fa;
          font-size: 1.25rem;
          margin: 0;
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }

        .affiliate-header h3.masked {
          font-style: italic;
        }

        .join-date {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .affiliate-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-item .label {
          display: block;
          color: #94a3b8;
          font-size: 0.875rem;
          margin-bottom: 4px;
        }

        .stat-item .value {
          display: block;
          color: white;
          font-size: 1.125rem;
          font-weight: 700;
        }

        .stat-item .value.green {
          color: #00d632;
        }

        .stat-item .value.orange {
          color: #ffd700;
        }

        .view-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 0.875rem;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          padding: 30px;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #64748b;
        }

        .modal-info {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
        }

        .modal-info h3 {
          color: #4a9eff;
          margin: 0 0 15px 0;
        }

        .modal-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          text-align: center;
        }

        .modal-stats span {
          display: block;
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 5px;
        }

        .modal-stats strong {
          font-size: 1.125rem;
          color: #1a2c38;
        }

        .modal-stats strong.green {
          color: #16a34a;
        }

        .modal-stats strong.orange {
          color: #f59e0b;
        }

        .no-data {
          text-align: center;
          color: #94a3b8;
          padding: 40px;
        }

        @media (max-width: 768px) {
          .modal-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}		