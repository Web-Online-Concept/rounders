// pages/faq.js
import Head from "next/head";

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ - Rounders</title>
        <meta
          name="description"
          content="Foire aux questions sur l'affiliation Stake, les bonus, et le fonctionnement de notre programme Rounders."
        />
      </Head>
      <main className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">FAQ - Questions fréquentes</h1>
        <p className="mb-6">
          Vous trouverez ici les réponses aux questions les plus courantes sur Stake, les bonus, et notre programme d&apos;affiliation Rounders.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">1. Stake est-il fiable et légal ?</h2>
            <p>
              Oui. Stake est un site de jeux licencié à Curaçao, utilisé par des millions de joueurs dans le monde. Il est recommandé d&apos;utiliser un VPN pour y accéder depuis certains pays.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">2. Que gagne un affilié chez Rounders ?</h2>
            <p>
              Nous reversons 50 % de nos commissions à nos affiliés. Vous bénéficiez d&apos;un suivi transparent de vos gains et paiements.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">3. Comment recevoir mes paiements ?</h2>
            <p>
              Les paiements sont effectués manuellement en crypto (USDT, BTC...) chaque semaine. Vous pouvez vérifier votre solde à tout moment dans la page &quot;Commissions&quot;.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">4. Puis-je parrainer d&apos;autres joueurs ?</h2>
            <p>
              Oui, c&apos;est même recommandé. Vous recevrez également une part de leurs commissions si vous êtes à l&apos;origine de leur inscription.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">5. Que se passe-t-il si je perds l&apos;accès à mon compte Stake ?</h2>
            <p>
              Contactez le support Stake directement. De notre côté, nous pouvons retrouver votre lien d&apos;affiliation pour vous permettre de suivre vos commissions.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
