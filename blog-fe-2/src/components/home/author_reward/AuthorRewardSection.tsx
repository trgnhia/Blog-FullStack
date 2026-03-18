import { MdArrowOutward } from "react-icons/md";
import AuthorRewardCard from "./AuthorRewardCard";
import AuthorRewardArticleCard from "./AuthorRewardArticleCard";

const articles = [
    {
        title:
            "Creating a Cozy and Productive Workspace at Home for Everyday Inspiration",
        category: "Inspiration",
        date: "12 July, 2025",
        image:
            "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop&crop=center",
    },
    {
        title:
            "How to Design a Life That Truly Reflects Your Values and Passions",
        category: "Lifestyle",
        date: "12 July, 2025",
        image:
            "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=200&h=200&fit=crop&crop=center",
    },
    {
        title:
            "The Minimalist Lifestyle: How Simplifying Your Space Can Transform Your Mind",
        category: "Healthy",
        date: "12 July, 2025",
        image:
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop&crop=center",
    },
];

export default function AuthorRewardSection() {
    return (
        <section className="py-12">
            <div className="mx-auto w-full max-w-5xl">
                {/* Outer wrapper with pink border */}
                <div className="rounded-3xl border border-[#ea4c92]/40 bg-white dark:bg-[#1e1e1e] p-8 md:p-10 lg:p-12 transition-colors duration-300 shadow-md dark:shadow-none">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-serif text-[32px] md:text-[38px] leading-tight text-[#1a1a1a] dark:text-white transition-colors tracking-tight">
                            Author award
                        </h3>
                        <button className="inline-flex items-center gap-2 rounded-full bg-black text-white hover:bg-black/90 dark:bg-white px-5 py-2 text-sm font-medium dark:text-[#1a1a1a] dark:hover:bg-white/90 transition-colors">
                            View all posts
                            <MdArrowOutward size={16} />
                        </button>
                    </div>

                    {/* Separator */}
                    <div className="h-px bg-black/10 dark:bg-white/10 mb-8 transition-colors" />

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-[5fr_7fr] gap-6 lg:gap-8">
                        {/* Author Card */}
                        <AuthorRewardCard
                            name="Noah Campbell"
                            role="Tech writer"
                            postCount={168}
                            image="/images/top_authors/author_1.jpg"
                            socials={["facebook", "x", "linkedin", "behance"]}
                        />

                        {/* Articles List */}
                        <div className="flex flex-col gap-4 justify-between">
                            {articles.map((article, index) => (
                                <AuthorRewardArticleCard key={index} {...article} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
