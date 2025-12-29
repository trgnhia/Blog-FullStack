import Image from "next/image";

type Social = "facebook" | "x" | "linkedin" | "behance";

type Author = {
  name: string;
  title: string;
  bio: string;
  socials: Social[];
  src: string
};



const AUTHORS: Author[] = [
  {
    name: "Caleb Arden",
    title: "Tech & Future Columnist",
    bio: "Caleb explores how technology shapes the way we live, work, and dream, bringing complex ideas closer to everyday life.",
    socials: ["facebook", "x", "linkedin", "behance"],
    src: "/images/top_authors/author_1.jpg"
  },
  {
    name: "Theo Varen",
    title: "Design & Innovation Editor",
    bio: "Theo’s work connects emotion and design, turning ideas into conversations that inspire new ways of seeing.",
    socials: ["facebook", "x", "linkedin", "behance"],
    src: "/images/top_authors/author_2.jpg"
  },
  {
    name: "Elora Valen",
    title: "Tech writer – Culture",
    bio: "Elora is a writer, a dreamer, and a lifelong explorer of ideas. She believes that creativity isn’t just a skill.",
    socials: ["facebook", "x", "linkedin", "behance"],
    src: "/images/top_authors/author_3.jpg"
  },
];

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
    <a
      href="#"
      aria-label={type}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-semibold text-white/80 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/10"
    >
      {label}
    </a>
  );
}

function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="text-center">
      {/* Avatar */}
      <a
        href="#"
        className="group mx-auto inline-block overflow-hidden rounded-full ring-2 ring-white/10 transition hover:-translate-y-0.5 hover:ring-white/20"
      >
        <div className="relative h-[100px] w-[100px]">
          <Image
            src={author.src}
            alt={author.name}
            fill
            className="object-cover"
            sizes="100px"
            priority={false}
          />
        </div>
      </a>

      {/* Name */}
      <h4 className="mt-5 font-serif antialiased text-2xl leading-tight text-white">
        <a href="#" className="hover:opacity-90">
          {author.name}
        </a>
      </h4>

      {/* Role */}
      <p className="mt-1 text-sm font-medium text-[#ea4c92]">
        {author.title}
      </p>

      {/* Bio */}
      <p className="mx-auto mt-2 max-w-md text-base leading-7 text-white/60">
        {author.bio}
      </p>

      {/* Social */}
      <div className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-white/0 px-2 py-1">
        {author.socials.map((s) => (
          <SocialIcon key={s} type={s} />
        ))}
      </div>
    </div>
  );
}

export default function TopAuthorsSection() {
  return (
    <section className="py-16 pt-4">
      <div className="text-center">
        <h5 className="font-serif antialiased text-4xl text-white">Top authors</h5>
        <p className="mt-3 text-base text-white/60">
          Top authors bring value to Elora magazine
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {AUTHORS.map((a) => (
          <AuthorCard key={a.name} author={a} />
        ))}
      </div>
    </section>
  );
}
