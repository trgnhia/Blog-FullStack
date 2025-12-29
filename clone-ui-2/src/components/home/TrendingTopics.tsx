import Link from "next/link";

type Topic = {
  title: string;
  href: string;
  imageUrl: string;
};

const TOPICS: Topic[] = [
  {
    title: "Inspiration",
    href: "/category/inspiration",
    imageUrl:
      "images/home/inspiration.jpg",
  },
  {
    title: "Technology",
    href: "/category/technology",
    imageUrl:
      "images/home/technology.jpg",
  },
  {
    title: "Automotive",
    href: "/category/automotive",
    imageUrl:
      "images/home/automotive.jpg",
  },
  {
    title: "Science",
    href: "/category/science",
    imageUrl:
      "images/home/science.jpg",
  },
  {
    title: "Culture",
    href: "/category/culture",
    imageUrl:
      "images/home/culture.jpg",
  },
  {
    title: "Gaming",
    href: "/category/gaming",
    imageUrl:
      "images/home/gaming.jpg",
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
      href="/category"
      className="group relative block w-full overflow-hidden rounded-[26px] bg-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
      aria-label={topic.title}
    >
      {/* background image */}
      <div
        className="h-[160px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url("${topic.imageUrl}")` }}
      >
        {/* overlay nhẹ để chữ đọc rõ hơn */}
        <div className="h-full w-full bg-black/10" />
      </div>

      {/* label pill */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <span className="inline-flex items-center rounded-full bg-black/45 px-5 py-2 font-serif text-lg text-white shadow-sm backdrop-blur-md ring-1 ring-white/10">
          {topic.title}
        </span>
      </div>

      {/* hover shine nhẹ (optional) */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-25deg] bg-gradient-to-r from-white/0 via-white/25 to-white/0" />
      </span>
    </Link>
  );
}
