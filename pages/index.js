// pages/index.js

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Bienvenue sur Rounders.pro
      </h1>

      <p className="text-lg max-w-2xl text-center mb-8">
        Découvrez Stake, la plateforme de jeux crypto numéro 1 au monde. En
        passant par notre lien, vous bénéficiez de <strong>bonus exclusifs</strong>,
        d’un <strong>accompagnement VIP</strong>, et jusqu’à <strong>50% de cashback</strong>.
      </p>

      <a
        href="https://stake.bet/fr?c=TONCODE" // Remplace TONCODE par ton code affilié réel
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
      >
        🎰 S’inscrire maintenant
      </a>

      <div className="mt-12 text-center text-sm text-gray-400 max-w-xl">
        Rounders.pro est un guide indépendant dédié à Stake : astuces, bonus,
        stratégies et suivi des commissions. Commencez à jouer avec un avantage !
      </div>
    </div>
  );
}
