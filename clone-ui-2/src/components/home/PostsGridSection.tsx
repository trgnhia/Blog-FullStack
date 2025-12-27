import PostCard from "./PostCard";

const IMG = "/uploads/blogImages/c447dbd1-2c3a-4f20-83dc-f0f749c5d4d5.jpg";

const MOCK_POSTS = [
  {
    title: "The Joy of Doing Less and Living a More Meaningful Life",
    description:
      "White space is more than empty room — it’s a vital design element. Learn how to use it to improve readability, clarity, and visual focus.",
    category: "Inspiration",
  },
  {
    title: "The Art of Slow Travel and Finding Joy in Every Journey",
    description:
      "Everyday life is full of creative potential. Learn how to look deeper, reimagine familiar things, and turn them into unique design concepts.",
    category: "Technology",
  },
  {
    title: "Daily Mindset Shifts to Help You Stay Motivated and Consistent",
    description:
      "Everyday life is full of creative potential. Learn how to look deeper, reimagine familiar things, and turn them into unique design concepts.",
    category: "Automotive",
  },
  {
    title: "Why Authenticity Wins in the Age of Algorithms",
    description:
      "White space is more than empty room — it’s a vital design element. Learn how to use it to improve readability, clarity, and visual focus.",
    category: "Science",
  },
  {
    title: "How Technology is Shaping Modern Storytelling",
    description:
      "Bring your website to life! Follow this quick tutorial to add smooth, engaging animations with Framer Motion.",
    category: "Culture",
  },
  {
    title: "Behind the Scenes: Crafting a Brand That Speaks",
    description:
      "Bring your website to life! Follow this quick tutorial to add smooth, engaging animations with Framer Motion.",
    category: "Automotive",
  },
];

export default function PostsGridSection() {
  return (
    <section className="py-16 pt-2">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <h3 className="font-serif text-[56px] leading-none tracking-tight text-white">
            The Fastest Way to Stay Updated
          </h3>
        </div>

        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_POSTS.map((p, idx) => (
            <PostCard
              key={idx}
              title={p.title}
              description={p.description}
              category={p.category}
              dateText="12 July, 2025"
              readTime="6 mins read"
              imageSrc={IMG}
            />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-14 text-center">
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-[14px] font-bold text-white shadow hover:opacity-95">
            Load more posts
            <span className="inline-block">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
