import { BlogViewModel } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const TRENDING = [
  {
    title: "Iconic Film Directors and Their Influence on Cinema",
    category: "Inspiration",
    date: "16 Jul, 2025",
    image: "/images/trending-1.webp",
  },
  {
    title: "The Role of Storytelling in Film and Television",
    category: "Inspiration",
    date: "16 Jul, 2025",
    image: "/images/trending-2.webp",
  },
  {
    title: "The Impact of AI on Digital Art and Creativity",
    category: "Inspiration",
    date: "16 Jul, 2025",
    image: "/images/trending-3.webp",
  },
  {
    title: "Must-See Art Exhibitions Around the World This Year",
    category: "Inspiration",
    date: "16 Jul, 2025",
    image: "/images/trending-4.webp",
  },
  {
    title: "How Minimalism Elevates Digital Visual Design",
    category: "Inspiration",
    date: "16 Jul, 2025",
    image: "/images/trending-5.webp",
  },
];

export default function WeeklyTrending({ blogs }: { blogs: BlogViewModel[] }) {
  return (
    <aside className="flex flex-col gap-4">
      {/* Title */}
      <p className="text-sm font-semibold text-pink-400">Weekly trending</p>

      {/* List */}
      <div className="flex flex-col">
        {blogs.map((item, index) => (
          <article
            key={index}
            className={`group flex gap-4 py-4 ${
              index !== TRENDING.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            {/* Image */}
            <Link
              href={`/blogs/${item.slug}`}
              className="shrink-0 w-[98px] h-[98px] overflow-hidden rounded-xl"
            >
              <Image
                src={item.coverImageUrl}
                alt={item.title}
                width={98}
                height={98}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </Link>

            {/* Content */}
            <div className="flex flex-col">
              {/* Category */}
              <Link
                href="#"
                className="text-xs font-semibold text-white/50 hover:text-white mb-1"
              >
                {item.category}
              </Link>

              {/* Title */}
              <Link href={`/blogs/${item.slug}`}>
                <h6 className="text-sm font-medium text-white leading-snug line-clamp-2 hover:underline">
                  {item.title}
                </h6>
              </Link>

              {/* Date */}
              <span className="mt-2 text-xs text-white/40">{item.timeAgo}</span>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
