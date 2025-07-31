// pages/index.js

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-green-400 mb-6">
        Rejoignez Stake avec un avantage exclusif
      </h1>

      <p className="text-lg text-center text-gray-300 max-w-2xl mb-6">
        En passant par notre lien affilié, vous bénéficiez non seulement de tous les bonus Stake,
        mais nous vous reversons également <strong>50 % de notre commission affiliée</strong>.
      </p>

      <p className="text-md text-center text-gray-400 max-w-xl mb-8">
        Vous savez à tout moment combien vous rapportez, et combien vous allez toucher.
        Suivi transparent, classement, reversements manuels : tout est fait pour récompenser nos affiliés.
      </p>

      <a
        href="https://stake.bet/?c=rounders&offer=rounders"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
      >
        🎰 S’inscrire maintenant
      </a>
    </div>
  );
}
