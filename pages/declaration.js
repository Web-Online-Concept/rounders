import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../hooks/useTranslation";

export default function DeclarationPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    declaredPseudo: '',
    email: '',
    message: ''
  });
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Le fichier est trop volumineux (5MB maximum)');
        return;
      }
      
      // Vérifier le type
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Le fichier doit être une image');
        return;
      }
      
      setScreenshot(file);
      setErrorMessage('');
      
      // Créer un aperçu
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // Vérifier que la capture d'écran est présente
    if (!screenshot) {
      setSubmitStatus('error');
      setErrorMessage('La capture d\'écran est obligatoire');
      setIsSubmitting(false);
      return;
    }

    try {
      let screenshotUrl = null;

      // Upload de l'image si présente
      if (screenshot) {
        const uploadData = new FormData();
        uploadData.append('screenshot', screenshot);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Erreur lors de l\'upload de l\'image');
        }

        screenshotUrl = uploadResult.url;
      }

      // Envoi du formulaire
      const response = await fetch('/api/declaration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          screenshot: screenshotUrl
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ declaredPseudo: '', email: '', message: '' });
        setScreenshot(null);
        setScreenshotPreview(null);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Erreur de connexion au serveur');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Déclaration d'Affiliation - Confirmez votre pseudo | Rounders</title>
        <meta
          name="description"
          content="Confirmez votre pseudo Stake pour recevoir vos commissions d'affiliation. Processus simple et rapide."
        />
      </Head>

      <main className="declaration-page">
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
            <h1 className="hero-title" style={{color: 'white'}}>
              Confirmez votre <span className="highlight">Pseudo Stake</span>
            </h1>
            <p className="hero-subtitle" style={{color: '#cbd5e1', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6'}}>
              Une fois inscrit sur Stake via notre lien et Code Promo<br />
              Voilà la dernière étape pour recevoir vos commissions d'affiliation
            </p>
            <p style={{color: '#94a3b8', marginTop: '20px', fontSize: '16px', fontStyle: 'italic'}}>
              Une fois votre demande traitée par notre équipe,<br />
              Votre fiche apparaitra dans la page <Link href="/commissions" style={{color: 'white', fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none'}}>COMMISSIONS</Link>
            </p>
          </div>
        </section>

        {/* Formulaire - MAINTENANT EN PREMIER */}
        <section className="section-wrapper" style={{background: 'white', padding: '60px 20px'}}>
          <div className="section-container">
            <div className="form-container">
              <h2 className="form-title">Formulaire de Déclaration</h2>
              
              {submitStatus === 'success' ? (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>Déclaration envoyée avec succès !</h3>
                  <p>Nous avons bien reçu votre demande. Nous vous contacterons dans les 24h pour confirmer votre affiliation.</p>
                  <p style={{fontSize: '14px', marginTop: '15px', color: '#cbd5e1'}}>
                    <strong>Rappel :</strong> Les commissions seront calculées à partir de maintenant uniquement.
                  </p>
                  <Link href="/commissions" className="back-button">
                    Voir le tableau des commissions
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="declaration-form">
                  <div className="form-group">
                    <label htmlFor="declaredPseudo">
                      Votre pseudo Stake <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="declaredPseudo"
                      name="declaredPseudo"
                      value={formData.declaredPseudo}
                      onChange={handleChange}
                      required
                      placeholder="Ex: CryptoKing123"
                      className="form-input"
                    />
                    <small className="form-help">
                      Le pseudo exact que vous utilisez sur Stake
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="screenshot">
                      Capture d'écran de votre profil Stake <span className="required">*</span>
                    </label>
                    <div className="screenshot-section">
                      <div className="screenshot-example">
                        <p style={{color: '#cbd5e1', marginBottom: '15px', fontSize: '14px'}}>
                          Envoyez une capture d'écran de votre profil Stake montrant votre pseudo
                        </p>
                        <div className="example-image">
                          <Image
                            src="/images/exemple-capture-stake.png"
                            alt="Exemple de capture d'écran Stake"
                            width={400}
                            height={250}
                            style={{
                              width: '100%',
                              height: 'auto',
                              borderRadius: '8px',
                              border: '2px solid #4a9eff'
                            }}
                          />
                          <p style={{
                            color: '#94a3b8',
                            fontSize: '12px',
                            marginTop: '10px',
                            textAlign: 'center'
                          }}>
                            Exemple : votre page de profil avec votre pseudo visible
                          </p>
                        </div>
                      </div>
                      
                      <div className="upload-section">
                        <input
                          type="file"
                          id="screenshot"
                          name="screenshot"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{display: 'none'}}
                        />
                        <label htmlFor="screenshot" className="upload-button">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{marginRight: '8px'}}>
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                          </svg>
                          Choisir une image
                        </label>
                        
                        {screenshotPreview && (
                          <div className="preview-container">
                            <img 
                              src={screenshotPreview} 
                              alt="Aperçu" 
                              className="preview-image"
                            />
                            <button 
                              type="button"
                              onClick={() => {
                                setScreenshot(null);
                                setScreenshotPreview(null);
                              }}
                              className="remove-image"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <small className="form-help">
                      Format accepté : JPG, PNG (5MB max)
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email de contact <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                      className="form-input"
                    />
                    <small className="form-help">
                      Nous utiliserons cet email pour vous contacter si besoin
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      Message (optionnel)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Informations supplémentaires..."
                      className="form-input"
                    />
                    <small className="form-help">
                      Ajoutez toute information utile pour votre déclaration
                    </small>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="error-message">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer ma déclaration
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SECTION D'AVERTISSEMENT */}
        <section className="section-wrapper" style={{background: '#f8fafc', padding: '40px 20px'}}>
          <div className="section-container">
            <div className="warning-box">
              <div className="warning-icon">⚠️</div>
              <div className="warning-content">
                <h3>Information importante sur les commissions</h3>
                <p>
                  <strong>Les commissions ne sont calculées qu'à partir de votre inscription officielle dans notre programme.</strong>
                </p>
                <p>
                  Les gains générés avant votre déclaration ne peuvent pas être réclamés rétroactivement. 
                  Nous prenons comme point de départ vos statistiques Stake au moment de l'ajout dans notre système, 
                  et seules les différences futures seront commissionnées à 50%.
                </p>
                <p className="example">
                  <strong>Exemple :</strong> Si au moment de votre inscription vous avez généré 10 000€ de commission totale sur Stake, 
                  et qu'une semaine plus tard vous êtes à 10 200€, vous recevrez 50% de la différence (200€), soit 100€.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="section-wrapper" style={{background: 'white', padding: '60px 20px'}}>
          <div className="section-container">
            <h2 className="section-title" style={{color: '#1a2c38'}}>Comment ça marche ?</h2>
            <div className="instructions-grid">
              <div className="instruction-card">
                <div className="instruction-number">1</div>
                <h3>Vérifiez votre inscription</h3>
                <p>Assurez-vous d'avoir créé votre compte Stake via notre lien d'affiliation avec le code <strong>rounders</strong></p>
              </div>
              <div className="instruction-card">
                <div className="instruction-number">2</div>
                <h3>Remplissez le formulaire</h3>
                <p>Indiquez votre pseudo Stake exact et votre email de contact</p>
              </div>
              <div className="instruction-card">
                <div className="instruction-number">3</div>
                <h3>Traitement de votre demande</h3>
                <p>Notre équipe vérifie votre affiliation et vous ajoute au système de commissions.</p>
              </div>
              <div className="instruction-card">
                <div className="instruction-number">4</div>
                <h3>Recevez vos paiements</h3>
                <p>Une fois ajouté, vous recevrez 50% de nos commissions chaque semaine. Vous n'avez plus rien à faire.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-wrapper" style={{background: '#f8fafc', padding: '60px 20px'}}>
          <div className="section-container">
            <h2 className="section-title" style={{color: '#1a2c38'}}>Questions Fréquentes</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Pourquoi mon pseudo est-il masqué ?</h3>
                <p>
                  Pour des raisons de sécurité, Stake ne nous communique qu'une partie du pseudo 
                  de nos affiliés. La déclaration permet de confirmer votre identité complète.
                </p>
              </div>
              <div className="faq-item">
                <h3>Combien de temps pour le traitement ?</h3>
                <p>
                  Nous traitons les déclarations rapidement. Vous recevrez un email de confirmation dès que votre compte sera ajouté au système.
                </p>
              </div>
              <div className="faq-item">
                <h3>Comment sont calculées les commissions ?</h3>
                <p>
                  Nous touchons des commissions sur tous vos jeux. Vous recevez exactement 50% 
                  de ce que nous gagnons grâce à votre activité, à partir de votre inscription.
                </p>
              </div>
              <div className="faq-item">
                <h3>Quand sont effectués les paiements ?</h3>
                <p>
                  Les paiements sont effectués chaque semaine via le système de pourboires de Stake, 
                  directement sur votre compte joueur.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .declaration-page {
          min-height: 100vh;
          background: #ffffff;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* NOUVEAU STYLE POUR L'AVERTISSEMENT */
        .warning-box {
          background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
          border: 2px solid #ffc107;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
          display: flex;
          gap: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .warning-icon {
          font-size: 48px;
          flex-shrink: 0;
        }

        .warning-content h3 {
          color: #856404;
          margin: 0 0 10px 0;
          font-size: 20px;
        }

        .warning-content p {
          color: #856404;
          margin: 10px 0;
          line-height: 1.6;
        }

        .warning-content .example {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          border-left: 4px solid #ffc107;
        }

        .instructions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .instruction-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          border: 2px solid #e5e7eb;
          position: relative;
          padding-top: 50px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .instruction-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
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

        .instruction-card h3 {
          color: #1a2c38;
          margin-bottom: 15px;
          font-size: 20px;
        }

        .instruction-card p {
          color: #64748b;
          line-height: 1.6;
        }

        .instruction-card strong {
          color: #4a9eff;
          font-weight: 700;
        }

        .form-container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1a2c38 0%, #2d4356 100%);
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .form-title {
          color: white;
          text-align: center;
          margin-bottom: 40px;
          font-size: 32px;
          font-weight: 800;
        }

        .declaration-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        .required {
          color: #ff6b6b;
        }

        .form-input {
          padding: 14px 20px;
          border-radius: 10px;
          border: 2px solid #e5e7eb;
          background: white;
          color: #1a2c38;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #4a9eff;
          box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        textarea.form-input {
          resize: vertical;
          min-height: 100px;
        }

        .form-help {
          color: #cbd5e1;
          font-size: 14px;
        }

        /* Styles pour la section screenshot */
        .screenshot-section {
          display: flex;
          gap: 30px;
          margin-top: 10px;
        }

        .screenshot-example {
          flex: 1;
        }

        .example-image {
          background: rgba(255, 255, 255, 0.05);
          padding: 15px;
          border-radius: 12px;
          border: 2px dashed rgba(74, 158, 255, 0.3);
        }

        .upload-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .upload-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          background: rgba(74, 158, 255, 0.1);
          border: 2px solid #4a9eff;
          border-radius: 10px;
          color: #4a9eff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-button:hover {
          background: rgba(74, 158, 255, 0.2);
          transform: translateY(-2px);
        }

        .preview-container {
          position: relative;
          width: 100%;
          max-width: 200px;
        }

        .preview-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          border: 2px solid #4a9eff;
        }

        .remove-image {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #ff6b6b;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .remove-image:hover {
          background: #ff5252;
        }

        .submit-button {
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          color: white;
          padding: 16px 40px;
          border-radius: 10px;
          border: none;
          font-weight: 700;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          margin-top: 10px;
          box-shadow: 0 4px 20px rgba(74, 158, 255, 0.3);
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(74, 158, 255, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-message {
          text-align: center;
          padding: 40px;
          background: linear-gradient(135deg, rgba(0, 214, 50, 0.1) 0%, rgba(0, 214, 50, 0.05) 100%);
          border-radius: 16px;
          border: 2px solid #00d632;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .success-message h3 {
          color: #00d632;
          font-size: 28px;
          margin-bottom: 15px;
        }

        .success-message p {
          color: white;
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #4a9eff;
          padding: 14px 30px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .error-message {
          background: rgba(255, 107, 107, 0.1);
          border: 2px solid #ff6b6b;
          color: #ff6b6b;
          padding: 15px 20px;
          border-radius: 10px;
          font-size: 16px;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 40px;
        }

        .faq-item {
          background: white;
          padding: 25px;
          border-radius: 16px;
          border: 2px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .faq-item h3 {
          color: #1a2c38;
          margin-bottom: 12px;
          font-size: 18px;
          font-weight: 700;
        }

        .faq-item p {
          color: #64748b;
          line-height: 1.5;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .warning-box {
            flex-direction: column;
            text-align: center;
          }

          .warning-icon {
            font-size: 36px;
          }

          .screenshot-section {
            flex-direction: column;
          }

          .form-container {
            padding: 30px 20px;
            margin: 20px;
          }

          .form-title {
            font-size: 24px;
          }

          .instructions-grid {
            grid-template-columns: 1fr;
          }

          .faq-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}