import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../hooks/useTranslation";
import SEOHead from "../components/SEOHead";

export default function AffiliationPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead 
        title={`${t.affiliation.meta.title} | Rounders`}
        description={t.affiliation.meta.description}
      />

      <main className="affiliation-page">
        {/* Hero Section */}
        <section className="hero-section" style={{
          minHeight: '400px',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="hero-content">
            <h1 className="hero-title" dangerouslySetInnerHTML={{ 
              __html: t.affiliation.hero.title 
            }} />
            <p className="hero-subtitle">
              {t.affiliation.hero.subtitle}
            </p>
            <a href="https://stake.bet/?c=rounders&offer=rounders" className="hero-button" target="_blank" rel="noopener noreferrer">
              {t.affiliation.hero.cta}
            </a>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="section-wrapper">
          <div className="section-container">
            <h2 className="section-title">{t.affiliation.howItWorks.title}</h2>
            <div className="cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }}>
              <div className="info-card" style={{padding: '30px 20px'}}>
                <div className="card-icon" style={{width: '50px', height: '50px', fontSize: '20px'}}>1</div>
                <h3 style={{fontSize: '18px', marginBottom: '12px'}}>{t.affiliation.howItWorks.steps.step1.title}</h3>
                <p style={{fontSize: '14px', lineHeight: '1.5'}}>{t.affiliation.howItWorks.steps.step1.description}</p>
              </div>
              <div className="info-card" style={{padding: '30px 20px'}}>
                <div className="card-icon" style={{width: '50px', height: '50px', fontSize: '20px'}}>2</div>
                <h3 style={{fontSize: '18px', marginBottom: '12px'}}>{t.affiliation.howItWorks.steps.step2.title}</h3>
                <p style={{fontSize: '14px', lineHeight: '1.5'}}>{t.affiliation.howItWorks.steps.step2.description}</p>
              </div>
              <div className="info-card" style={{padding: '30px 20px'}}>
                <div className="card-icon" style={{width: '50px', height: '50px', fontSize: '20px'}}>3</div>
                <h3 style={{fontSize: '18px', marginBottom: '12px'}}>{t.affiliation.howItWorks.steps.step3.title}</h3>
                <p style={{fontSize: '14px', lineHeight: '1.5'}}>{t.affiliation.howItWorks.steps.step3.description}</p>
              </div>
              <div className="info-card" style={{padding: '30px 20px'}}>
                <div className="card-icon" style={{width: '50px', height: '50px', fontSize: '20px'}}>4</div>
                <h3 style={{fontSize: '18px', marginBottom: '12px'}}>{t.affiliation.howItWorks.steps.step4.title}</h3>
                <p style={{fontSize: '14px', lineHeight: '1.5'}}>{t.affiliation.howItWorks.steps.step4.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Notre système de paiement - DÉPLACÉ ICI */}
        <section className="section-wrapper" style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div className="section-container">
            <h2 className="section-title">{t.affiliation.paymentSystem.title}</h2>
            <div className="payment-system">
              <div className="payment-card">
                <div className="payment-icon">💰</div>
                <h3>{t.affiliation.paymentSystem.tips.title}</h3>
                <p>{t.affiliation.paymentSystem.tips.description}</p>
              </div>
              <div className="payment-card">
                <div className="payment-icon">📅</div>
                <h3>{t.affiliation.paymentSystem.weekly.title}</h3>
                <p>{t.affiliation.paymentSystem.weekly.description}</p>
              </div>
              <div className="payment-card important">
                <div className="payment-icon">⚠️</div>
                <h3>{t.affiliation.paymentSystem.important.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: t.affiliation.paymentSystem.important.description }} />
                <Link href="/declaration">
                  <span className="coming-soon" style={{cursor: 'pointer'}}>
                    {t.affiliation.paymentSystem.important.cta}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
{/* Calcul des commissions */}
        <section className="section-wrapper dark-bg">
          <div className="section-container">
            <h2 className="section-title">{t.affiliation.commissionCalc.title}</h2>
            <div className="commission-box">
              <div className="honest-talk">
                <h3>{t.affiliation.commissionCalc.transparent.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: t.affiliation.commissionCalc.transparent.description }} />
              </div>

              <div className="cashback-explanation">
                <div className="cashback-header">
                  <span className="cashback-icon">💸</span>
                  <h3>{t.affiliation.commissionCalc.cashback.title}</h3>
                </div>
                <div className="cashback-content">
                  <p dangerouslySetInnerHTML={{ __html: t.affiliation.commissionCalc.cashback.description }} />
                  <div className="money-flow">
                    <div className="flow-item">
                      <span className="flow-icon">🎰</span>
                      <p>{t.affiliation.commissionCalc.cashback.flow.bet}</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item">
                      <span className="flow-icon">🏦</span>
                      <p>{t.affiliation.commissionCalc.cashback.flow.stake}</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item highlight">
                      <span className="flow-icon">💰</span>
                      <p>{t.affiliation.commissionCalc.cashback.flow.return}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="real-examples">
                <h3>{t.affiliation.commissionCalc.examples.title}</h3>
                <div className="examples-redirect">
                  <p dangerouslySetInnerHTML={{ __html: t.affiliation.commissionCalc.examples.description }} />
                  <Link href="/commissions" className="see-examples-button">
                    <span>{t.affiliation.commissionCalc.examples.cta}</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                    </svg>
                  </Link>
                  <p className="examples-note">{t.affiliation.commissionCalc.examples.note}</p>
                </div>
              </div>

              <div className="bottom-line">
                <h3>{t.affiliation.commissionCalc.deal.title}</h3>
                <div className="deal-points">
                  <div className="deal-point">
                    <span className="point-icon">✅</span>
                    <p dangerouslySetInnerHTML={{ __html: t.affiliation.commissionCalc.deal.points.point1 }} />
                  </div>
                  <div className="deal-point">
                    <span className="point-icon">✅</span>
                    <p>{t.affiliation.commissionCalc.deal.points.point2}</p>
                  </div>
                  <div className="deal-point">
                    <span className="point-icon">✅</span>
                    <p>{t.affiliation.commissionCalc.deal.points.point3}</p>
                  </div>
                </div>
              </div>

              <div className="warning-box">
                <span className="warning-icon">💡</span>
                <p dangerouslySetInnerHTML={{ __html: t.affiliation.commissionCalc.reminder }} />
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi nous choisir */}
        <section className="section-wrapper gradient-bg">
          <div className="section-container">
            <h2 className="section-title white">{t.affiliation.whyChooseUs.title}</h2>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">✅</div>
                <h4>{t.affiliation.whyChooseUs.features.transparency.title}</h4>
                <p>{t.affiliation.whyChooseUs.features.transparency.description}</p>
              </div>
              <div className="feature">
                <div className="feature-icon">💸</div>
                <h4>{t.affiliation.whyChooseUs.features.payout.title}</h4>
                <p>{t.affiliation.whyChooseUs.features.payout.description}</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🚀</div>
                <h4>{t.affiliation.whyChooseUs.features.fast.title}</h4>
                <p>{t.affiliation.whyChooseUs.features.fast.description}</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🤝</div>
                <h4>{t.affiliation.whyChooseUs.features.support.title}</h4>
                <p>{t.affiliation.whyChooseUs.features.support.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="final-cta">
          <div className="cta-content">
            <h2>{t.affiliation.finalCta.title}</h2>
            <p>{t.affiliation.finalCta.subtitle}</p>
            <div className="cta-buttons">
              <a href="https://stake.bet/?c=rounders&offer=rounders" className="cta-primary" target="_blank" rel="noopener noreferrer">
                {t.affiliation.finalCta.primaryButton}
              </a>
              <Link href="/commissions" className="cta-secondary">
                {t.affiliation.finalCta.secondaryButton}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}