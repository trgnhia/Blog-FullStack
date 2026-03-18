import Image from "next/image";
import { BlogViewModel } from "@/types/blog";
import Link from 'next/link';
export default function HeroCardSmall({ blog }: { blog: BlogViewModel }) {
  return (
    <article className="relative h-full group">
      <div className="relative h-full overflow-hidden rounded-[38px] bg-gray-100 dark:bg-zinc-800 transition-colors">
        {/* Image */}
        <a
          href={`/blogs/${blog.slug}`}
          className="block h-full min-h-[420px] lg:min-h-[520px] w-full"
        >
          <Image
            src={blog.coverImageUrl}
            alt="Hero small"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            unoptimized
          />
        </a>

        {/* Overlay box bottom */}
        <div className="absolute inset-x-4 bottom-4 rounded-[20px] bg-white/80 dark:bg-black/35 p-5 backdrop-blur-md ring-1 ring-black/10 dark:ring-white/10 transition-colors">
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.tagsArray.slice(0, 2).map((tag) => (
              <div
                key={tag}
                className="inline-block text-sm font-medium text-black/80 dark:text-white/80"
              >
                {tag}
              </div>
            ))}
          </div>

          <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-[#1a1a1a] dark:text-white transition-colors group-hover:text-[#ea4c92]">
            <Link href={`/blogs/${blog.slug}`}>
              {blog.title}
            </Link>
          </h3>

          <div className="mt-3 flex items-center text-xs font-medium text-black/70 dark:text-white/70">
            <span>{blog.author}</span>
            <span className="mx-3 h-[1px] w-6 bg-black/20 dark:bg-white/25 transition-colors" />
            <span>{blog.timeAgo}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
