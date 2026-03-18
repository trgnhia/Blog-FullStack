"use client";
import PostCard from "@/components/home/posts/PostCard";
import { BlogViewModel } from "@/types/blog";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
type Props = {
  columns?: 1 | 2; // category page chỉ cần 2 cột
  blogs: BlogViewModel[];
};

export default function CategoryPostsGrid({ columns = 2, blogs }: Props) {

  const [visible, setVisible] = useState<number>(6);
  const hasMore = visible < blogs.length;
  const visibleBlogs = blogs.slice(0, visible);
  const handleLoadMore = () => {
    setVisible((prev) => Math.min(prev + 6, blogs.length))
  }
  return (
    <section className="pt-8">
      <div className="w-full">
        {/* Category grid: 2 cột 3 hàng */}
        <div
          className={[
            "grid gap-10",
            columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
          ].join(" ")}
        >
          {visibleBlogs.map((p, idx) => (
            <PostCard
              slug={p.slug}
              key={idx}
              title={p.title}
              excerpt={p.excerpt}
              category={p.category}
              timeAgo={p.timeAgo}
              author={p.author}
              imageSrc={p.coverImageUrl}
            />
          ))}
        </div>
        <div className="mt-14 text-center">
          {hasMore ? (
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-4 text-[16px] font-semibold text-white shadow hover:opacity-95"
            >
              Load more posts
              <span className="inline-block">
                <MdArrowOutward size={20} />
              </span>
            </button>
          ) : (
            <p className="inline-block rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-7 py-3 text-sm text-black/60 dark:text-white/60 tracking-wide backdrop-blur-sm transition-colors">
              No more posts to load
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
