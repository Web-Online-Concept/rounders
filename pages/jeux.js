// pages/jeux.js
import Head from "next/head";

export default function JeuxPage() {
  return (
    <>
      <Head>
        <title>Jeux Stake - Rounders</title>
        <meta name="description" content="Découvrez tous les jeux disponibles sur Stake : casino, jeux maison, paris sportifs et plus." />
      </Head>
      <main className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Les jeux disponibles sur Stake</h1>
        <p className="mb-4">
          Cette page présentera l’ensemble des jeux proposés par Stake :
        </p>
        <ul className="list-disc pl-6">
          <li>Jeux maison (Plinko, Mines, Crash, etc.)</li>
          <li>Machines à sous (Slots)</li>
          <li>Jeux de table (Blackjack, Roulette, Baccarat…)</li>
          <li>Casino en direct (Live Casino)</li>
          <li>Paris sportifs et eSports</li>
        </ul>
      </main>
    </>
  );
}
