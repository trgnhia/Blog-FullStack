"use client";

import Link from "next/link";
import Image from "next/image";
import { FaHome, FaRegNewspaper, FaPhone, FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo + mô tả */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-wide">
              <span className="text-white">MY</span>
              <span className="text-purple-200">BLOG</span>
            </h2>
            <p className="text-sm text-purple-100 leading-relaxed">
              A modern blog platform where ideas come alive. Share your stories,
              experiences, and knowledge with the world.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Navigation
            </h3>
            <ul className="space-y-3 text-purple-100 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <FaHome size={25} />
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/blogs"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <FaRegNewspaper size={25} />
                  <span>Articles</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <FaUser size={23} />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <FaPhone size={25} />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <ul className="space-y-3 text-purple-100 text-sm">
              <li>
                <Link
                  href="https://www.facebook.com/"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <Image
                    src="/icons/facebook.png"
                    alt="facebook"
                    width={24}
                    height={24}
                  />
                  Facebook
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <Image
                    src="/icons/ig.svg"
                    alt="instagram"
                    width={24}
                    height={24}
                  />
                  Instagram
                </Link>
              </li>

              <li>
                <Link
                  href="https://x.com/?lang=vi"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <Image
                    src="/icons/x_logo.svg"
                    alt="twitter"
                    width={24}
                    height={24}
                  />
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-purple-300/30 pt-6 text-center text-sm text-purple-100">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
