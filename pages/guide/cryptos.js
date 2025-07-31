import Layout from '../../components/Layout';

export default function Cryptos() {
  return (
    <Layout title="Acheter des cryptomonnaies">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Acheter des cryptomonnaies</h1>
        <p className="mb-4">
          Pour jouer sur Stake, vous devez utiliser des cryptomonnaies. Voici comment en acheter facilement :
        </p>
        <ol className="list-decimal list-inside mb-4 space-y-2">
          <li>Créez un compte sur une plateforme comme Binance, Kraken ou Swissborg.</li>
          <li>Faites un virement bancaire ou utilisez votre carte pour acheter des cryptos.</li>
          <li>Transférez les cryptos sur votre portefeuille Stake (adresse fournie sur Stake).</li>
        </ol>
        <p className="mb-4">
          On recommande généralement d’acheter du Litecoin (LTC) ou du USDT pour des frais réduits et une rapidité de transfert.
        </p>
        <p>
          Astuce : vous pouvez aussi utiliser des plateformes comme <strong>Changelly</strong> ou <strong>Transak</strong> pour acheter directement avec votre carte, mais attention aux frais.
        </p>
      </div>
    </Layout>
  );
}
