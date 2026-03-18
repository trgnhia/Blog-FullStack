import Link from "next/link";
import Image from "next/image";
type Topic = {
  title: string;
  href: string;
  imageUrl: string;
};

const TOPICS: Topic[] = [
  {
    title: "Inspiration",
    href: "/inspiration",
    imageUrl: "/images/home/inspiration.jpg",
  },
  {
    title: "Technology",
    href: "/technology",
    imageUrl: "/images/home/technology.jpg",
  },
  {
    title: "Automotive",
    href: "/automotive",
    imageUrl: "/images/home/automotive.jpg",
  },
  {
    title: "Science",
    href: "/science",
    imageUrl: "/images/home/science.jpg",
  },
  {
    title: "Culture",
    href: "/culture",
    imageUrl: "/images/home/culture.jpg",
  },
  {
    title: "Gaming",
    href: "/gaming",
    imageUrl: "/images/home/gaming.jpg",
  },
];

export default function TrendingTopics() {
  return (
    <section className="pb-20">
      <div className="container-page">
        {/* giống row g-24 => gap 24px */}
        <div className="mt-3 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {TOPICS.map((t) => (
            <TopicCard key={t.title} topic={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={topic.href}
      className="group relative block w-full overflow-hidden rounded-[26px] bg-gray-100 dark:bg-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
      aria-label={topic.title}
    >
      <div className="relative h-[160px] w-full">
        <Image
          src={topic.imageUrl}
          alt={topic.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/5 dark:bg-black/10 transition-colors" />
      </div>

      {/* label pill */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-black/45 px-5 py-1 font-serif text-lg text-[#1a1a1a] dark:text-white shadow-sm backdrop-blur-md ring-1 ring-black/10 dark:ring-white/10 transition-colors">
          {topic.title}
        </span>
      </div>

      {/* hover shine */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-25deg] bg-gradient-to-r from-white/0 via-white/25 to-white/0" />
      </span>
    </Link>
  );
}
