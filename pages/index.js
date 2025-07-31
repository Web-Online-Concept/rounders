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
          
          {/* 3 blocs verticaux côte à côte */}
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            
            {/* Bloc 1 - Présentation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full md:w-[300px] h-[600px] flex flex-col">
              {/* Image en haut */}
              <div className="h-[200px] relative">
                <Image
                  src="/images/presentation.jpg"
                  alt="Présentation du programme d&apos;affiliation"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Contenu en dessous */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  Gagnez plus avec notre affiliation Stake
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  Rejoignez notre programme et recevez <span className="font-semibold text-green-600">50% de nos commissions affiliées</span>. 
                  En plus des avantages Stake, vous bénéficiez d&apos;un suivi transparent et de paiements garantis chaque mois.
                </p>
                <Link href="/affiliation">
                  <span className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 cursor-pointer">
                    En savoir plus
                  </span>
                </Link>
              </div>
            </div>

            {/* Bloc 2 - Commissions */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full md:w-[300px] h-[600px] flex flex-col">
              {/* Image en haut */}
              <div className="h-[200px] relative">
                <Image
                  src="/images/commissions.jpg"
                  alt="Suivi des commissions"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Contenu en dessous */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  Suivi des commissions et paiements
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  Consultez votre tableau de bord pour suivre vos gains en temps réel, 
                  voir les paiements effectués et accéder à votre historique complet. 
                  Tout est automatisé pour une gestion simple et transparente.
                </p>
                <Link href="/commissions">
                  <span className="block text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 cursor-pointer">
                    Voir mes commissions
                  </span>
                </Link>
              </div>
            </div>

            {/* Bloc 3 - Guide Stake */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full md:w-[300px] h-[600px] flex flex-col">
              {/* Image en haut */}
              <div className="h-[200px] relative">
                <Image
                  src="/images/guide.jpg"
                  alt="Guide complet Stake"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Contenu en dessous */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  Le guide complet Stake
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  Découvrez comment maximiser vos bonus, explorer tous les jeux proposés, 
                  comprendre les cryptomonnaies et optimiser votre expérience Stake 
                  grâce à notre guide détaillé et nos conseils d&apos;experts.
                </p>
                <Link href="/guide">
                  <span className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 cursor-pointer">
                    Lire le guide complet
                  </span>
                </Link>
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