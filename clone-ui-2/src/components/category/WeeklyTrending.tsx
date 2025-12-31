import { BlogViewModel } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export default function WeeklyTrending({ blogs }: { blogs: BlogViewModel[] }) {
  return (
    <aside className="flex flex-col gap-4">
      {/* Title */}
      <p className="text-sm font-semibold text-pink-400">Weekly trending</p>

      {/* List */}
      <div className="flex flex-col">
        {blogs.map((item, index) => (
          <article
            key={index}
            className={`group flex gap-4 py-4 ${
              index !== blogs.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            {/* Content */}
            <div className="flex flex-col">
              {/* Category */}
              <div
                className="text-xs font-semibold text-white/50 hover:text-white mb-1"
              >
                {item.category}
              </div>

              {/* Title */}
              <Link href={`/blogs/${item.slug}`}>
                <h6 className="text-base font-serif text-white leading-snug line-clamp-2 hover:underline">
                  {item.title}
                </h6>
              </Link>

              {/* Date */}
              <span className="mt-2 text-xs text-white/40">{item.timeAgo}</span>
            </div>

            {/* Image */}
            <Link
              href={`/blogs/${item.slug}`}
              className="ml-auto shrink-0 w-[98px] h-[98px] overflow-hidden rounded-xl"
            >
              <Image
                src={item.coverImageUrl}
                alt={item.title}
                width={98}
                height={98}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </Link>
          </article>
        ))}
      </div>
    </aside>
  );
}
