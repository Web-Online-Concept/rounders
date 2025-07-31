// pages/classement.js
import Head from "next/head";

export default function ClassementPage() {
  return (
    <>
      <Head>
        <title>Classement Affiliés - Rounders</title>
        <meta name="description" content="Classement des affiliés les plus actifs et performants sur Stake. Suivez votre position et vos gains." />
      </Head>
      <main className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Classement des affiliés</h1>
        <p className="mb-4">
          Cette page affichera un classement des affiliés selon leurs performances :
        </p>
        <ul className="list-disc pl-6">
          <li>Montant total misé par affilié</li>
          <li>Commissions générées</li>
          <li>Reversements déjà effectués</li>
          <li>Date de dernière activité</li>
        </ul>
        <p className="mt-4 italic">Le but est de motiver la communauté à être active et régulière !</p>
      </main>
    </>
  );
}
