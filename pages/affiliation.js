// pages/affiliation.js
import Head from "next/head";

export default function AffiliationPage() {
  return (
    <>
      <Head>
        <title>Affiliation - Rounders</title>
        <meta
          name="description"
          content="Découvrez notre programme d'affiliation Stake avec reversement de 50 % des commissions !"
        />
      </Head>

      <section className="max-w-4xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">Notre Programme d&apos;Affiliation</h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Nous offrons l&apos;un des meilleurs programmes d&apos;affiliation Stake en reversant
            <strong className="text-green-400"> 50 % de nos commissions</strong> à nos affiliés.
          </p>

          <p>
            Que vous soyez un joueur régulier, un influenceur ou un parrain, notre système
            est conçu pour vous offrir une transparence totale et des paiements manuels réguliers.
          </p>

          <p>
            En rejoignant notre réseau, vous accédez à :
          </p>

          <ul className="list-disc list-inside pl-4">
            <li>Un lien unique d&apos;inscription Stake</li>
            <li>Un tableau de suivi de vos gains</li>
            <li>Un historique clair de vos paiements</li>
            <li>Un support réactif en cas de besoin</li>
          </ul>

          <p className="mt-4">
            <strong>Inscrivez-vous</strong> dès maintenant via notre lien ou contactez-nous pour plus d&apos;informations.
          </p>
        </div>
      </section>
    </>
  );
}
