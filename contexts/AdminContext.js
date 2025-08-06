import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  // État pour les affiliés
  const [affiliates, setAffiliates] = useState([]);
  
  // État pour les déclarations
  const [declarations, setDeclarations] = useState([]);
  
  // État pour les paiements
  const [payments, setPayments] = useState([]);

  // Charger les données depuis localStorage au montage
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (affiliates.length > 0) {
      localStorage.setItem('affiliates', JSON.stringify(affiliates));
    }
  }, [affiliates]);

  useEffect(() => {
    if (declarations.length > 0) {
      localStorage.setItem('declarations', JSON.stringify(declarations));
    }
  }, [declarations]);

  useEffect(() => {
    if (payments.length > 0) {
      localStorage.setItem('payments', JSON.stringify(payments));
    }
  }, [payments]);

  // Charger les données depuis localStorage
  const loadFromLocalStorage = () => {
    try {
      // Charger les affiliés
      const storedAffiliates = localStorage.getItem('affiliates');
      if (storedAffiliates) {
        setAffiliates(JSON.parse(storedAffiliates));
      }

      // Charger les déclarations
      const storedDeclarations = localStorage.getItem('declarations');
      if (storedDeclarations) {
        setDeclarations(JSON.parse(storedDeclarations));
      }

      // Charger les paiements
      const storedPayments = localStorage.getItem('payments');
      if (storedPayments) {
        setPayments(JSON.parse(storedPayments));
      }
    } catch (error) {
      console.error('Erreur lors du chargement depuis localStorage:', error);
    }
  };

  // Fonction pour mettre à jour un affilié (MODIFIÉE - ajout de lastUpdate)
  const updateAffiliate = (id, updates) => {
    setAffiliates(prev => prev.map(aff => 
      aff.id === id 
        ? { 
            ...aff, 
            ...updates,
            lastUpdate: new Date().toISOString() // AJOUT: Mise à jour automatique de la date
          } 
        : aff
    ));
  };

  // Fonction pour calculer les commissions (MODIFIÉE - ajout de lastUpdate et vérification isConfirmed)
  const calculateCommission = (affiliateId, newTotalBet, newTotalCommission) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    if (!affiliate) return null;

    // Calculer la différence avec les dernières valeurs sauvegardées
    const lastCommission = affiliate.lastTotalCommission || 0;
    const commissionDiff = newTotalCommission - lastCommission;
    
    // La part affilié est 50% de la différence SEULEMENT si l'affilié est confirmé
    const affiliateShare = affiliate.isConfirmed ? (commissionDiff / 2) : 0;
    
    // Message différent selon le statut
    const message = affiliate.isConfirmed 
      ? `Part affilié ajoutée : ${affiliateShare.toFixed(2)}€`
      : `Affilié non validé - Commission mise à jour mais pas de part à reverser`;
    
    // Mettre à jour l'affilié avec lastUpdate
    updateAffiliate(affiliateId, {
      totalBet: newTotalBet,
      totalCommission: newTotalCommission,
      pendingAmount: affiliate.pendingAmount + affiliateShare,
      lastTotalBet: newTotalBet,
      lastTotalCommission: newTotalCommission,
      lastUpdate: new Date().toISOString() // AJOUT: Mise à jour automatique de la date
    });

    return {
      commissionDiff,
      affiliateShare,
      newPendingAmount: affiliate.pendingAmount + affiliateShare,
      isConfirmed: affiliate.isConfirmed,
      message
    };
  };

  // Fonction pour enregistrer un paiement (MODIFIÉE - ajout de lastUpdate)
  const recordPayment = (affiliateId, amount) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    if (!affiliate) return;

    // Créer un nouveau paiement
    const newPayment = {
      id: payments.length + 1,
      affiliateId,
      pseudo: affiliate.pseudoReal || affiliate.pseudoMasked,
      amount,
      date: new Date().toISOString().split('T')[0],
      method: 'Virement',
      status: 'pending'
    };

    setPayments([...payments, newPayment]);

    // Mettre à jour l'affilié avec lastUpdate
    updateAffiliate(affiliateId, {
      paidAmount: affiliate.paidAmount + amount,
      pendingAmount: 0,
      lastTotalBet: affiliate.totalBet,
      lastTotalCommission: affiliate.totalCommission,
      lastUpdate: new Date().toISOString() // AJOUT: Mise à jour automatique de la date
    });
  };

  // Fonction pour supprimer un affilié
  const deleteAffiliate = (id) => {
    setAffiliates(prev => prev.filter(aff => aff.id !== id));
  };

  // Fonction pour obtenir les statistiques
  const getStats = () => {
    const confirmedAffiliates = affiliates.filter(a => a.isConfirmed).length;
    const totalAffiliates = affiliates.length;
    const pendingDeclarations = declarations.filter(d => d.status === 'pending').length;
    const totalCommissions = affiliates.reduce((sum, a) => sum + (a.totalCommission || 0), 0);
    const totalPaid = affiliates.reduce((sum, a) => sum + (a.paidAmount || 0), 0);
    const unpaidCommissions = affiliates.reduce((sum, a) => sum + (a.pendingAmount || 0), 0);

    return {
      confirmedAffiliates,
      totalAffiliates,
      pendingDeclarations,
      totalCommissions,
      totalPaid,
      unpaidCommissions
    };
  };

  const value = {
    // États
    affiliates,
    setAffiliates,
    declarations,
    setDeclarations,
    payments,
    setPayments,
    
    // Fonctions
    updateAffiliate,
    deleteAffiliate,
    calculateCommission,
    recordPayment,
    getStats
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin doit être utilisé dans un AdminProvider');
  }
  return context;
}