import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';
import SEOHead from '../components/SEOHead';

export default function JouerSurStake() {
  const { t, locale } = useTranslation();

  return (
    <>
      <SEOHead 
        title={t.playOnStake.meta.title}
        description={t.playOnStake.meta.description}
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
            <h1 className="hero-title">
              {t.playOnStake.hero.title}<br />
              <span className="highlight">{t.playOnStake.hero.subtitle}</span>
            </h1>
            <p className="hero-subtitle">
              {t.playOnStake.hero.description}
            </p>
            
            <a 
              href="https://stake.bet/?c=rounders&offer=rounders" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-button"
            >
              {t.playOnStake.hero.cta}
            </a>
          </div>
        </section>

        {/* Content */}
        <section className="guide-content">
          <div className="guide-container">
            {/* Vidéo d'illustration remplace l'image */}
            <div style={{
              width: '100%',
              marginBottom: '40px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              position: 'relative',
              backgroundColor: '#000'
            }}>
              <video 
                src="/videos/video_accueil_jouer_sur_stake.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>

            {/* Introduction */}
            <div className="intro-card" style={{marginBottom: '60px'}}>
              <p className="lead-text">
                <strong>{t.playOnStake.intro.title}</strong><br/>
                {t.playOnStake.intro.description}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 1 : COMMENT S'INSCRIRE */}
        <section className="section-wrapper" style={{
          background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(0, 214, 50, 0.1)',
            borderRadius: '50%',
            filter: 'blur(50px)'
          }}></div>
          <div className="section-container" style={{position: 'relative', zIndex: 1}}>
            <div className="content-section" id="inscription" style={{marginBottom: 0}}>
              <h2 className="section-title">{t.playOnStake.registration.title}</h2>
              
              {/* Vidéo d'inscription avec son ajoutée ici */}
              <div style={{
                width: '100%',
                marginBottom: '40px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                position: 'relative',
                backgroundColor: '#000'
              }}>
                <video 
                  src={`/videos/inscription_stake_${locale}.mp4`}
                  controls
                  playsInline
                  onEnded={(e) => {
                    e.currentTarget.currentTime = 0;
                  }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              
              <div className="info-box" style={{
                padding: '30px',
                marginBottom: '50px'
              }}>
                <span className="info-box-icon">🌐</span>
                <div className="info-box-content">
                  <h3 style={{marginBottom: '15px'}}>{t.playOnStake.registration.method.title}</h3>
                  <p style={{margin: 0, lineHeight: '1.8'}}>
                    {t.playOnStake.registration.method.description}
                  </p>
                </div>
              </div>

              {/* Étapes d'inscription */}
              <h3 style={{
                marginTop: '50px', 
                marginBottom: '40px', 
                fontSize: '26px', 
                fontWeight: '700',
                textAlign: 'center'
              }}>
                {t.playOnStake.registration.steps.title}
              </h3>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '40px',
                marginBottom: '50px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '30px',
                  left: '60px',
                  right: '60px',
                  height: '2px',
                  background: '#e2e8f0',
                  zIndex: 0
                }}></div>
                
                <div style={{flex: 1, textAlign: 'center', position: 'relative', zIndex: 1}}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'white',
                    border: '3px solid #00d632',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#00d632',
                    margin: '0 auto 20px',
                    boxShadow: '0 4px 15px rgba(0, 214, 50, 0.2)'
                  }}>1</div>
                  <h3 style={{fontSize: '18px', marginBottom: '8px'}}>{t.playOnStake.registration.steps.step1.title}</h3>
                  <p style={{fontSize: '14px', color: '#64748b', margin: 0}}>{t.playOnStake.registration.steps.step1.subtitle}</p>
                </div>
                
                <div style={{flex: 1, textAlign: 'center', position: 'relative', zIndex: 1}}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'white',
                    border: '3px solid #00d632',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#00d632',
                    margin: '0 auto 20px',
                    boxShadow: '0 4px 15px rgba(0, 214, 50, 0.2)'
                  }}>2</div>
                  <h3 style={{fontSize: '18px', marginBottom: '8px'}}>{t.playOnStake.registration.steps.step2.title}</h3>
                  <p style={{fontSize: '14px', color: '#64748b', margin: 0}}>{t.playOnStake.registration.steps.step2.subtitle}</p>
                </div>
                
                <div style={{flex: 1, textAlign: 'center', position: 'relative', zIndex: 1}}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'white',
                    border: '3px solid #00d632',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#00d632',
                    margin: '0 auto 20px',
                    boxShadow: '0 4px 15px rgba(0, 214, 50, 0.2)'
                  }}>3</div>
                  <h3 style={{fontSize: '18px', marginBottom: '8px'}}>{t.playOnStake.registration.steps.step3.title}</h3>
                  <p style={{fontSize: '14px', color: '#64748b', margin: 0}}>{t.playOnStake.registration.steps.step3.subtitle}</p>
                </div>
                
                <div style={{flex: 1, textAlign: 'center', position: 'relative', zIndex: 1}}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'white',
                    border: '3px solid #00d632',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#00d632',
                    margin: '0 auto 20px',
                    boxShadow: '0 4px 15px rgba(0, 214, 50, 0.2)'
                  }}>4</div>
                  <h3 style={{fontSize: '18px', marginBottom: '8px'}}>{t.playOnStake.registration.steps.step4.title}</h3>
                  <p style={{fontSize: '14px', color: '#64748b', margin: 0}}>{t.playOnStake.registration.steps.step4.subtitle}</p>
                </div>
              </div>

              <div className="highlight-box" style={{
                marginTop: '50px',
                padding: '30px',
                background: 'white',
                border: '2px solid #00d632',
                borderRadius: '15px'
              }}>
                <h3 style={{marginBottom: '20px'}}>{t.playOnStake.registration.cookie.title}</h3>
                <p style={{marginBottom: '20px', lineHeight: '1.8'}}>
                  {t.playOnStake.registration.cookie.description}
                </p>
                <ul style={{marginTop: '15px', paddingLeft: '25px', lineHeight: '2'}}>
                  <li>{t.playOnStake.registration.cookie.benefits[0]}</li>
                  <li>{t.playOnStake.registration.cookie.benefits[1]}</li>
                  <li>{t.playOnStake.registration.cookie.benefits[2]}</li>
                  <li>{t.playOnStake.registration.cookie.benefits[3]}</li>
                </ul>
              </div>

              <div className="cta-box" style={{
                marginTop: '50px',
                padding: '40px',
                background: 'linear-gradient(135deg, #1a2c38 0%, #2d4356 100%)',
                borderRadius: '20px',
                textAlign: 'center',
                border: '2px solid rgba(0, 214, 50, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}>
                <h3 style={{fontSize: '28px', marginBottom: '20px', color: 'white'}}>
                  {t.playOnStake.registration.readyCta.title}
                </h3>
                <p style={{fontSize: '18px', marginBottom: '30px', color: '#cbd5e1'}}>
                  {t.playOnStake.registration.readyCta.description}
                </p>
                <div className="cta-buttons">
                  <a 
                    href="https://stake.bet/?c=rounders&offer=rounders" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-button primary"
                    style={{
                      background: 'linear-gradient(135deg, #00d632 0%, #00a826 100%)',
                      color: 'white',
                      fontSize: '18px',
                      padding: '15px 40px',
                      borderRadius: '30px',
                      fontWeight: '700',
                      boxShadow: '0 4px 15px rgba(0, 214, 50, 0.3)',
                      transition: 'all 0.3s',
                      display: 'inline-block',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 214, 50, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 214, 50, 0.3)';
                    }}
                  >
                    {t.playOnStake.registration.readyCta.button}
                  </a>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '15px',
                  marginTop: '20px',
                  display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <p style={{margin: 0, fontSize: '16px', color: '#cbd5e1'}}>
                    {t.playOnStake.registration.readyCta.promoText} <strong style={{fontSize: '20px', color: '#00d632'}}>{t.playOnStake.registration.readyCta.promoCode}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper" style={{
          background: 'linear-gradient(135deg, #fff3e0 0%, #fffaf0 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 152, 0, 0.1)',
            borderRadius: '50%',
            filter: 'blur(50px)'
          }}></div>
          <div className="section-container" style={{position: 'relative', zIndex: 1}}>
            <div className="content-section" id="plateforme">
              <h2 className="section-title">{t.playOnStake.platform.title}</h2>
              
              <div className="casino-overview-grid" style={{gap: '30px'}}>
                {/* Casino */}
                <div className="overview-card" style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div className="overview-header best" style={{
                    padding: '30px',
                    background: 'linear-gradient(135deg, #00d632 0%, #00a826 100%)',
                    textAlign: 'center'
                  }}>
                    <span className="overview-icon" style={{fontSize: '48px', marginBottom: '10px', display: 'block'}}>🎰</span>
                    <h3 className="overview-title" style={{fontSize: '28px', margin: 0, color: 'white'}}>{t.playOnStake.platform.casino.title}</h3>
                  </div>
                  <div className="overview-content" style={{padding: '35px'}}>
                    <p className="overview-description" style={{
                      fontSize: '16px',
                      lineHeight: '1.8',
                      marginBottom: '30px',
                      color: '#334155'
                    }}>
                      {t.playOnStake.platform.casino.description}
                    </p>
                    
                    <div style={{marginBottom: '25px'}}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        marginBottom: '15px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.casino.slots.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.casino.slots.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#00d632',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.casino.slots.badge}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        marginBottom: '15px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.casino.live.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.casino.live.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#ff9800',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.casino.live.badge}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.casino.originals.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.casino.originals.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#2196f3',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.casino.originals.badge}
                        </div>
                      </div>
                    </div>
                    
                    <div className="overview-footer" style={{
                      background: 'linear-gradient(135deg, rgba(0, 214, 50, 0.1) 0%, rgba(0, 168, 38, 0.1) 100%)',
                      padding: '20px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      marginTop: '25px'
                    }}>
                      <span style={{fontWeight: '600', color: '#00a826'}}>
                        {t.playOnStake.platform.casino.footer}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Paris Sportifs */}
                <div className="overview-card" style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div className="overview-header medium" style={{
                    padding: '30px',
                    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                    textAlign: 'center'
                  }}>
                    <span className="overview-icon" style={{fontSize: '48px', marginBottom: '10px', display: 'block'}}>⚽</span>
                    <h3 className="overview-title" style={{fontSize: '28px', margin: 0, color: 'white'}}>{t.playOnStake.platform.sports.title}</h3>
                  </div>
                  <div className="overview-content" style={{padding: '35px'}}>
                    <p className="overview-description" style={{
                      fontSize: '16px',
                      lineHeight: '1.8',
                      marginBottom: '30px',
                      color: '#334155'
                    }}>
                      {t.playOnStake.platform.sports.description}
                    </p>
                    
                    <div style={{marginBottom: '25px'}}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        marginBottom: '15px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.sports.football.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.sports.football.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#00d632',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.sports.football.badge}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        marginBottom: '15px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.sports.esports.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.sports.esports.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#9c27b0',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.sports.esports.badge}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.sports.us.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.sports.us.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#ff5722',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.sports.us.badge}
                        </div>
                      </div>
                    </div>
                    
                    <div className="overview-footer" style={{
                      background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(245, 124, 0, 0.1) 100%)',
                      padding: '20px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      marginTop: '25px'
                    }}>
                      <span style={{fontWeight: '600', color: '#f57c00'}}>
                        {t.playOnStake.platform.sports.footer}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Poker */}
                <div className="overview-card" style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div className="overview-header bad" style={{
                    padding: '30px',
                    background: 'linear-gradient(135deg, #ff3b30 0%, #d32f2f 100%)',
                    textAlign: 'center'
                  }}>
                    <span className="overview-icon" style={{fontSize: '48px', marginBottom: '10px', display: 'block'}}>♠️</span>
                    <h3 className="overview-title" style={{fontSize: '28px', margin: 0, color: 'white'}}>{t.playOnStake.platform.poker.title}</h3>
                  </div>
                  <div className="overview-content" style={{padding: '35px'}}>
                    <p className="overview-description" style={{
                      fontSize: '16px',
                      lineHeight: '1.8',
                      marginBottom: '30px',
                      color: '#334155'
                    }}>
                      {t.playOnStake.platform.poker.description}
                    </p>
                    
                    <div style={{marginBottom: '25px'}}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        marginBottom: '15px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.poker.holdem.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.poker.holdem.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#4caf50',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.poker.holdem.badge}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        marginBottom: '15px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.poker.tournaments.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.poker.tournaments.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#673ab7',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.poker.tournaments.badge}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600'}}>{t.playOnStake.platform.poker.badbeat.title}</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>
                            {t.playOnStake.platform.poker.badbeat.description}
                          </p>
                        </div>
                        <div style={{
                          background: '#ffc107',
                          color: '#333',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {t.playOnStake.platform.poker.badbeat.badge}
                        </div>
                      </div>
                    </div>
                    
                    <div className="overview-footer" style={{
                      background: 'linear-gradient(135deg, rgba(255, 59, 48, 0.1) 0%, rgba(211, 47, 47, 0.1) 100%)',
                      padding: '20px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      marginTop: '25px'
                    }}>
                      <span style={{fontWeight: '600', color: '#d32f2f'}}>
                        {t.playOnStake.platform.poker.footer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features additionnelles */}
              <div className="security-grid" style={{marginTop: '60px', gap: '25px'}}>
                <div className="security-item" style={{padding: '30px'}}>
                  <span className="security-icon">💳</span>
                  <h3 style={{marginBottom: '15px'}}>{t.playOnStake.platform.features.currencies.title}</h3>
                  <p style={{lineHeight: '1.8'}}>
                    {t.playOnStake.platform.features.currencies.items.map((item, index) => (
                      <span key={index}>• {item}<br/></span>
                    ))}
                  </p>
                </div>

                <div className="security-item" style={{padding: '30px'}}>
                  <span className="security-icon">📱</span>
                  <h3 style={{marginBottom: '15px'}}>{t.playOnStake.platform.features.mobile.title}</h3>
                  <p style={{lineHeight: '1.8'}}>
                    {t.playOnStake.platform.features.mobile.items.map((item, index) => (
                      <span key={index}>• {item}<br/></span>
                    ))}
                  </p>
                </div>

                <div className="security-item" style={{padding: '30px'}}>
                  <span className="security-icon">🌍</span>
                  <h3 style={{marginBottom: '15px'}}>{t.playOnStake.platform.features.international.title}</h3>
                  <p style={{lineHeight: '1.8'}}>
                    {t.playOnStake.platform.features.international.items.map((item, index) => (
                      <span key={index}>• {item}<br/></span>
                    ))}
                  </p>
                </div>

                <div className="security-item" style={{padding: '30px'}}>
                  <span className="security-icon">🔒</span>
                  <h3 style={{marginBottom: '15px'}}>{t.playOnStake.platform.features.security.title}</h3>
                  <p style={{lineHeight: '1.8'}}>
                    {t.playOnStake.platform.features.security.items.map((item, index) => (
                      <span key={index}>• {item}<br/></span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 : AVANTAGES */}
        <section className="section-wrapper" style={{
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f3f9ff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '-100px',
            width: '300px',
            height: '300px',
            background: 'rgba(33, 150, 243, 0.08)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          <div className="section-container" style={{position: 'relative', zIndex: 1}}>
            <div className="content-section" id="avantages" style={{marginBottom: 0}}>
              <h2 className="section-title">{t.playOnStake.advantages.title}</h2>
              
              <div className="advantages-list">
                <div className="advantage-item" style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  marginBottom: '25px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div className="advantage-header">
                    <span className="advantage-icon">💰</span>
                    <h3>{t.playOnStake.advantages.vip.title}</h3>
                  </div>
                  <p style={{margin: '20px 0', lineHeight: '1.8'}}>
                    {t.playOnStake.advantages.vip.description}
                  </p>
                  <div className="advantage-highlight" style={{
                    background: 'rgba(0, 214, 50, 0.05)',
                    padding: '20px',
                    borderRadius: '10px',
                    borderLeft: '4px solid #00d632'
                  }}>
                    <h4 style={{marginBottom: '15px'}}>{t.playOnStake.advantages.vip.benefits.title}</h4>
                    {t.playOnStake.advantages.vip.benefits.items.map((item, index) => (
                      <span key={index} style={{lineHeight: '2'}}>• {item}<br/></span>
                    ))}
                  </div>
                </div>

                <div className="advantage-item" style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  marginBottom: '25px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div className="advantage-header">
                    <span className="advantage-icon">🎲</span>
                    <h3>{t.playOnStake.advantages.originals.title}</h3>
                  </div>
                  <p style={{margin: '20px 0', lineHeight: '1.8'}}>
                    {t.playOnStake.advantages.originals.description}
                  </p>
                  <div className="advantage-highlight" style={{
                    background: 'rgba(0, 214, 50, 0.05)',
                    padding: '20px',
                    borderRadius: '10px',
                    borderLeft: '4px solid #00d632'
                  }}>
                    {t.playOnStake.advantages.originals.benefits.map((item, index) => (
                      <span key={index} style={{lineHeight: '2'}}>• {item}<br/></span>
                    ))}
                  </div>
                </div>

                <div className="advantage-item" style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  marginBottom: '25px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div className="advantage-header">
                    <span className="advantage-icon">⚡</span>
                    <h3>{t.playOnStake.advantages.payments.title}</h3>
                  </div>
                  <p style={{margin: '20px 0', lineHeight: '1.8'}}>
                    {t.playOnStake.advantages.payments.description}
                  </p>
                  <div className="advantage-highlight" style={{
                    background: 'rgba(0, 214, 50, 0.05)',
                    padding: '20px',
                    borderRadius: '10px',
                    borderLeft: '4px solid #00d632'
                  }}>
                    {t.playOnStake.advantages.payments.benefits.map((item, index) => (
                      <span key={index} style={{lineHeight: '2'}}>• {item}<br/></span>
                    ))}
                  </div>
                </div>

                <div className="advantage-item" style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  marginBottom: '25px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div className="advantage-header">
                    <span className="advantage-icon">📺</span>
                    <h3>{t.playOnStake.advantages.streaming.title}</h3>
                  </div>
                  <p style={{margin: '20px 0', lineHeight: '1.8'}}>
                    {t.playOnStake.advantages.streaming.description}
                  </p>
                  <div className="advantage-highlight" style={{
                    background: 'rgba(0, 214, 50, 0.05)',
                    padding: '20px',
                    borderRadius: '10px',
                    borderLeft: '4px solid #00d632'
                  }}>
                    {t.playOnStake.advantages.streaming.benefits.map((item, index) => (
                      <span key={index} style={{lineHeight: '2'}}>• {item}<br/></span>
                    ))}
                  </div>
                </div>

                <div className="advantage-item" style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  marginBottom: '25px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div className="advantage-header">
                    <span className="advantage-icon">🏆</span>
                    <h3>{t.playOnStake.advantages.partnerships.title}</h3>
                  </div>
                  <p style={{margin: '20px 0', lineHeight: '1.8'}}>
                    {t.playOnStake.advantages.partnerships.description}
                  </p>
                  <div className="advantage-highlight" style={{
                    background: 'rgba(0, 214, 50, 0.05)',
                    padding: '20px',
                    borderRadius: '10px',
                    borderLeft: '4px solid #00d632'
                  }}>
                    {t.playOnStake.advantages.partnerships.partners.map((item, index) => (
                      <span key={index} style={{lineHeight: '2'}}>• {item}<br/></span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pro-tip" style={{
                marginTop: '50px',
                padding: '30px',
                background: 'white',
                borderRadius: '15px',
                border: '2px solid #00d632'
              }}>
                <span className="pro-tip-icon">💡</span>
                <div className="pro-tip-content">
                  <h4 style={{marginBottom: '15px'}}>{t.playOnStake.advantages.protip.title}</h4>
                  <p style={{margin: 0, lineHeight: '1.8'}}>
                    {t.playOnStake.advantages.protip.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Section Bonus */}
            <div className="content-section" style={{marginTop: '60px', marginBottom: 0}}>
              <h2 style={{fontSize: '28px', marginBottom: '40px', textAlign: 'center'}}>
                {t.playOnStake.bonuses.title}
              </h2>
              
              <div className="promo-showcase" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px'}}>
                <div className="promo-card featured" style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  border: '2px solid #00d632',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span className="promo-badge" style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#00d632',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>{t.playOnStake.bonuses.welcome.badge}</span>
                  <h3 style={{fontSize: '22px', marginBottom: '15px', marginTop: '30px'}}>{t.playOnStake.bonuses.welcome.title}</h3>
                  <p style={{marginBottom: '20px', lineHeight: '1.8'}}>
                    {t.playOnStake.bonuses.welcome.description}
                  </p>
                  <div className="promo-terms" style={{
                    fontSize: '14px',
                    color: '#64748b',
                    paddingTop: '15px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    {t.playOnStake.bonuses.welcome.terms}
                  </div>
                </div>

                <div className="promo-card featured" style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  border: '2px solid #ff9800',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span className="promo-badge" style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#ff9800',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>{t.playOnStake.bonuses.daily.badge}</span>
                  <h3 style={{fontSize: '22px', marginBottom: '15px', marginTop: '30px'}}>{t.playOnStake.bonuses.daily.title}</h3>
                  <p style={{marginBottom: '20px', lineHeight: '1.8'}}>
                    {t.playOnStake.bonuses.daily.description}
                  </p>
                  <div className="promo-terms" style={{
                    fontSize: '14px',
                    color: '#64748b',
                    paddingTop: '15px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    {t.playOnStake.bonuses.daily.terms}
                  </div>
                </div>

                <div className="promo-card featured" style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  border: '2px solid #2196f3',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span className="promo-badge" style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#2196f3',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>{t.playOnStake.bonuses.cashback.badge}</span>
                  <h3 style={{fontSize: '22px', marginBottom: '15px', marginTop: '30px'}}>{t.playOnStake.bonuses.cashback.title}</h3>
                  <p style={{marginBottom: '20px', lineHeight: '1.8'}}>
                    {t.playOnStake.bonuses.cashback.description}
                  </p>
                  <div className="promo-terms" style={{
                    fontSize: '14px',
                    color: '#64748b',
                    paddingTop: '15px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    {t.playOnStake.bonuses.cashback.terms}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ rapide */}
        <section className="section-wrapper" style={{
          background: 'linear-gradient(135deg, #fce4ec 0%, #fef5f7 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            width: '250px',
            height: '250px',
            background: 'rgba(233, 30, 99, 0.08)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            transform: 'translateX(-50%)'
          }}></div>
          <div className="section-container" style={{position: 'relative', zIndex: 1}}>
            <div className="content-section" style={{marginBottom: 0}}>
              <h2 className="section-title">{t.playOnStake.faq.title}</h2>
              
              <div className="faq-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '25px'
              }}>
                {t.playOnStake.faq.items.map((item, index) => (
                  <div key={index} className="faq-item" style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '15px',
                    border: '1px solid rgba(233, 30, 99, 0.1)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                  }}>
                    <h3 style={{marginBottom: '15px', fontSize: '20px'}}>{item.question}</h3>
                    <p style={{margin: 0, lineHeight: '1.8', color: '#64748b'}}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="final-cta">
          <div className="cta-content">
            <h2>{t.playOnStake.finalCta.title}</h2>
            <p>{t.playOnStake.finalCta.description}</p>
            <div className="cta-buttons">
              <a 
                href="https://stake.bet/?c=rounders&offer=rounders" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-primary"
              >
                {t.playOnStake.finalCta.button}
              </a>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginTop: '30px',
              display: 'inline-block',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <p style={{margin: 0, fontSize: '18px', color: '#cbd5e1'}}>
                {t.playOnStake.finalCta.promoText} <strong style={{fontSize: '24px', color: '#4a9eff'}}>{t.playOnStake.finalCta.promoCode} </strong> 
                {t.playOnStake.finalCta.promoSuffix}
              </p>
            </div>
          </div>
        </section>

        {/* Résumé final */}
        <section className="section-wrapper">
          <div className="section-container">
            <h2 className="section-title">{t.playOnStake.summary.title}</h2>
            <div className="summary-grid" style={{gap: '20px'}}>
              {t.playOnStake.summary.items.map((item, index) => (
                <div key={index} className="summary-item" style={{
                  background: '#f8fafc',
                  padding: '25px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <span className="summary-icon" style={{fontSize: '30px', marginBottom: '15px', display: 'block'}}>✅</span>
                  <p style={{margin: 0, fontWeight: '600'}}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}		