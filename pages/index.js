import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Head>
        <title>Rounders - 50% de commissions Stake</title>
        <meta
          name="description"
          content="Rejoignez notre communauté et récupérez 50 % de notre commission Stake chaque semaine. Suivi des gains en temps réel. Guide complet pour débuter."
        />
      </Head>

      <section className="text-center mt-10">
        <Image
          src="/images/coins.png"
          alt="Affiliation"
          width={100}
          height={100}
          className="mx-auto rounded-xl shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4">50 % de commissions reversées</h2>
        <p className="mt-2">
          Contrairement aux autres affiliés, nous vous reversons <strong>50 % de notre commission Stake</strong>. Cela signifie que plus vous jouez, plus vous récupérez d'argent en retour, chaque semaine !<br />
          Rejoignez notre communauté et commencez à profiter de notre programme exclusif.
        </p>
      </section>

      <section className="text-center mt-10">
        <Image
          src="/images/stats.png"
          alt="Suivi commissions"
          width={100}
          height={100}
          className="mx-auto rounded-xl shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4">Suivi des gains & paiements</h2>
        <p className="mt-2">
          Consultez en temps réel vos gains affiliés, les commissions que vous avez générées, et les paiements déjà effectués.<br />
          Vous savez toujours où vous en êtes, en toute transparence.
        </p>
        <Link href="/commissions" className="text-blue-600 underline hover:text-blue-800 inline-block mt-2">
          → Voir mes commissions
        </Link>
      </section>

      <section className="text-center mt-10 mb-10">
        <Image
          src="/images/guide.png"
          alt="Guide complet"
          width={100}
          height={100}
          className="mx-auto rounded-xl shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4">Guide complet Stake</h2>
        <p className="mt-2">
          Vous débutez sur Stake ? Découvrez notre guide complet pour apprendre à vous inscrire, activer les bonus, jouer en sécurité, devenir VIP et plus encore.
        </p>
        <Link href="/guide" className="text-blue-600 underline hover:text-blue-800 inline-block mt-2">
          → Accéder au guide Stake
        </Link>
      </section>
    </div>
  )
}
