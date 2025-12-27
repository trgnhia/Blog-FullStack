"use client";

import { useEffect, useRef, useState } from "react";

const NAV = [
  {
    label: "Home",
    type: "dropdown" as const,
    items: ["Home 1 - Magazine", "Home 2 - Publisher", "Home 3 - Blog", "Home 4 - Personal"],
  },
  {
    label: "Shop",
    type: "dropdown" as const,
    items: ["Shop - Grid", "Shop - Cart", "Shop - Details", "Shop - Checkout"],
  },
  {
    label: "Collections",
    type: "mega" as const,
  },
  { label: "Trending", type: "link" as const, badge: true },
  { label: "Latest", type: "link" as const },
  { label: "Contact", type: "link" as const },
];

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={wrapRef} className="flex items-center justify-between py-4">
      {/* Brand */}
      <div className="flex flex-col leading-tight">
        <a className="text-2xl font-semibold tracking-wide" href="#">
          Elora<span className="text-white/40">.</span>
        </a>
        <span className="text-xs text-white/60">Stories that inspire every day.</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-10">
        {NAV.map((item) => {
          if (item.type === "dropdown") {
            const isOpen = open === item.label;
            return (
              <div key={item.label} className="relative">
                <button
                  className="text-sm text-white/80 hover:text-white transition"
                  onClick={() => setOpen(isOpen ? null : item.label)}
                >
                  {item.label} <span className="text-white/40">▾</span>
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full mt-3 w-56 card p-2">
                    {item.items.map((it) => (
                      <a
                        key={it}
                        href="#"
                        className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                        onClick={() => setOpen(null)}
                      >
                        {it}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (item.type === "mega") {
            const isOpen = open === item.label;
            return (
              <div key={item.label} className="relative">
                <button
                  className="text-sm text-white/80 hover:text-white transition"
                  onClick={() => setOpen(isOpen ? null : item.label)}
                >
                  {item.label} <span className="text-white/40">▾</span>
                </button>

                {isOpen && (
                  <div className="absolute left-1/2 top-full mt-3 w-[720px] -translate-x-1/2 card p-5">
                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <a
                          key={i}
                          href="#"
                          className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                          onClick={() => setOpen(null)}
                        >
                          <div className="h-24 rounded-xl bg-white/10" />
                          <div className="mt-3 text-sm font-semibold">
                            Card title {i + 1}
                          </div>
                          <div className="mt-1 text-xs text-white/60 line-clamp-2">
                            Short description that mimics the mega menu preview cards.
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button className="pill bg-white text-black font-semibold hover:opacity-90">
                        View more
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <a
              key={item.label}
              href="#"
              className="relative text-sm text-white/80 hover:text-white transition"
            >
              {item.badge && (
                <span className="absolute -top-2 -right-4 rounded-full px-2 py-[2px] text-[10px] font-bold text-white"
                  style={{ background: "var(--tc-linear-1)" }}
                >
                  NEW
                </span>
              )}
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
          ☾/☀
        </button>
        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
          Search
        </button>
        <button className="lg:hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
          Menu
        </button>
      </div>
    </div>
  );
}
