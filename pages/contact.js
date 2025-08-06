import Head from "next/head";
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: 'general', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t.contact.meta.title}</title>
        <meta name="description" content={t.contact.meta.description} />
      </Head>

      <main className="contact-page">
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
            <h1 className="hero-title">
              {t.contact.hero.title}
            </h1>
            <p className="hero-subtitle">
              {t.contact.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-wrapper">
          <div className="section-container">
            <div className="contact-form-container">
              <h2>{t.contact.form.title}</h2>
              
              {submitStatus === 'success' ? (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>{t.contact.form.successTitle}</h3>
                  <p>Nous avons bien reçu votre message et vous répondrons rapidement.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      {t.contact.form.name} <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.form.namePlaceholder}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      {t.contact.form.email} <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      {t.contact.form.subject} <span className="required">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="general">{t.contact.form.subjects.general}</option>
                      <option value="affiliation">{t.contact.form.subjects.affiliation}</option>
                      <option value="payment">{t.contact.form.subjects.payment}</option>
                      <option value="technical">{t.contact.form.subjects.technical}</option>
                      <option value="other">{t.contact.form.subjects.other}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      {t.contact.form.message} <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder={t.contact.form.messagePlaceholder}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="error-message">
                      ⚠️ {t.contact.form.errorMessage}
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
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>
                        {t.contact.form.send}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: #ffffff;
        }

        .hero-section {
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 800;
          color: white;
          margin-bottom: 20px;
        }

        .hero-subtitle {
          font-size: 20px;
          color: #cbd5e1;
          line-height: 1.6;
        }

        .section-wrapper {
          padding: 80px 20px;
          background: #f8fafc;
        }

        .section-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .contact-form-container {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .contact-form-container h2 {
          margin: 0 0 30px 0;
          font-size: 28px;
          color: #1a2c38;
          text-align: center;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #1a2c38;
          font-size: 16px;
        }

        .required {
          color: #dc2626;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4a9eff;
          box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          background: linear-gradient(135deg, #4a9eff 0%, #3b82f6 100%);
          color: white;
          padding: 14px 32px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
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
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
          border-radius: 12px;
          border: 2px solid #22c55e;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .success-message h3 {
          color: #16a34a;
          font-size: 24px;
          margin-bottom: 15px;
        }

        .success-message p {
          color: #15803d;
          font-size: 16px;
          line-height: 1.6;
        }

        .error-message {
          background: rgba(220, 38, 38, 0.1);
          border: 2px solid #dc2626;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .contact-form-container {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}