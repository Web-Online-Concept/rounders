import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [showGuideMenu, setShowGuideMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          Rounders
          <span className="logo-shine"></span>
        </Link>
        
        <nav className="nav">
          <Link href="/affiliation">
            Affiliation
          </Link>
          <Link href="/commissions">
            Commissions
          </Link>
          <div
            className="dropdown"
            onMouseEnter={() => setShowGuideMenu(true)}
            onMouseLeave={() => setShowGuideMenu(false)}
          >
            <span className="dropdown-trigger">
              Guide Stake
            </span>
            {showGuideMenu && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link href="/guide/inscription">Inscription</Link>
                  </li>
                  <li>
                    <Link href="/guide/bonus">Bonus</Link>
                  </li>
                  <li>
                    <Link href="/guide/jeux">Jeux</Link>
                  </li>
                  <li>
                    <Link href="/guide/cryptos">Cryptos</Link>
                  </li>
                  <li>
                    <Link href="/guide/faq">FAQ</Link>
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