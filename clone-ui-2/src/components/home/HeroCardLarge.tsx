import Image from "next/image";
import { BlogViewModel } from "@/types/blog";
import Link from "next/link";

export default function HeroCardLarge({ blog }: { blog: BlogViewModel }) {
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
            alt="Hero large"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </a>

        {/* Big overlay glass */}
        <div className="absolute max-w-[620px] inset-x-6 mx-auto bottom-6 rounded-[22px] bg-black/35 p-5 backdrop-blur-md ring-1 ring-white/10">
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

          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">
            <Link href="blogs/1" className="hover:underline">
              {blog.title}
            </Link>
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {blog.excerpt}
          </p>

          {/* author row */}
          <div className="mt-4 flex items-center gap-3">
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

            <div className="text-white/85">
              <div className="text-sm font-semibold text-white">
                {blog.author}
              </div>
              <div className="text-xs text-white/65">{blog.timeAgo}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
