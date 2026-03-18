import Link from "next/link";

const MOCK_CATEGORIES = [
  { name: "Inspiration", count: 10, href: "/inspiration" },
  { name: "Design", count: 10, href: "/design" },
  { name: "Law", count: 10, href: "/law" },
  { name: "Fashion", count: 10, href: "/fashion" },
  { name: "Lifestyle", count: 10, href: "/lifestyle" },
];

export default function CategoriesBlock() {
  return (
    <div className="pt-4">
      <p className="mb-3 text-[16px] font-bold text-pink-600 dark:text-pink-400 transition-colors">Categories</p>

      <ul className="m-0 list-none p-0">
        {MOCK_CATEGORIES.map((c) => (
          <li key={c.href} className="mx-0">
            <Link
              href={c.href}
              className="group flex items-center justify-between border-b border-black/10 dark:border-white/10 py-3 transition-colors duration-300 hover:-translate-y-[1px]"
            >
              <span className="font-serif text-[20px] leading-none text-[#1a1a1a] dark:text-white transition-colors">
                {c.name}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-black/5 dark:bg-white/5 text-[16px] font-semibold text-black/80 dark:text-white/80 transition-colors">
                {c.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
