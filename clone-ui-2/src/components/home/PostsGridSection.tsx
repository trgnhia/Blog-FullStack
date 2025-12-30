"use client";

import PostCard from "./PostCard";
import { BlogViewModel } from "@/types/blog";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const MOCK_POSTS = [
  {
    title: "The Joy of Doing Less and Living a More Meaningful Life",
    description:
      "White space is more than empty room — it’s a vital design element. Learn how to use it to improve readability, clarity, and visual focus.",
    category: "Inspiration",
  },
  {
    title: "The Art of Slow Travel and Finding Joy in Every Journey",
    description:
      "Everyday life is full of creative potential. Learn how to look deeper, reimagine familiar things, and turn them into unique design concepts.",
    category: "Technology",
  },
  {
    title: "Daily Mindset Shifts to Help You Stay Motivated and Consistent",
    description:
      "Everyday life is full of creative potential. Learn how to look deeper, reimagine familiar things, and turn them into unique design concepts.",
    category: "Automotive",
  },
  {
    title: "Why Authenticity Wins in the Age of Algorithms",
    description:
      "White space is more than empty room — it’s a vital design element. Learn how to use it to improve readability, clarity, and visual focus.",
    category: "Science",
  },
  {
    title: "How Technology is Shaping Modern Storytelling",
    description:
      "Bring your website to life! Follow this quick tutorial to add smooth, engaging animations with Framer Motion.",
    category: "Culture",
  },
  {
    title: "Behind the Scenes: Crafting a Brand That Speaks",
    description:
      "Bring your website to life! Follow this quick tutorial to add smooth, engaging animations with Framer Motion.",
    category: "Automotive",
  },
];

export default function PostsGridSection({
  blogs,
}: {
  blogs: BlogViewModel[];
}) {
  const [visibleBlogsCount, setVisibleBlogsCount] = useState<number>(6);
  const visibleBlogs = blogs.slice(0, visibleBlogsCount);
  const hasMore = visibleBlogsCount < blogs.length;

  function handleLoadMore() {
    setVisibleBlogsCount((prev) => Math.min(prev + 6, blogs.length));
  }
  return (
    <section className="py-16 pt-2">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <h3 className="font-serif text-[56px] leading-none tracking-tight text-white">
            The Fastest Way to Stay Updated
          </h3>
        </div>

        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {visibleBlogs.map((p, idx) => (
            <PostCard
              key={idx}
              title={p.title}
              excerpt={p.excerpt}
              category={p.tagsArray[0]}
              author={p.author}
              timeAgo={p.timeAgo}
              imageSrc={p.coverImageUrl}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          {hasMore ? (
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-[14px] font-bold text-white shadow hover:opacity-95"
            >
              Load more posts
              <span className="inline-block">
                <MdArrowOutward size={20} />
              </span>
            </button>
          ) : (
            <p className="inline-block rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/60 backdrop-blur-sm">
              No more posts to load
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
