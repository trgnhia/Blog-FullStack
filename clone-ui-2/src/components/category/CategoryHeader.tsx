import Image from "next/image";

type Props = {
  category: string;
  numberOfBlogs: number;
  src : string;
}

export default function CategoryHeader({category, numberOfBlogs, src} : Props) {
  return (
    <section className="pt-6">
      {/* Avatar + Title */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Avatar */}
        <div className="shrink-0  w-[100px] h-[100px] overflow-hidden rounded-full">
          <Image
            src={src}
            alt="Lifestyle"
            width={100}
            height={100}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>

        {/* Title + meta */}
        <div>
          <h1 className="text-4xl font-serif text-white mb-1">
            {category}
          </h1>
          <p className="text-white/60 text-lg">
            {numberOfBlogs} articles
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 max-w-2xl text-white/70 leading-relaxed">
        Discover simple ways to live with purpose, balance, and creativity — from
        mindful habits to meaningful routines that make everyday life feel more
        inspiring and fulfilling.
      </p>
    </section>
  );
}
