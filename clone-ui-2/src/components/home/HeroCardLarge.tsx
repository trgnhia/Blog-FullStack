import Image from "next/image";

export default function HeroCardLarge() {
  return (
    <article className="relative">
      <div className="relative overflow-hidden rounded-[38px] bg-zinc-800">
        {/* Image */}
        <a href="#" className="block aspect-[58/45] w-full">
          <Image
            src="/uploads/blogImages/cce327cb-fa50-4f78-9010-7a69c7550c76.jpg"
            alt="Hero large"
            fill
            className="object-cover"
            priority
          />
        </a>

        {/* Big overlay glass */}
        <div className="absolute inset-x-6 bottom-6 rounded-[22px] bg-black/35 p-7 backdrop-blur-md ring-1 ring-white/10">
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-rose-500/90 px-4 py-2 text-sm font-medium text-white"
          >
            Fashion
          </a>

          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white">
            Turning Ordinary Things into Truly Extraordinary Concepts
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Everyday life is full of creative potential. Learn how to look
            deeper, reimagine familiar things, and turn them into unique, design
            concepts.
          </p>

          {/* author row */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/70"
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
