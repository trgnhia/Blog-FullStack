"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="relative flex flex-col items-center gap-10 rounded-3xl bg-pink-100/80 px-6 py-10 shadow-md md:flex-row md:px-10 md:py-14 overflow-hidden">
        {/* Vòng tròn bên trái - nhỏ lại, gói trong khối này thôi */}
        <div className="pointer-events-none absolute -left-16 top-10 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-50" />
        <div className="pointer-events-none absolute -left-10 bottom-4 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-40" />

        {/* Vòng tròn bên phải */}
        <div className="pointer-events-none absolute -right-16 top-16 h-36 w-36 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-40" />
        <div className="pointer-events-none absolute -right-10 bottom-8 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-35" />

        {/* Cột trái - hình */}
        <div className="relative z-10 flex-1 flex justify-center">
          <div className="overflow-hidden rounded-[40%] bg-pink-200 shadow-lg max-w-[520px]">
            <Image
              src="/images/girl_working.jpg"
              alt="Person writing an article on laptop"
              width={520}
              height={360}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Cột phải - text */}
        <div className="relative z-10 flex-1 space-y-5 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            <span className="block">Write Your</span>
            <span className="block">
              <span className="text-purple-600">Article</span> here
            </span>
          </h1>

          <p className="max-w-md mx-auto text-sm text-gray-600 md:mx-0 md:text-base">
            Share your thoughts, stories, and experiences with the world. Start
            your own blog and grow your voice online.
          </p>

          <div className="pt-2">
            <Link
              href="#"
              className="inline-flex items-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
