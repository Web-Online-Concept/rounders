// pages/guide/index.js
import Head from "next/head";
import Image from "next/image";

export default function GuideIndexPage() {
  return (
    <>
      <Head>
        <title>Guide Stake - Présentation</title>
        <meta
          name="description"
          content="Découvrez Stake, la plateforme de jeux crypto leader. Apprenez à vous inscrire, à jouer, à déposer et à maximiser vos gains."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Guide Stake</h1>

        <p className="text-lg mb-6">
          Bienvenue dans notre guide complet consacré à <strong>Stake</strong>,
          l&apos;un des casinos en ligne les plus populaires au monde, notamment
          pour ses jeux exclusifs, ses bonus attractifs et ses paiements rapides
          en crypto-monnaies.
        </p>

        <div className="mb-6">
          <Image
            src="/images/stake-overview.jpg"
            alt="Aperçu de Stake"
            width={800}
            height={450}
            className="rounded-xl shadow"
          />
        </div>

        <p className="text-lg mb-6">
          Notre objectif est de vous guider pas à pas, que vous soyez débutant
          ou expérimenté. Vous trouverez ici toutes les informations pour :
        </p>

        <ul className="list-disc list-inside text-lg mb-8 space-y-2">
          <li>Créer un compte Stake avec notre lien affilié</li>
          <li>Profiter des promotions et bonus exclusifs</li>
          <li>Explorer les jeux disponibles (casino & paris sportifs)</li>
          <li>Comprendre les paiements en crypto</li>
          <li>Jouer en toute sécurité et anonymat</li>
        </ul>

        <p className="text-lg">
          Utilisez le menu ou les liens ci-dessous pour accéder à chaque section du guide.
        </p>
      </section>
    </>
  );
}
