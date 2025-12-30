import Image from "next/image";
import Link from "next/link";
import { BlogViewModel } from "@/types/blog";
export default function CategoryFeaturedPost({
  blog,
}: {
  blog: BlogViewModel;
}) {
  return (
    <article className="mt-10">
      {/* Image */}
      <Link href="#">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={blog.coverImageUrl} // thay bằng src bạn đã dùng
            alt={blog.title}
            width={1200}
            height={700}
            className="w-full h-auto transition-transform duration-500 hover:scale-105"
            unoptimized
          />
        </div>
      </Link>

      <Link href="#">
        <h2 className="mt-6 text-3xl font-serif text-white leading-snug hover:underline">
          {blog.title}
        </h2>
      </Link>

      <p className="mt-3 text-white/70 max-w-2xl">{blog.excerpt}</p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        <div
          className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                ring-2 ring-white/70
                bg-white/15
                text-sm font-semibold text-white
                select-none
                "
          aria-label="Author"
        >
          {blog.author.charAt(0).toUpperCase()}
        </div>
        <div className="text-sm">
          <p className="text-white font-medium">{blog.author}</p>
          <p className="text-white/50">{blog.timeAgo}</p>
        </div>
      </div>
    </article>
  );
}
