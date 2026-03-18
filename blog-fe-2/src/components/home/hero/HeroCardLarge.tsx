import Image from "next/image";
import { BlogViewModel } from "@/types/blog";
import Link from "next/link";

export default function HeroCardLarge({ blog }: { blog: BlogViewModel }) {
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
            alt="Hero large"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
            unoptimized
          />
        </a>

        {/* Big overlay glass */}
        <div className="absolute max-w-[620px] inset-x-6 mx-auto bottom-6 rounded-[22px] bg-white/80 dark:bg-black/35 p-5 backdrop-blur-md ring-1 ring-black/10 dark:ring-white/10 transition-colors">
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.tagsArray.slice(0, 2).map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center rounded-full bg-rose-500/90 px-3 py-1 text-sm font-medium text-white"
              >
                {tag}
              </div>
            ))}
          </div>

          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#1a1a1a] dark:text-white transition-colors group-hover:text-[#ea4c92] dark:group-hover:text-[#ea4c92]">
            <Link href={`/blogs/${blog.slug}`}>
              {blog.title}
            </Link>
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-black/80 dark:text-white/80">
            {blog.excerpt}
          </p>

          {/* author row */}
          <div className="mt-4 flex items-center gap-3">
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                ring-2 ring-black/10 dark:ring-white/70
                bg-black/5 dark:bg-white/15
                text-sm font-semibold text-[#1a1a1a] dark:text-white
                select-none
                "
              aria-label="Author"
            >
              {blog.author.charAt(0).toUpperCase()}
            </div>

            <div className="text-black/80 dark:text-white/85">
              <div className="text-sm font-semibold text-[#1a1a1a] dark:text-white">
                {blog.author}
              </div>
              <div className="text-xs text-black/60 dark:text-white/65">{blog.timeAgo}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
