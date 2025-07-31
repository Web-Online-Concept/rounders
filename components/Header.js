import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [showGuideMenu, setShowGuideMenu] = useState(false);

  return (
    <header className="bg-[#1e1e1e] h-[100px] shadow-md relative z-50">
      <div className="max-w-5xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="relative text-white text-2xl font-bold">
          <span className="relative z-10">Rounders</span>
          <span className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 animate-shine" />
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-white font-medium text-lg">
          <Link href="/affiliation" className="hover:underline hover:text-blue-400 transition duration-200">
            Affiliation
          </Link>
          <Link href="/commissions" className="hover:underline hover:text-blue-400 transition duration-200">
            Commissions
          </Link>
          <div
            onMouseEnter={() => setShowGuideMenu(true)}
            onMouseLeave={() => setShowGuideMenu(false)}
            className="relative"
          >
            <span className="cursor-pointer hover:text-blue-400 transition duration-200">
              Guide Stake
            </span>
            {showGuideMenu && (
              <div className="absolute top-full left-0 bg-[#2b2b2b] mt-2 rounded shadow-lg z-50">
                <ul className="min-w-[180px] py-2">
                  <li>
                    <Link href="/guide/inscription" className="block px-4 py-2 hover:bg-gray-700">Inscription</Link>
                  </li>
                  <li>
                    <Link href="/guide/bonus" className="block px-4 py-2 hover:bg-gray-700">Bonus</Link>
                  </li>
                  <li>
                    <Link href="/guide/jeux" className="block px-4 py-2 hover:bg-gray-700">Jeux</Link>
                  </li>
                  <li>
                    <Link href="/guide/cryptos" className="block px-4 py-2 hover:bg-gray-700">Cryptos</Link>
                  </li>
                  <li>
                    <Link href="/guide/faq" className="block px-4 py-2 hover:bg-gray-700">FAQ</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
