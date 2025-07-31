import Layout from '../../components/Layout';

export default function FAQ() {
  return (
    <Layout title="Foire aux questions">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Foire aux questions</h1>

        <h2 className="text-xl font-semibold mt-6 mb-2">Est-ce légal de jouer depuis la France ?</h2>
        <p className="mb-4">
          Techniquement, Stake n’est pas autorisé par l’ANJ (Autorité Nationale des Jeux). Mais de nombreux joueurs y accèdent depuis la France avec un VPN, et les gains sont bien versés. À chacun d’assumer sa responsabilité.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Puis-je déposer avec ma carte bleue ?</h2>
        <p className="mb-4">
          Non, Stake ne propose pas de dépôts par carte. Il faut acheter des cryptos via une plateforme, puis les envoyer sur Stake.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Y a-t-il un risque de ne pas être payé ?</h2>
        <p>
          Stake est l’un des plus gros sites au monde. Il paie ses joueurs, mais encore une fois, en jouant sur un site non régulé en France, vous prenez une part de risque que vous devez accepter en conscience.
        </p>
      </div>
    </Layout>
  );
}
