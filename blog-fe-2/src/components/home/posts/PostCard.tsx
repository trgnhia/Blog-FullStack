import Image from "next/image";
import Link from "next/link";
type PostCardProps = {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  slug: string
  timeAgo: string;
  imageSrc: string; // /uploads/...
};

export default function PostCard({
  title,
  excerpt,
  category,
  author,
  timeAgo,
  slug,
  imageSrc,
}: PostCardProps) {
  return (
    <article className="relative group">
      {/* Image */}
      <Link
        href={`/blogs/${slug}`}
        className="block overflow-hidden rounded-[28px] bg-gray-100 dark:bg-white/5 transition-colors"
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
            <span className="rounded-full bg-black/60 px-4 py-[6px] text-[12px] tracking-wide font-semibold text-white backdrop-blur">
              {category}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="mt-5">
        <h4 className="font-serif text-[25px] leading-tight text-[#1a1a1a] dark:text-white transition-colors group-hover:text-[#ea4c92]">
          <Link href={`/blogs/${slug}`}>
            {title}
          </Link>
        </h4>

        <p className="mt-3 text-[15px] leading-relaxed text-black/80 dark:text-white/80 transition-colors">
          {excerpt}
        </p>

        <div className="mt-6 flex items-center gap-4 text-[12px] font-medium text-black/60 dark:text-white/60 transition-colors">
          <span>{author}</span>
          <span className="h-[1px] w-6 bg-black/20 dark:bg-white/30" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </article>
  );
}
