// pages/guide.js
import Head from "next/head";

export default function GuidePage() {
  return (
    <>
      <Head>
        <title>Guide Stake - Rounders</title>
        <meta name="description" content="Guide complet pour bien débuter sur Stake : inscription, vérification, dépôts, jeux, sécurité, et plus." />
      </Head>
      <main className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Guide complet Stake</h1>
        <p className="mb-4">
          Cette page contiendra toutes les explications pour bien démarrer sur Stake :
        </p>
        <ul className="list-disc pl-6">
          <li>Comment s’inscrire avec notre lien d’affiliation</li>
          <li>Vérification du compte (KYC)</li>
          <li>Méthodes de dépôt et retrait</li>
          <li>Sécurité du compte et authentification</li>
          <li>Comprendre les jeux et le système VIP</li>
        </ul>
      </main>
    </>
  );
}
