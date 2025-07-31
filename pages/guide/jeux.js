// pages/guide/jeux.js
import Head from "next/head";
import Image from "next/image";

export default function GuideJeuxPage() {
  return (
    <>
      <Head>
        <title>Jeux de casino et paris sportifs sur Stake</title>
        <meta
          name="description"
          content="Stake propose des milliers de jeux de casino, des paris sportifs en direct et des jeux exclusifs originaux. Découvrez tout l'univers Stake."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Les Jeux sur Stake</h1>

        <p className="text-lg mb-6">
          Stake est connu pour sa variété impressionnante de jeux. Vous y trouverez tous les grands
          classiques du casino, les paris sportifs en direct, et des jeux originaux exclusifs à la plateforme.
        </p>

        <div className="mb-6">
          <Image
            src="/images/jeux-stake.jpg"
            alt="Interface des jeux sur Stake"
            width={800}
            height={450}
            className="rounded-xl shadow"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">🎰 Casino en ligne</h2>
        <ul className="list-disc list-inside text-lg mb-6 space-y-2">
          <li>Machines à sous (slots)</li>
          <li>Jeux en direct : Blackjack, Roulette, Baccarat, Game Shows</li>
          <li>Jackpots progressifs</li>
          <li>Jeux de table classiques</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">🏀 Paris Sportifs</h2>
        <ul className="list-disc list-inside text-lg mb-6 space-y-2">
          <li>Paris en direct (Live betting)</li>
          <li>Football, Tennis, Basketball, eSport, UFC, etc.</li>
          <li>Paris combinés et systèmes</li>
          <li>Cashout partiel disponible</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">🕹️ Jeux Originaux Stake</h2>
        <p className="text-lg mb-6">
          Stake développe également ses propres jeux, avec une interface unique et des RTP transparents :
        </p>
        <ul className="list-disc list-inside text-lg space-y-2 mb-6">
          <li>Plinko</li>
          <li>Crash</li>
          <li>Dice</li>
          <li>Mines</li>
          <li>Limbo</li>
          <li>Roulette Stake</li>
        </ul>

        <p className="text-lg">
          Tous les jeux sont accessibles sans téléchargement, directement depuis votre navigateur.
        </p>
      </section>
    </>
  );
}
