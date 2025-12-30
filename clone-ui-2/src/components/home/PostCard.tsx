import Image from "next/image";
import Link from "next/link";
type PostCardProps = {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  timeAgo: string;
  imageSrc: string; // /uploads/...
};

export default function PostCard({
  title,
  excerpt,
  category,
  author,
  timeAgo,
  imageSrc,
}: PostCardProps) {
  return (
    <article className="relative">
      {/* Image */}
      <Link
        href="blogs/1"
        className="group block overflow-hidden rounded-[28px] bg-white/5"
      >
        <div className="relative aspect-[684/524] w-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={false}
            unoptimized
          />
        </div>

        {/* Category pill (top-right) */}
        {category && (
          <div className="absolute right-5 top-5">
            <span className="rounded-full bg-black/60 px-4 py-2 text-[12px] font-semibold text-white backdrop-blur">
              {category}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="mt-5">
        <h4 className="font-serif text-[28px] leading-tight text-white">
          <Link href="blogs/1" className="hover:underline">
            {title}
          </Link>
        </h4>

        <p className="mt-3 text-[15px] leading-relaxed text-white/80">
          {excerpt}
        </p>

        <div className="mt-6 flex items-center gap-4 text-[12px] font-medium text-white/60">
          <span>{author}</span>
          <span className="h-[1px] w-6 bg-white/30" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </article>
  );
}
