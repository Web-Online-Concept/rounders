// pages/contact.js
import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact - Rounders</title>
        <meta name="description" content="Contactez-nous pour toute question concernant l'affiliation Stake, les bonus ou le suivi de vos gains." />
      </Head>
      <main className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="mb-4">
          Pour toute question, suggestion ou demande d’assistance liée à notre affiliation ou à Stake :
        </p>
        <ul className="list-disc pl-6">
          <li>Rejoignez notre Discord privé pour affiliés</li>
          <li>Envoyez-nous un message via le formulaire de contact (à venir)</li>
          <li>Ou contactez-nous par mail : <code>contact@rounders.pro</code></li>
        </ul>
        <p className="mt-4 italic">
          Nous répondons généralement sous 24h.
        </p>
      </main>
    </>
  );
}
