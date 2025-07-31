// pages/bonus.js
import Head from "next/head";

export default function BonusPage() {
  return (
    <>
      <Head>
        <title>Bonus Stake - Rounders</title>
        <meta name="description" content="Découvrez tous les bonus Stake : rakeback, cashback, parrainage et autres offres exclusives." />
      </Head>
      <main className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Bonus Stake</h1>
        <p className="mb-2">Cette page présentera en détail tous les bonus disponibles sur Stake :</p>
        <ul className="list-disc pl-6">
          <li>Bonus VIP (Rakeback, Cashback, Boosts)</li>
          <li>Code promotionnel Rounders</li>
          <li>Offres limitées ou événementielles</li>
          <li>Réductions ou reversements affiliés</li>
        </ul>
      </main>
    </>
  );
}
