import Image from "next/image";

export default function HeroCardSmall() {
  return (
    <article className="relative">
      <div className="relative overflow-hidden rounded-[38px] bg-zinc-800">
        {/* Image */}
        <a href="#" className="block aspect-[3/2] w-full">
          <Image
            src="http://localhost:8081/uploads/blogImages/c447dbd1-2c3a-4f20-83dc-f0f749c5d4d5.jpg"
            alt="Hero small"
            fill
            className="object-cover"
            priority
          />
        </a>

        {/* Author avatar (top-right) */}
        <a
          href="#"
          className="absolute right-5 top-5 h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/70"
          aria-label="Author"
        >
          <Image
            src="http://localhost:8081/uploads/blogImages/c447dbd1-2c3a-4f20-83dc-f0f749c5d4d5.jpg"
            alt="Author"
            fill
            className="object-cover"
          />
        </a>

        {/* Overlay box bottom */}
        <div className="absolute inset-x-4 bottom-4 rounded-[20px] bg-black/35 p-5 backdrop-blur-md ring-1 ring-white/10">
          <a href="#" className="inline-block text-sm font-medium text-white/80">
            Lifestyle
          </a>

          <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-white">
            The Minimalist Lifestyle: Simplify Your Space
          </h3>

          <div className="mt-3 flex items-center text-xs font-medium text-white/70">
            <span>12 July, 2025</span>
            <span className="mx-3 h-[1px] w-6 bg-white/25" />
            <span>6 mins read</span>
          </div>
        </div>
      </div>
    </article>
  );
}
