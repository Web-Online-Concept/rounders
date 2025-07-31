// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Rounders – Affiliation Stake</title>
        <meta
          name="description"
          content="Profitez de 50 % de reversement sur nos commissions affiliées Stake. Suivez vos gains en temps réel et accédez à notre guide complet pour tout savoir sur Stake."
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        {/* Bloc 1 – Affiliation */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-3xl font-bold mb-4">💸 50 % de commissions reversées</h2>
          <p className="text-gray-700 text-lg">
            Contrairement aux autres affiliés, nous vous reversons **50 % de notre commission Stake**. 
            Cela signifie que plus vous jouez, plus vous récupérez d’argent en retour, chaque semaine !
            Rejoignez notre communauté et commencez à profiter de notre programme exclusif.
          </p>
        </section>

        {/* Bloc 2 – Commissions */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-3xl font-bold mb-4">📊 Suivi des gains & paiements</h2>
          <p className="text-gray-700 text-lg">
            Consultez en temps réel vos gains affiliés, les commissions que vous avez générées, 
            et les paiements déjà effectués. Vous savez toujours où vous en êtes, en toute transparence.
          </p>
          <Link href="/commissions" className="inline-block mt-4 text-blue-600 hover:underline font-semibold">
            → Voir mes commissions
          </Link>
        </section>

        {/* Bloc 3 – Guide Stake */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-3xl font-bold mb-4">🎓 Guide complet Stake</h2>
          <p className="text-gray-700 text-lg">
            Vous débutez sur Stake ? Découvrez notre guide complet pour apprendre à vous inscrire, activer 
            les bonus, jouer en sécurité, devenir VIP et plus encore.
          </p>
          <Link href="/guide" className="inline-block mt-4 text-blue-600 hover:underline font-semibold">
            → Accéder au guide Stake
          </Link>
        </section>
      </main>
    </>
  );
}
