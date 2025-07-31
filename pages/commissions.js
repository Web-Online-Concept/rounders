// pages/commissions.js
import Head from "next/head";

export default function CommissionsPage() {
  return (
    <>
      <Head>
        <title>Commissions - Rounders</title>
        <meta
          name="description"
          content="Suivi des commissions et paiements pour tous nos affiliés Stake. Transparence et reversement de 50 % garanti."
        />
      </Head>

      <section className="max-w-4xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">Suivi des Commissions</h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Nous mettons à votre disposition un tableau de suivi mis à jour
            régulièrement pour consulter :
          </p>

          <ul className="list-disc list-inside pl-4">
            <li>Le total des dépôts générés par vos filleuls</li>
            <li>La commission générée (selon le taux Stake)</li>
            <li>La part qui vous revient (50 % garantis)</li>
            <li>L&apos;historique des paiements manuels effectués</li>
          </ul>

          <p>
            Ce système est mis en place pour garantir une
            <strong className="text-green-400"> transparence totale</strong>.
            Vous saurez à tout moment combien vous avez généré
            et combien vous allez recevoir.
          </p>

          <p className="mt-4">
            <strong>Note :</strong> Les paiements sont effectués manuellement via la fonction
            &quot;Pourboire&quot; sur Stake, généralement chaque semaine ou sur demande.
          </p>
        </div>
      </section>
    </>
  );
}
