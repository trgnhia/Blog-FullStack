import Image from "next/image";
import Link from "next/link";
import { BlogViewModel } from "@/types/blog";
export default function CategoryFeaturedPost({
  blog,
}: {
  blog: BlogViewModel;
}) {
  return (
    <article className="mt-10 group">
      {/* Image */}
      <Link href={`/blogs/${blog.slug}`}>
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={blog.coverImageUrl} // thay bằng src bạn đã dùng
            alt={blog.title}
            width={1200}
            height={700}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
            unoptimized
          />
        </div>
      </Link>

      <Link href={`/blogs/${blog.slug}`}>
        <h2 className="mt-6 text-3xl font-serif text-[#1a1a1a] dark:text-white leading-snug transition-colors group-hover:text-[#ea4c92] dark:group-hover:text-[#ea4c92]">
          {blog.title}
        </h2>
      </Link>

      <p className="mt-3 text-black/70 dark:text-white/70 max-w-2xl transition-colors">{blog.excerpt}</p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        <div
          className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                ring-2 ring-black/20 dark:ring-white/70
                bg-black/5 dark:bg-white/15
                text-sm font-semibold text-[#1a1a1a] dark:text-white
                select-none
                transition-colors
                "
          aria-label="Author"
        >
          {blog.author.charAt(0).toUpperCase()}
        </div>
        <div className="text-sm">
          <p className="text-[#1a1a1a] dark:text-white font-medium transition-colors">{blog.author}</p>
          <p className="text-black/50 dark:text-white/50 transition-colors">{blog.timeAgo}</p>
        </div>
      </div>
    </article>
  );
}
