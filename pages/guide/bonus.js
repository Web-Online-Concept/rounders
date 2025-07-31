// pages/guide/bonus.js
import Head from "next/head";
import Image from "next/image";

export default function GuideBonusPage() {
  return (
    <>
      <Head>
        <title>Bonus et promotions Stake</title>
        <meta
          name="description"
          content="Découvrez tous les bonus disponibles sur Stake : Rakeback, Reload, Drops, Challenges VIP et bien plus encore."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Les Bonus Stake</h1>

        <p className="text-lg mb-6">
          Stake propose une large gamme de bonus réguliers et personnalisés. Voici un aperçu des offres
          les plus populaires, et comment en profiter dès votre inscription.
        </p>

        <div className="mb-6">
          <Image
            src="/images/bonus-stake.jpg"
            alt="Bonus Stake casino"
            width={800}
            height={450}
            className="rounded-xl shadow"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">💰 Types de bonus disponibles</h2>
        <ul className="list-disc list-inside text-lg mb-6 space-y-2">
          <li><strong>Rakeback</strong> – récupérez un pourcentage de vos mises automatiquement</li>
          <li><strong>Reload</strong> – bonus quotidien offert selon votre activité</li>
          <li><strong>Challenges VIP</strong> – objectifs personnalisés avec récompenses en USDT</li>
          <li><strong>Drops & Wins</strong> – prix instantanés à gagner sur les machines</li>
          <li><strong>Concours spéciaux</strong> – paris sportifs, jeux exclusifs ou tournois Stake</li>
        </ul>

        <p className="text-lg mb-6">
          En vous inscrivant via notre lien affilié, vous bénéficiez aussi de :
        </p>

        <ul className="list-disc list-inside text-lg mb-8 space-y-2">
          <li>Accès à notre <strong>Rakeback immédiat</strong></li>
          <li>Participation à nos <strong>concours affiliés</strong> (bonus personnalisés)</li>
          <li>Reversement de <strong>50 % de notre commission affiliée</strong></li>
        </ul>

        <p className="text-lg">
          Ces bonus sont valables pour les joueurs de tous niveaux, du débutant au VIP confirmé.
        </p>
      </section>
    </>
  );
}
