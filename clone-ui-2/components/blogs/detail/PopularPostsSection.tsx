"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogViewModel } from "@/types/blog";

type Props = {
  allBlogs: BlogViewModel[];
};

export default function PopularPostsSection({ allBlogs }: Props) {
  return (
    <section className="mt-16">
      {/* Header: title + View All */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Popular Post</h2>
        <Link
          href="/blogs"
          className="rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-purple-500"
        >
          View All
        </Link>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {allBlogs.slice(0, 3).map((article) => (
          <article
            key={article.id}
            className="
              flex h-full flex-col overflow-hidden rounded-3xl
              bg-white shadow-sm ring-1 ring-gray-100
              transition-all duration-300 hover:-translate-y-1 hover:shadow-md
            "
          >
            {/* cover image giống Featured card */}
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
              {/* time + author pill */}
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>{article.timeAgo}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-700">
                  {article.author}
                </span>
              </div>

              {/* title + excerpt */}
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-3">
                {article.excerpt}
              </p>

              {/* tag + Read more */}
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
                  href={`${article.slug}`}
                  className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Read More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
