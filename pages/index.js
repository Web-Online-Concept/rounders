// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rounders - Affiliation Stake</title>
      </Head>

      <main className="flex flex-col items-center px-4 py-10 bg-gray-100">
        <div className="w-full max-w-4xl space-y-16">
          {/* Bloc 1 - Présentation */}
          <section className="bg-white rounded-2xl shadow-md p-6 text-center">
            <img
              src="/images/presentation.jpg"
              alt="Présentation"
              className="mx-auto mb-4 rounded-2xl shadow"
            />
            <h2 className="text-2xl font-bold mb-2">Gagnez plus avec notre affiliation Stake</h2>
            <p className="text-gray-700">
              Rejoignez notre programme et recevez <span className="font-semibold">50% de nos commissions affiliées</span>. En plus des avantages Stake, vous bénéficiez d'un suivi transparent et de paiements garantis chaque mois.
            </p>
          </section>

          {/* Bloc 2 - Commissions */}
          <section className="bg-white rounded-2xl shadow-md p-6 text-center">
            <img
              src="/images/commissions.jpg"
              alt="Commissions"
              className="mx-auto mb-4 rounded-2xl shadow"
            />
            <h2 className="text-2xl font-bold mb-2">Suivi des commissions et paiements</h2>
            <p className="text-gray-700">
              Consultez votre tableau de bord pour suivre vos gains, voir les paiements effectués et accéder à votre historique. Tout est automatisé pour une gestion simple et transparente.
            </p>
            <Link href="/commissions">
              <span className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
                Voir mes commissions
              </span>
            </Link>
          </section>

          {/* Bloc 3 - Guide Stake */}
          <section className="bg-white rounded-2xl shadow-md p-6 text-center">
            <img
              src="/images/guide.jpg"
              alt="Guide Stake"
              className="mx-auto mb-4 rounded-2xl shadow"
            />
            <h2 className="text-2xl font-bold mb-2">Le guide complet Stake</h2>
            <p className="text-gray-700">
              Découvrez comment maximiser vos bonus, explorer tous les jeux proposés, et optimiser votre expérience Stake grâce à notre guide détaillé.
            </p>
            <Link href="/guide">
              <span className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
                Lire le guide complet
              </span>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
