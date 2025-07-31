// pages/guide/securite.js
import Head from "next/head";
import Image from "next/image";

export default function GuideSecuritePage() {
  return (
    <>
      <Head>
        <title>Sécuriser son compte Stake</title>
        <meta
          name="description"
          content="Protégez votre compte Stake avec l'authentification 2FA et des conseils de sécurité essentiels pour éviter les vols ou pertes."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Sécurité du compte Stake</h1>

        <p className="text-lg mb-6">
          Stake est une plateforme sécurisée, mais il est essentiel de mettre en place quelques mesures pour éviter toute mauvaise surprise. Voici nos conseils pour sécuriser au maximum votre compte.
        </p>

        <div className="mb-6">
          <Image
            src="/images/securite-stake.jpg"
            alt="Sécurité sur Stake"
            width={800}
            height={450}
            className="rounded-xl shadow"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">🔐 Activez l’authentification 2FA</h2>
        <p className="text-lg mb-4">
          L’authentification à deux facteurs (2FA) ajoute une couche de sécurité à votre compte.
          Elle est fortement recommandée.
        </p>
        <ul className="list-disc list-inside text-lg mb-6 space-y-2">
          <li>Utilisez une application comme Google Authenticator ou Authy</li>
          <li>Scannez le QR code dans les paramètres de sécurité de votre compte Stake</li>
          <li>Conservez bien la clé de secours pour restaurer l’accès en cas de perte</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">🧠 Conseils supplémentaires</h2>
        <ul className="list-disc list-inside text-lg space-y-2 mb-6">
          <li>Ne partagez jamais votre mot de passe, ni vos identifiants Stake</li>
          <li>Évitez d’utiliser des appareils publics ou partagés pour vous connecter</li>
          <li>Sauvegardez régulièrement votre clé 2FA sur un support sécurisé</li>
          <li>Utilisez un gestionnaire de mots de passe pour générer des mots complexes</li>
          <li>Vérifiez toujours l’URL du site (https://stake.bet)</li>
        </ul>

        <p className="text-lg">
          En suivant ces conseils, vous réduisez drastiquement les risques de perte ou de piratage de votre compte Stake.
        </p>
      </section>
    </>
  );
}
