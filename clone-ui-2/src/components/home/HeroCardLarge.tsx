import Image from "next/image";
import { BlogViewModel } from "@/types/blog";


export default function HeroCardLarge({ blog }: { blog: BlogViewModel }) {
  return (
    <article className="relative h-full">
      <div className="relative h-full overflow-hidden rounded-[38px] bg-zinc-800">
        {/* Image */}
        <a href="#" className="block h-full min-h-[420px] lg:min-h-[520px] w-full">
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
          {blog.tagsArray.slice(0,1).map((tag) => (
            <div key={tag} className="inline-flex items-center rounded-full bg-rose-500/90 px-3 py-1 text-sm font-medium text-white">
             {tag}
            </div>
          ))}
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">
            {blog.title}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-white/80">
            Everyday life is full of creative potential. Learn how to look
            deeper, reimagine familiar things, and turn them into unique, design
            concepts.
          </p>

          {/* author row */}
          <div className="mt-4 flex items-center gap-3">
            <a
              href="#"
              className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/70"
              aria-label="Author"
            >
              <Image
                src="/uploads/blogImages/cce327cb-fa50-4f78-9010-7a69c7550c76.jpg"
                alt="Author"
                fill
                className="object-cover"
              />
            </a>

            <div className="text-white/85">
              <a href="#" className="text-sm font-semibold text-white">
                Emma Collins
              </a>
              <div className="text-xs text-white/65">12 July, 2025</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
