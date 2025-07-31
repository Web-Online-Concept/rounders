// pages/guide/inscription.js
import Head from "next/head";
import Image from "next/image";

export default function GuideInscriptionPage() {
  return (
    <>
      <Head>
        <title>Inscription sur Stake - Guide</title>
        <meta
          name="description"
          content="Inscrivez-vous sur Stake en quelques clics et commencez à jouer avec notre lien affilié pour bénéficier d'avantages exclusifs."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">S'inscrire sur Stake</h1>

        <p className="text-lg mb-6">
          Créer un compte sur Stake est rapide et gratuit. En passant par notre
          lien affilié, vous accédez à nos offres exclusives et bénéficiez du suivi de vos commissions.
        </p>

        <div className="mb-6">
          <Image
            src="/images/inscription-stake.jpg"
            alt="Formulaire d'inscription Stake"
            width={800}
            height={450}
            className="rounded-xl shadow"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Étapes pour s'inscrire</h2>
        <ol className="list-decimal list-inside text-lg space-y-2 mb-6">
          <li>
            Cliquez sur notre lien affilié :{" "}
            <a
              href="https://stake.bet/?c=rounders&offer=rounders"
              className="text-blue-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              stake.bet/?c=rounders&offer=rounders
            </a>
          </li>
          <li>Choisissez un nom d'utilisateur et un mot de passe</li>
          <li>Entrez une adresse email valide</li>
          <li>Validez votre inscription et connectez-vous</li>
        </ol>

        <p className="text-lg">
          Une fois connecté, vous pourrez déposer des fonds en crypto et commencer à
          jouer immédiatement.
        </p>
      </section>
    </>
  );
}
