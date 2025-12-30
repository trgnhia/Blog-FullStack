
import PostCard from "@/components/home/PostCard";

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

type Props = {
  columns?: 1 | 2; // category page chỉ cần 2 cột
};

export default function CategoryPostsGrid({
  columns = 2,
}: Props) {
  return (
    <section className="pt-8">
      <div className="w-full">
        {/* Category grid: 2 cột 3 hàng */}
        <div
          className={[
            "grid gap-10",
            columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
          ].join(" ")}
        >
          {MOCK_POSTS.map((p, idx) => (
            <PostCard
              key={idx}
              title={p.title}
              excerpt={p.description}
              category={p.category}
              timeAgo="12 July, 2025"
              author="6 mins read"
              imageSrc={IMG}
            />
          ))}
        </div>
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
