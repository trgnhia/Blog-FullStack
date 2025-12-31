"use client";

import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
const NAV = [
  { label: "Home", type: "link" as const },
  { label: "Shop", type: "link" as const },
  { label: "Collections", type: "link" as const },
  { label: "Trending", type: "link" as const, badge: true },
  { label: "Latest", type: "link" as const },
  { label: "Contact", type: "link" as const },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // click outside -> close mobile menu (if you want)
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={wrapRef} className="flex items-center justify-between py-4">
      {/* Brand */}
      <div className="flex flex-col leading-tight">
        <Link className="text-2xl font-semibold tracking-wide" href="/">
          MyBlog<span className="text-white/40">.</span>
        </Link>
        <span className="text-xs text-white/60">Stories that inspire every day.</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-10">
        {NAV.map((item) => (
          <a
            key={item.label}
            href="#"
            className="relative text-sm text-white/80 hover:text-white transition"
          >
            {item.badge && (
              <span
                className="absolute -top-2 -right-4 rounded-full px-2 py-[2px] text-[10px] font-bold text-white"
                style={{ background: "var(--tc-linear-1)" }}
              >
                NEW
              </span>
            )}
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
          Search
        </button>
        <button
          className="lg:hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu (simple, no dropdown) */}
      {open && (
        <div className="lg:hidden absolute left-0 right-0 top-full mt-3 px-4">
          <div className="card p-3">
            <div className="flex flex-col">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
