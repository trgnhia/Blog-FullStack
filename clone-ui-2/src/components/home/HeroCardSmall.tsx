import Image from "next/image";
import { BlogViewModel } from "@/types/blog";
import Link from 'next/link';
export default function HeroCardSmall({ blog }: { blog: BlogViewModel }) {
  return (
    <article className="relative h-full">
      <div className="relative h-full overflow-hidden rounded-[38px] bg-zinc-800">
        {/* Image */}
        <a
          href={`blogs/${blog.slug}`}
          className="block h-full min-h-[420px] lg:min-h-[520px] w-full"
        >
          <Image
            src={blog.coverImageUrl}
            alt="Hero small"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </a>

        {/* Overlay box bottom */}
        <div className="absolute inset-x-4 bottom-4 rounded-[20px] bg-black/35 p-5 backdrop-blur-md ring-1 ring-white/10">
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.tagsArray.slice(0, 2).map((tag) => (
              <div
                key={tag}
                className="inline-block text-sm font-medium text-white/80"
              >
                {tag}
              </div>
            ))}
          </div>

          <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-white">
          <Link href={`blogs/${blog.slug}`} className="hover:underline">
              {blog.title}
            </Link>
          </h3>

          <div className="mt-3 flex items-center text-xs font-medium text-white/70">
            <span>{blog.author}</span>
            <span className="mx-3 h-[1px] w-6 bg-white/25" />
            <span>{blog.timeAgo}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
