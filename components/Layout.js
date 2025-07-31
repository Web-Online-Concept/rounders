// components/Layout.js
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 p-4 shadow-md">
        <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400">
            Rounders
          </Link>
          <div className="flex gap-4 mt-2 sm:mt-0 flex-wrap text-sm sm:text-base">
            <Link href="/bonus" className="hover:text-blue-400">Bonus</Link>
            <Link href="/jeux" className="hover:text-blue-400">Jeux</Link>
            <Link href="/guide" className="hover:text-blue-400">Guide</Link>
            <Link href="/faq" className="hover:text-blue-400">FAQ</Link>
            <Link href="/classement" className="hover:text-blue-400">Classement</Link>
            <Link href="/commissions" className="hover:text-blue-400">Commissions</Link>
            <Link href="/contact" className="hover:text-blue-400">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">{children}</main>

      <footer className="bg-gray-900 p-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Rounders.pro – Tous droits réservés.
      </footer>
    </div>
  );
}
