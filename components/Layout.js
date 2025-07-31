// components/Layout.js
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link href="/">Rounders</Link>
          </h1>
          <nav className="space-x-6">
            <Link href="/affiliation" className="hover:underline">
              Affiliation
            </Link>
            <Link href="/commissions" className="hover:underline">
              Commissions
            </Link>
            <Link href="/guide" className="hover:underline">
              Guide Stake
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">{children}</main>

      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Rounders. Tous droits réservés. |
          <Link href="/contact" className="ml-2 underline">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}
