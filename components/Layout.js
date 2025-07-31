// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const { locale, locales, asPath } = router;

  const toggleLocale = locale === "fr" ? "en" : "fr";

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* HEADER */}
      <header className="bg-gray-800 py-4 px-6 shadow-md">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <Link href="/" locale={locale} className="text-2xl font-bold text-green-400">
            Rounders.pro
          </Link>
          <div className="space-x-4 flex items-center">
            <Link href="/bonus" locale={locale} className="hover:text-green-400">Bonus</Link>
            <Link href="/jeux" locale={locale} className="hover:text-green-400">Jeux</Link>
            <Link href="/strategies" locale={locale} className="hover:text-green-400">Stratégies</Link>
            <Link href="/faq" locale={locale} className="hover:text-green-400">FAQ</Link>
            <Link href="/commissions" locale={locale} className="hover:text-green-400">Commissions</Link>

            {/* Switch langue */}
            <Link href={asPath} locale={toggleLocale} className="ml-4 text-sm text-gray-400 underline hover:text-white">
              {toggleLocale.toUpperCase()}
            </Link>
          </div>
        </nav>
      </header>

      {/* CONTENU */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Rounders.pro — Tous droits réservés.
      </footer>
    </div>
  );
}
