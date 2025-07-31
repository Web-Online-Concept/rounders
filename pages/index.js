// pages/index.js
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rounders - Affiliation Stake</title>
        <meta name="description" content="Gagnez 50% de nos commissions affiliées Stake. Programme transparent avec paiements mensuels garantis et guide complet." />
        <meta name="keywords" content="stake, affiliation, casino, crypto, commissions, bonus" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Grille de 3 colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Bloc 1 - Présentation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl flex flex-col">
              <div className="p-6 text-center flex-1 flex flex-col">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <Image
                    src="/images/presentation.jpg"
                    alt="Présentation du programme d&apos;affiliation"
                    fill
                    className="rounded-full object-cover shadow-md"
                    sizes="96px"
                    priority
                  />
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">
                  Gagnez plus avec notre affiliation Stake
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  Rejoignez notre programme et recevez <span className="font-semibold text-green-600">50% de nos commissions affiliées</span>. 
                  En plus des avantages Stake, vous bénéficiez d&apos;un suivi transparent et de paiements garantis chaque mois.
                </p>
                <div className="mt-auto">
                  <Link href="/affiliation">
                    <span className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer text-sm">
                      En savoir plus
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bloc 2 - Commissions */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl flex flex-col">
              <div className="p-6 text-center flex-1 flex flex-col">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <Image
                    src="/images/commissions.jpg"
                    alt="Suivi des commissions"
                    fill
                    className="rounded-full object-cover shadow-md"
                    sizes="96px"
                  />
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">
                  Suivi des commissions et paiements
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  Consultez votre tableau de bord pour suivre vos gains en temps réel, 
                  voir les paiements effectués et accéder à votre historique complet. 
                  Tout est automatisé pour une gestion simple et transparente.
                </p>
                <div className="mt-auto">
                  <Link href="/commissions">
                    <span className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer text-sm">
                      Voir mes commissions
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bloc 3 - Guide Stake */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl flex flex-col">
              <div className="p-6 text-center flex-1 flex flex-col">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <Image
                    src="/images/guide.jpg"
                    alt="Guide complet Stake"
                    fill
                    className="rounded-full object-cover shadow-md"
                    sizes="96px"
                  />
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">
                  Le guide complet Stake
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  Découvrez comment maximiser vos bonus, explorer tous les jeux proposés, 
                  comprendre les cryptomonnaies et optimiser votre expérience Stake 
                  grâce à notre guide détaillé et nos conseils d&apos;experts.
                </p>
                <div className="mt-auto">
                  <Link href="/guide">
                    <span className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer text-sm">
                      Lire le guide complet
                    </span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Call to Action final */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Prêt à commencer ? Inscrivez-vous sur Stake avec notre lien affilié
            </p>
            <a 
              href="https://stake.com/?c=rounders" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Rejoindre Stake maintenant
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

        </div>
      </main>
    </>
  );
}