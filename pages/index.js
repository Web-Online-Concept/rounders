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
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Bande contenant les 3 blocs */}
          <div className="flex justify-center items-start gap-8">
            
            {/* Bloc 1 - À gauche */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden w-[250px] h-[600px] flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              {/* Image en haut */}
              <div className="h-[200px] relative overflow-hidden">
                <Image
                  src="/images/presentation.jpg"
                  alt="Présentation du programme d&apos;affiliation"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              {/* Texte en dessous */}
              <div className="p-6 flex-1 flex flex-col relative">
                <h2 className="text-xl font-bold mb-3 text-gray-800 text-center">
                  Gagnez plus avec notre affiliation Stake
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 text-center">
                  Rejoignez notre programme et recevez <span className="font-semibold text-green-600">50% de nos commissions affiliées</span>. 
                  Suivi transparent et paiements garantis chaque mois.
                </p>
                <Link href="/affiliation">
                  <span className="block text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 shadow-lg">
                    En savoir plus
                  </span>
                </Link>
              </div>
            </div>

            {/* Bloc 2 - Au centre */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden w-[250px] h-[600px] flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              {/* Image en haut */}
              <div className="h-[200px] relative overflow-hidden">
                <Image
                  src="/images/commissions.jpg"
                  alt="Suivi des commissions"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              {/* Texte en dessous */}
              <div className="p-6 flex-1 flex flex-col relative">
                <h2 className="text-xl font-bold mb-3 text-gray-800 text-center">
                  Suivi des commissions et paiements
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 text-center">
                  Tableau de bord en temps réel pour suivre vos gains. 
                  Historique complet et gestion automatisée transparente.
                </p>
                <Link href="/commissions">
                  <span className="block text-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 shadow-lg">
                    Voir mes commissions
                  </span>
                </Link>
              </div>
            </div>

            {/* Bloc 3 - À droite */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden w-[250px] h-[600px] flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              {/* Image en haut */}
              <div className="h-[200px] relative overflow-hidden">
                <Image
                  src="/images/guide.jpg"
                  alt="Guide complet Stake"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              {/* Texte en dessous */}
              <div className="p-6 flex-1 flex flex-col relative">
                <h2 className="text-xl font-bold mb-3 text-gray-800 text-center">
                  Le guide complet Stake
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 text-center">
                  Maximisez vos bonus, explorez les jeux et maîtrisez les cryptos 
                  avec notre guide détaillé et conseils d&apos;experts.
                </p>
                <Link href="/guide">
                  <span className="block text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 shadow-lg">
                    Lire le guide complet
                  </span>
                </Link>
              </div>
            </div>

          </div>

          {/* Call to Action final */}
          <div className="mt-20 text-center">
            <p className="text-gray-600 mb-6 text-lg">
              Prêt à commencer ? Inscrivez-vous sur Stake avec notre lien affilié
            </p>
            <a 
              href="https://stake.com/?c=rounders" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Rejoindre Stake maintenant
              <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

        </div>
      </main>
    </>
  );
}