import Image from "next/image";

type AuthorRewardArticleCardProps = {
    title: string;
    category: string;
    date: string;
    image: string;
};

export default function AuthorRewardArticleCard({
    title,
    category,
    date,
    image,
}: AuthorRewardArticleCardProps) {
    return (
        <article className="flex items-center gap-5 p-5 rounded-2xl bg-black/[0.02] ring-black/[0.05] hover:bg-black/[0.04] dark:bg-white/[0.04] ring-1 dark:ring-white/[0.06] dark:hover:bg-white/[0.07] transition-colors cursor-pointer group flex-1">
            <div className="flex-1 min-w-0">
                <h4 className="text-[#1a1a1a] dark:text-white font-semibold text-[15px] md:text-base leading-snug mb-2 group-hover:text-[#ea4c92] transition-colors line-clamp-2">
                    {title}
                </h4>
                <p className="text-[13px] text-black/50 dark:text-white/40 transition-colors">
                    {category}
                    <span className="mx-1.5">—</span>
                    {date}
                </p>
            </div>
            <div className="relative w-[72px] h-[72px] md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="80px"
                    unoptimized
                />
            </div>
        </article>
    );
}
