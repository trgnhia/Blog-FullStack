// src/components/detail_blog/PostHeader.tsx
import Link from "next/link";

type Props = {
  category: string;
  title: string;

  authorName: string;
  authorAvatar: string;

  dateText: string;
  readTime: string;

  commentsCount?: number;
  viewsCount?: number;
};

export default function PostHeader({
  category,
  title,
  authorName,
  authorAvatar,
  dateText,
  readTime,
  commentsCount = 98,
  viewsCount = 168,
}: Props) {
  return (
    <section className="pt-6">
      {/* Category badge + Title */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 text-xs font-semibold text-white">
          {category}
        </span>

        <h1 className="w-full pr-0 font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl md:pr-10">
          {title}
        </h1>
      </div>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {/* Left: author */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="#" className="flex items-center gap-2">
            <img
              src={authorAvatar}
              alt={authorName}
              className="h-12 w-12 rounded-full object-cover"
            />
          </Link>

          <div className="text-left">
            <Link
              href="#"
              className="block text-sm font-semibold text-white hover:underline"
            >
              {authorName}
            </Link>

            <div className="mt-1 flex items-center gap-2 text-xs text-white/70">
              <span>{dateText}</span>
              <span className="h-[2px] w-4 bg-white/20" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>

        {/* Right: comments + views */}
        <div className="flex items-center gap-6 text-xs text-white/70 md:pr-6">
          <a href="#comments" className="flex items-center gap-2 hover:text-white">
            {/* flame icon */}
            <svg
              width="13"
              height="18"
              viewBox="0 0 13 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90"
            >
              <path
                d="M6.25 17.9167C9.70175 17.9167 12.5 15.1184 12.5 11.6667C12.5 10.9454 12.3081 10.2527 12.0833 9.608C10.6944 10.9804 9.63892 11.6667 8.91667 11.6667C12.2462 5.83333 10.4167 3.33333 5.41667 0C5.83333 4.16626 3.08669 6.06146 1.96816 7.11383C0.75655 8.25375 0 9.87183 0 11.6667C0 15.1184 2.79822 17.9167 6.25 17.9167Z"
                fill="currentColor"
              />
            </svg>
            <span>
              <span className="text-white/90">{commentsCount}</span> Comments
            </span>
          </a>

          <span className="flex items-center gap-2">
            {/* chat/views icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90"
            >
              <path
                d="M8.33329 2.5H11.6666C15.3485 2.5 18.3333 5.48477 18.3333 9.16667C18.3333 12.8486 15.3485 15.8333 11.6666 15.8333V18.75C7.49996 17.0833 1.66663 14.5833 1.66663 9.16667C1.66663 5.48477 4.65139 2.5 8.33329 2.5Z"
                fill="currentColor"
              />
            </svg>
            <span>
              <span className="text-white/90">{viewsCount}</span> views
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
