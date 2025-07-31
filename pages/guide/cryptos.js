// pages/guide/cryptos.js
import Head from "next/head";
import Image from "next/image";

export default function GuideCryptosPage() {
  return (
    <>
      <Head>
        <title>Dépôts et retraits en cryptos sur Stake</title>
        <meta
          name="description"
          content="Découvrez comment déposer et retirer en crypto sur Stake. Toutes les cryptomonnaies acceptées, frais, délais et astuces."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Dépôts et retraits en cryptomonnaie</h1>

        <p className="text-lg mb-6">
          Stake est un site 100% crypto. Les dépôts et retraits se font exclusivement via les principales cryptomonnaies. Voici tout ce que vous devez savoir.
        </p>

        <div className="mb-6">
          <Image
            src="/images/cryptos-stake.jpg"
            alt="Cryptomonnaies Stake"
            width={800}
            height={450}
            className="rounded-xl shadow"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">💸 Cryptos acceptées</h2>
        <ul className="list-disc list-inside text-lg mb-6 space-y-2">
          <li>Bitcoin (BTC)</li>
          <li>Ethereum (ETH)</li>
          <li>Litecoin (LTC)</li>
          <li>Dogecoin (DOGE)</li>
          <li>Tron (TRX)</li>
          <li>Ripple (XRP)</li>
          <li>EOS</li>
          <li>Bitcoin Cash (BCH)</li>
          <li>Tether (USDT - ERC20/TRC20)</li>
          <li>BNB, DAI, BUSD, etc.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">⚙️ Dépôt</h2>
        <p className="text-lg mb-4">
          Il suffit de choisir une crypto et de scanner le QR code ou copier l’adresse.
          Les dépôts sont crédités après une ou deux confirmations blockchain (très rapide).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">📤 Retrait</h2>
        <p className="text-lg mb-6">
          Les retraits sont tout aussi simples et très rapides (souvent traités en quelques minutes).
          Les frais sont fixes et visibles avant validation. Aucune vérification d'identité n'est requise.
        </p>

        <p className="text-lg">
          💡 <strong>Astuce</strong> : Pour réduire les frais, privilégiez le TRC20 (USDT sur le réseau Tron) ou Litecoin.
        </p>
      </section>
    </>
  );
}
