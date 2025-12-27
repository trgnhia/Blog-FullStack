import Image from "next/image";

type PostCardProps = {
  title: string;
  description: string;
  category: string;
  dateText: string;
  readTime: string;
  imageSrc: string; // /uploads/...
};

export default function PostCard({
  title,
  description,
  category,
  dateText,
  readTime,
  imageSrc,
}: PostCardProps) {
  return (
    <article className="relative">
      {/* Image */}
      <a
        href="#"
        className="group block overflow-hidden rounded-[28px] bg-white/5"
      >
        <div className="relative aspect-[684/524] w-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={false}
          />
        </div>

        {/* Category pill (top-right) */}
        <div className="absolute right-5 top-5">
          <span className="rounded-full bg-black/60 px-4 py-2 text-[12px] font-semibold text-white backdrop-blur">
            {category}
          </span>
        </div>

        {/* Author avatars (bottom-left) – chỉ là khung */}
        <div className="absolute bottom-5 left-5 flex -space-x-3">
          <div className="h-10 w-10 rounded-full border border-white/20 bg-white/10" />
          <div className="h-10 w-10 rounded-full border border-white/20 bg-white/10" />
        </div>
      </a>

      {/* Content */}
      <div className="mt-5">
        <h4 className="font-serif text-[28px] leading-tight text-white">
          <a href="#" className="hover:underline">
            {title}
          </a>
        </h4>

        <p className="mt-3 text-[15px] leading-relaxed text-white/80">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-4 text-[12px] font-medium text-white/60">
          <span>{dateText}</span>
          <span className="h-[1px] w-6 bg-white/30" />
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
}
