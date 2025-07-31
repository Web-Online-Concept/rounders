import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center py-10 px-4 max-w-5xl mx-auto">
      <div className="mb-10 w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <img src="/images/affiliation.png" alt="Affiliation" className="rounded-xl w-full mb-4" />
        <h2 className="text-xl font-bold mb-2">💰 50 % de commissions reversées</h2>
        <p className="text-gray-700 mb-2">
          Contrairement aux autres affiliés, nous vous reversons <strong>50 % de notre commission Stake</strong>. Cela signifie que plus vous jouez, plus vous récupérez d&apos;argent en retour, chaque semaine !
        </p>
        <p className="text-gray-700">Rejoignez notre communauté et commencez à profiter de notre programme exclusif.</p>
      </div>

      <div className="mb-10 w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <img src="/images/suivi.png" alt="Suivi commissions" className="rounded-xl w-full mb-4" />
        <h2 className="text-xl font-bold mb-2">📊 Suivi des gains & paiements</h2>
        <p className="text-gray-700 mb-2">
          Consultez en temps réel vos gains affiliés, les commissions que vous avez générées, et les paiements déjà effectués.
        </p>
        <p className="text-gray-700">Vous savez toujours où vous en êtes, en toute transparence.</p>
        <Link href="/commissions" className="text-blue-600 underline mt-2 inline-block">→ Voir mes commissions</Link>
      </div>

      <div className="mb-10 w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <img src="/images/guide.png" alt="Guide complet" className="rounded-xl w-full mb-4" />
        <h2 className="text-xl font-bold mb-2">📚 Guide complet Stake</h2>
        <p className="text-gray-700 mb-2">
          Vous débutez sur Stake ? Découvrez notre guide complet pour apprendre à vous inscrire, activer les bonus, jouer en sécurité, devenir VIP et plus encore.
        </p>
        <Link href="/guide/inscription" className="text-blue-600 underline mt-2 inline-block">→ Accéder au guide Stake</Link>
      </div>
    </main>
  );
}
