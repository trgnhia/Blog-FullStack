
import PostCard from "@/components/home/PostCard";
import { BlogViewModel } from "@/types/blog";

type Props = {
  columns?: 1 | 2; // category page chỉ cần 2 cột
  blogs: BlogViewModel[];
};

export default function CategoryPostsGrid({
  columns = 2,
  blogs
}: Props) {
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
          {blogs.map((p, idx) => (
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
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-[14px] font-bold text-white shadow hover:opacity-95">
            Load more posts
            <span className="inline-block">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
