// pages/guide/faq.js
import Head from "next/head";

export default function GuideFAQPage() {
  return (
    <>
      <Head>
        <title>FAQ – Questions fréquentes sur Stake</title>
        <meta
          name="description"
          content="Toutes les réponses aux questions fréquentes sur Stake : inscription, bonus, affiliation, sécurité, paiements."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8">FAQ – Foire aux questions</h1>

        <div className="space-y-8 text-lg">
          <div>
            <h2 className="font-semibold text-xl mb-2">📝 Comment s'inscrire sur Stake ?</h2>
            <p>
              Vous pouvez créer un compte en cliquant sur notre lien affilié. Renseignez un nom d'utilisateur, un mot de passe et une adresse e-mail. L’inscription prend moins d'une minute.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-2">🎁 Comment bénéficier du rakeback et des bonus ?</h2>
            <p>
              Si vous êtes passé par notre lien, contactez-nous pour activer votre rakeback. Vous recevrez ensuite un pourcentage régulier de vos mises. Des reloads et des concours bonus sont aussi proposés chaque semaine.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-2">💸 Comment fonctionnent les commissions affiliées ?</h2>
            <p>
              Chaque joueur affilié nous génère une commission selon ses mises. Nous reversons 50&nbsp;% de cette commission à nos affiliés chaque mois. Un tableau de suivi est accessible pour voir les détails.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-2">🔐 Mon compte Stake est-il sécurisé ?</h2>
            <p>
              Stake utilise une connexion chiffrée (SSL) et vous pouvez activer l’authentification 2FA. Ne partagez jamais vos identifiants. Utilisez un mot de passe fort et changez-le régulièrement.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-2">📥 Comment déposer ou retirer des fonds ?</h2>
            <p>
              Stake accepte les dépôts en cryptomonnaies (BTC, ETH, USDT, etc.). Pour retirer, utilisez la même crypto. Aucun justificatif n’est requis, sauf en cas de suspicion d’abus.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-2">📞 Comment vous contacter ?</h2>
            <p>
              Vous pouvez nous écrire depuis la page de contact (lien en bas de page) ou via Telegram pour les affiliés. Nous répondons généralement dans les 24&nbsp;h.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
