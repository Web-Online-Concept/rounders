import { useState } from 'react';

export default function AddAffiliateModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    stakeUsername: '',
    name: '',
    email: '',
    startingCommission: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.stakeUsername || !formData.name) {
      setError('Le pseudo Stake et le nom sont obligatoires');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/affiliates/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // Réinitialiser le formulaire
        setFormData({
          stakeUsername: '',
          name: '',
          email: '',
          startingCommission: ''
        });
        
        // Appeler le callback de succès
        if (onSuccess) {
          onSuccess(result.affiliate);
        }
        
        onClose();
      } else {
        setError(result.error || 'Erreur lors de l\'ajout');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Ajouter un affilié</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="stakeUsername">
              Pseudo Stake <span className="required">*</span>
            </label>
            <input
              type="text"
              id="stakeUsername"
              value={formData.stakeUsername}
              onChange={(e) => setFormData({...formData, stakeUsername: e.target.value})}
              placeholder="Ex: ************S10"
              required
            />
            <small>Le pseudo masqué tel qu'il apparaît sur Stake</small>
          </div>

          <div className="form-group">
            <label htmlFor="name">
              Nom <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Nom de l'affilié"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="email@exemple.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="startingCommission">
              Commission actuelle sur Stake (€)
            </label>
            <input
              type="number"
              id="startingCommission"
              step="0.01"
              value={formData.startingCommission}
              onChange={(e) => setFormData({...formData, startingCommission: e.target.value})}
              placeholder="0.00"
            />
            <small>La commission totale actuelle de l'affilié (point de départ)</small>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Ajout en cours...' : 'Ajouter l\'affilié'}
            </button>
          </div>
        </form>

        <div className="info-box">
          <p><strong>⚠️ Important :</strong> Les commissions ne sont calculées qu'à partir de l'inscription dans le programme. La commission actuelle servira de point de départ.</p>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .close-button:hover {
          background: #f0f0f0;
        }

        form {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }

        .required {
          color: #e74c3c;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #4a9eff;
        }

        .form-group small {
          display: block;
          margin-top: 5px;
          color: #666;
          font-size: 0.875rem;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .cancel-button,
        .submit-button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-button {
          background: #f0f0f0;
          color: #333;
        }

        .cancel-button:hover {
          background: #e0e0e0;
        }

        .submit-button {
          background: #4a9eff;
          color: white;
        }

        .submit-button:hover:not(:disabled) {
          background: #357abd;
        }

        .submit-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .info-box {
          margin: 0 20px 20px;
          padding: 15px;
          background: #f8f9fa;
          border-left: 4px solid #ffc107;
          border-radius: 4px;
        }

        .info-box p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .modal-content {
            width: 95%;
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
}