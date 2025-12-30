"use client";

import { BlogViewModel } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  blog: BlogViewModel;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="flex items-stretch gap-4 rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 px-4 py-4 md:px-5 md:py-5">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-200 md:h-28 md:w-28">
        <Image
          src={blog.coverImageUrl}
          alt={blog.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* nội dung giữa */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        {/* title + excerpt */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 md:text-base line-clamp-2">
            {blog.title}
          </h3>
          <p className="mt-1 text-xs text-gray-500 md:text-sm line-clamp-2">
            {blog.excerpt}
          </p>
        </div>

        {/* author + tags */}
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-2">
            {/* avatar tròn nhỏ, tạm hiển thị chữ cái đầu tên */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-[11px] font-semibold text-purple-700">
              {blog.author.charAt(0)}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-800">{blog.author}</span>
            </div>
          </div>

          {/* tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tagsArray.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* cột bên phải: thời gian + nút Read more */}
      <div className="flex flex-col items-end justify-between gap-3 pl-2 text-right">
        <span className="text-[11px] text-gray-400">{blog.timeAgo}</span>

        <Link
          href={`blogs/${blog.slug}`}
          className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
