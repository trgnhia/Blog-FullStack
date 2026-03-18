import Image from "next/image";

type Social = "facebook" | "x" | "linkedin" | "behance";

type AuthorRewardCardProps = {
    name: string;
    role: string;
    postCount: number;
    image: string;
    socials: Social[];
};

function SocialIcon({ type }: { type: Social }) {
    const label =
        type === "facebook"
            ? "f"
            : type === "x"
                ? "X"
                : type === "linkedin"
                    ? "in"
                    : "Bē";

    return (
        <div
            aria-label={type}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/20"
        >
            {label}
        </div>
    );
}

export default function AuthorRewardCard({
    name,
    role,
    postCount,
    image,
    socials,
}: AuthorRewardCardProps) {
    return (
        <div className="relative rounded-2xl overflow-hidden min-h-[380px] md:min-h-[420px]">
            {/* Background Image */}
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={false}
            />

            {/* Subtle gradient — only bottom portion */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Author Info — compact overlay at bottom-left */}
            <div className="absolute bottom-4 left-4 right-4 max-w-[240px]">
                <div className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-3 ring-1 ring-white/10">
                    <h4 className="text-white font-semibold text-[15px] leading-tight">
                        {name}
                    </h4>
                    <p className="text-[12px] mt-0.5 text-white/60">
                        <span className="text-[#ea4c92]">{role}</span>
                        <span> — {postCount} posts</span>
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-2 mt-2.5">
                        {socials.map((s) => (
                            <SocialIcon key={s} type={s} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
