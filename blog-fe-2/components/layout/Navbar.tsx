"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";
export default function Navbar() {
  const pathName = usePathname();
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/blogs" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className="
       fixed top-0 inset-x-0 z-50
        border-b border-pink-200
        bg-white/90
        backdrop-blur
        shadow-sm
  "
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-wide">
          <span className="text-gray-900">MY</span>
          <span className="text-purple-500">BLOG</span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathName === "/"
                : pathName.startsWith(item.href);
            return (
              <Link
                href={item.href}
                key={item.label}
                className="hover:text-purple-500"
              >
                <span className="inline-flex flex-col items-center">
                  <span>{item.label}</span>
                  {isActive && (<span className="h-2 w-2 rounded-full bg-purple-500 mt-1" />)}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-sm hover:border-purple-500 hover:text-purple-500"
            aria-label="Search"
          >
            <FaSearch size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
