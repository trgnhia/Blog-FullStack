"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { BlogViewModel } from "@/types/blog";

type Props = {
  allBlogs: BlogViewModel[];
};

export default function FeaturedArticlesSection({ allBlogs }: Props) {
  const VISIBLE_ARTICLE_COUNT = 4;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % VISIBLE_ARTICLE_COUNT);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + VISIBLE_ARTICLE_COUNT) % VISIBLE_ARTICLE_COUNT
    );
  };

  return (
    <section className="mt-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-center">
        {/* Bên trái: title + button */}
        <div className="flex-1 text-white">
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            <span className="block">Best</span>
            <span className="block">Article</span>
            <span className="block">Today</span>
          </h2>

          <p className="mt-4 max-w-sm text-sm text-indigo-100">
            Discover today&apos;s most engaging and trending articles carefully
            selected just for you.
          </p>

          <div className="mt-8">
            <Link
              href="/blogs"
              className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-purple-600 shadow-md hover:bg-indigo-50"
            >
              See All Articles
            </Link>
          </div>
        </div>

        {/* Bên phải: các card + nút điều hướng phía dưới */}
        <div className="flex-1">
          {/* Hàng card */}
          <div className="flex items-stretch justify-between gap-6 overflow-hidden">
            {allBlogs.slice(0, VISIBLE_ARTICLE_COUNT).map((article, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={article.id}
                  className={`
                    flex w-full max-w-[260px] flex-col overflow-hidden rounded-3xl bg-white/95 shadow-md transition-all duration-300
                    sm:w-[230px]
                    ${
                      isActive
                        ? "scale-105 shadow-xl ring-2 ring-purple-300"
                        : "scale-95 opacity-80"
                    }
                  `}
                >
                  <div className="relative h-40 w-full bg-gradient-to-br from-gray-200 to-gray-100 md:h-44">
                    <Image
                      src={article.coverImageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>


                  <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>{article.timeAgo}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-700">
                        {article.author}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      {article.tagsArray.slice(0, 1).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-purple-100 px-3 py-1 text-[11px] font-medium text-purple-600"
                        >
                          {tag}
                        </span>
                      ))}
                      <Link
                        href={`blogs/${article.slug}`}
                        className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Nút điều hướng + dot indicator */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-indigo-600 shadow-md hover:bg-white"
              aria-label="Previous article"
            >
              <GrLinkPrevious />
            </button>

            <div className="flex items-center gap-2">
              {allBlogs.slice(0, VISIBLE_ARTICLE_COUNT).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`
                  rounded-full transition-all duration-300
                  ${
                    index === activeIndex
                      ? "h-3 w-3 bg-white shadow-md" // lớn hơn 2px + sáng hơn + thêm shadow nhẹ
                      : "h-2.5 w-2.5 bg-white/60"
                  }
                `}
                  aria-label={`Go to article ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-indigo-600 shadow-md hover:bg-white"
              aria-label="Next article"
            >
              <GrLinkNext />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
