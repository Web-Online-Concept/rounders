import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      {/* Section 1 */}
      <div className="mb-12 p-6 rounded-2xl shadow-lg bg-white">
        <img
          src="/images/affiliation.jpg"
          alt="Affiliation"
          className="w-full h-60 object-cover rounded-xl mb-6"
        />
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>💰</span> 50 % de commissions reversées
        </h2>
        <p className="mb-2">
          Contrairement aux autres affiliés, nous vous reversons <strong>50 % de notre commission Stake</strong>.
          Cela signifie que plus vous jouez, plus vous récupérez d&#39;argent en retour, chaque semaine !
        </p>
        <p>
          Rejoignez notre communauté et commencez à profiter de notre programme exclusif.
        </p>
      </div>

      {/* Section 2 */}
      <div className="mb-12 p-6 rounded-2xl shadow-lg bg-white">
        <img
          src="/images/commissions.jpg"
          alt="Suivi commissions"
          className="w-full h-60 object-cover rounded-xl mb-6"
        />
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>📊</span> Suivi des gains & paiements
        </h2>
        <p className="mb-2">
          Consultez en temps réel vos gains affiliés, les commissions que vous avez générées, et les paiements déjà effectués.
        </p>
        <p className="mb-4">
          Vous savez toujours où vous en êtes, en toute transparence.
        </p>
        <Link href="/commissions" className="text-blue-600 hover:underline">
          → Voir mes commissions
        </Link>
      </div>

      {/* Section 3 */}
      <div className="p-6 rounded-2xl shadow-lg bg-white">
        <img
          src="/images/guide.jpg"
          alt="Guide complet"
          className="w-full h-60 object-cover rounded-xl mb-6"
        />
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>📚</span> Guide complet Stake
        </h2>
        <p className="mb-4">
          Vous débutez sur Stake ? Découvrez notre guide complet pour apprendre à vous inscrire,
          activer les bonus, jouer en sécurité, devenir VIP et plus encore.
        </p>
        <Link href="/guide/inscription" className="text-blue-600 hover:underline">
          → Accéder au guide Stake
        </Link>
      </div>
    </main>
  );
}
