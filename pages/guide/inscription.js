import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Inscription() {
  return (
    <Layout title="Inscription sur Stake">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Comment s’inscrire sur Stake</h1>

        <p className="mb-4">
          Voici la procédure simple pour s’inscrire en toute sécurité sur Stake :
        </p>

        <ol className="list-decimal list-inside mb-4 space-y-2">
          <li>
            Rendez-vous sur notre lien d’affiliation :{' '}
            <Link href="/" className="text-blue-600 underline">
              rounders.pro
            </Link>
          </li>
          <li>Créez un compte avec une adresse e-mail valide.</li>
          <li>
            Validez votre inscription et connectez-vous. Vous êtes désormais affilié à notre équipe Rounders.
          </li>
        </ol>

        <p className="mb-4">
          Vous pouvez ensuite commencer à déposer des cryptos pour jouer, et suivre vos gains affiliés dans votre espace personnel.
        </p>
      </div>
    </Layout>
  );
}
