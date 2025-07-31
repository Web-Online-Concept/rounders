// pages/commissions.js
import Head from "next/head";

export default function CommissionsPage() {
  return (
    <>
      <Head>
        <title>Mes Commissions - Rounders</title>
        <meta name="description" content="Consultez vos gains affiliés sur Stake et suivez en temps réel les reversements effectués." />
      </Head>
      <main className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Suivi des commissions affiliées</h1>
        <p className="mb-4">
          Cette page affichera pour chaque affilié inscrit via Rounders :
        </p>
        <ul className="list-disc pl-6">
          <li>Le montant total généré en commission</li>
          <li>La part reversée (50 %)</li>
          <li>Les paiements déjà effectués (manuellement cochés)</li>
          <li>Un historique des gains par période</li>
        </ul>
        <p className="mt-4 italic">
          Les données seront mises à jour régulièrement pour garantir un suivi transparent et fiable.
        </p>
      </main>
    </>
  );
}
