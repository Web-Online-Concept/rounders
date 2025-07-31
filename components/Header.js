import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const navLinks = [
    { label: "Affiliation", href: "/affiliation" },
    { label: "Commissions", href: "/commissions" },
  ];

  const guideLinks = [
    { label: "Inscription", href: "/guide/inscription" },
    { label: "Jeux", href: "/guide/jeux" },
    { label: "Bonus", href: "/guide/bonus" },
    { label: "Crypto", href: "/guide/cryptos" },
    { label: "VIP", href: "/guide/vip" },
    { label: "FAQ", href: "/guide/faq" },
    { label: "Astuces", href: "/guide/astuces" },
  ];

  return (
    <header className="bg-[#1c1c44] h-[100px] shadow-md">
      <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between relative">
        {/* Logo avec effet lumière */}
        <Link href="/" className="text-white text-2xl font-bold relative overflow-hidden">
          <span className="relative z-10">ROUNDERS</span>
          <span className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white hover:text-blue-400 transition-all duration-200 ${
                router.pathname === link.href ? "font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Guide Stake */}
          <div
            className="relative"
            onMouseEnter={() => setIsGuideOpen(true)}
            onMouseLeave={() => setIsGuideOpen(false)}
          >
            <button className="text-white hover:text-blue-400 transition-all duration-200">
              Guide Stake
            </button>

            {isGuideOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#1c1c44] border border-gray-600 shadow-lg rounded z-50 w-40">
                <ul className="text-white text-sm">
                  {guideLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 hover:bg-blue-600 transition-all"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
