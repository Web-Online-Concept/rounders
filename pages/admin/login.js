import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (data.success) {
        // Stocker le token dans localStorage
        localStorage.setItem('adminToken', data.token);
        // Rediriger vers la page affiliates au lieu de dashboard
        router.push('/admin/affiliates');
      } else {
        setError(data.error || 'Identifiants incorrects');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Connexion Admin - Rounders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="login-page">
        <div className="login-container">
          <div className="login-box">
            <div className="login-header">
              <h1>Administration</h1>
              <p>Connectez-vous pour accéder au back-office</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@rounders.pro"
                  className="form-input"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="form-input"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a2c38 0%, #2d4356 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-container {
          width: 100%;
          max-width: 440px;
        }

        .login-box {
          background: white;
          border-radius: 20px;
          padding: 40px 50px 50px 50px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          margin-top: -250px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-header h1 {
          color: #1a2c38;
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .login-header p {
          color: #64748b;
          font-size: 16px;
        }

        .login-form {
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
          color: #1a2c38;
          font-weight: 600;
          font-size: 14px;
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

        .error-message {
          background: rgba(255, 107, 107, 0.1);
          border: 2px solid #ff6b6b;
          color: #ff6b6b;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 30px;
          }

          .login-header h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}