import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [showGuideMenu, setShowGuideMenu] = useState(false)

  return (
    <header className="bg-black text-white shadow-md h-[100px] flex items-center z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between w-full">
        <Link href="/" className="text-2xl font-bold text-white no-underline">
          Rounders.pro
        </Link>
        <nav className="space-x-6 relative">
          <Link
            href="/affiliation"
            className="no-underline hover:text-blue-500 transition"
          >
            Affiliation
          </Link>
          <Link
            href="/commissions"
            className="no-underline hover:text-blue-500 transition"
          >
            Commissions
          </Link>

          <button
            onClick={() => setShowGuideMenu(!showGuideMenu)}
            className="no-underline hover:text-blue-500 transition"
          >
            Guide Stake ▾
          </button>

          {showGuideMenu && (
            <div className="absolute top-[100%] mt-2 bg-black text-white border border-gray-700 shadow-lg py-2 px-4 rounded">
              <div className="flex flex-col space-y-2">
                <Link href="/guide/inscription" className="hover:text-blue-400 no-underline">Inscription</Link>
                <Link href="/guide/fonctionnement" className="hover:text-blue-400 no-underline">Fonctionnement</Link>
                <Link href="/guide/bonus" className="hover:text-blue-400 no-underline">Bonus</Link>
                <Link href="/guide/cryptos" className="hover:text-blue-400 no-underline">Cryptos</Link>
                <Link href="/guide/securite" className="hover:text-blue-400 no-underline">Sécurité</Link>
                <Link href="/guide/faq" className="hover:text-blue-400 no-underline">FAQ</Link>
                <Link href="/guide/conseils" className="hover:text-blue-400 no-underline">Conseils</Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
