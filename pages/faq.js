// pages/faq.js
import Head from "next/head";

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ Stake - Rounders</title>
        <meta name="description" content="Foire aux questions : tout savoir sur Stake, l'affiliation, les bonus et les paiements." />
      </Head>
      <main className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Foire aux questions (FAQ)</h1>
        <p className="mb-4">Vous trouverez ici les réponses aux questions les plus fréquentes :</p>
        <ul className="list-disc pl-6">
          <li>Comment fonctionne le programme d'affiliation ?</li>
          <li>Quand les commissions sont-elles versées ?</li>
          <li>Est-ce que Stake est légal / fiable ?</li>
          <li>Quels sont les bonus disponibles ?</li>
          <li>Comment contacter le support ?</li>
        </ul>
      </main>
    </>
  );
}
