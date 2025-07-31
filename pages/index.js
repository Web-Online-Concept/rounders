
import Link from 'next/link'

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Bloc 1 : Affiliation */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img
          src="/images/affiliation.jpg"
          alt="Affiliation"
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 50 % de commissions reversées</h2>
          <p className="text-gray-700 mb-4">
            Contrairement aux autres affiliés, nous vous reversons <strong>50 %</strong> de notre commission Stake.
            Cela signifie que plus vous jouez, plus vous récupérez d'argent en retour, chaque semaine !
            Rejoignez notre communauté et commencez à profiter de notre programme exclusif.
          </p>
        </div>
      </div>

      {/* Bloc 2 : Commissions */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img
          src="/images/commissions.jpg"
          alt="Suivi des gains"
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">📈 Suivi des gains & paiements</h2>
          <p className="text-gray-700 mb-4">
            Consultez en temps réel vos gains affiliés, les commissions que vous avez générées, et les paiements déjà effectués.
            Vous savez toujours où vous en êtes, en toute transparence.
          </p>
          <Link href="/commissions" className="text-blue-600 hover:underline">→ Voir mes commissions</Link>
        </div>
      </div>

      {/* Bloc 3 : Guide Stake */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img
          src="/images/guide.jpg"
          alt="Guide Stake"
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 Guide complet Stake</h2>
          <p className="text-gray-700 mb-4">
            Vous débutez sur Stake ? Découvrez notre guide complet pour apprendre à vous inscrire, activer les bonus,
            jouer en sécurité, devenir VIP et plus encore.
          </p>
          <Link href="/guide/inscription" className="text-blue-600 hover:underline">→ Accéder au guide Stake</Link>
        </div>
      </div>
    </main>
  )
}
