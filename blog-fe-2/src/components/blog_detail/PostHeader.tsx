

type Props = {
  coverImage: string;
  category: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  readTime: string;
  commentsCount?: number;
  viewsCount?: number;
};

export default function PostHeader({
  coverImage,
  category,
  title,
  authorName,
  authorAvatar,
  timeAgo,
  readTime,
  commentsCount = 98,
  viewsCount = 168,
}: Props) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-10">
      {/* ====== TITLE BLOCK (col-lg-8 mx-auto text-center) ====== */}
      <div className="mx-auto w-full lg:max-w-[66.666%] text-center">
        {/* category */}
        <span className="inline-flex rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 text-xs font-semibold text-white capitalize">
          {category}
        </span>

        {/* title */}
        <h2
          className="
            mt-4
            font-serif
            font-medium
            text-white
            antialiased
            tracking-tight
            text-[34px]
            leading-[1.25]
            md:text-[40px]
          "
        >
          {title}
        </h2>

        {/* meta row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
          <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                ring-2 ring-white/70
                bg-white/15
                text-sm font-semibold text-white
                select-none
                "
              aria-label="Author"
            >
              {authorAvatar.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{authorName}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
                <span>{timeAgo}</span>
                <span className="h-[2px] w-4 bg-white/20" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          {/* right: stats */}
          <div className="flex items-center gap-6 text-xs text-white/70">
            <a href="#comments" className="flex items-center gap-2 hover:text-white">
              <span className="text-white/90">{commentsCount}</span>
              <span>Comments</span>
            </a>
            <span className="flex items-center gap-2">
              <span className="text-white/90">{viewsCount}</span>
              <span>views</span>
            </span>
          </div>
        </div>
      </div>

      {/* ====== IMAGE BLOCK (col-12 mt-5) ====== */}
      <div className="mt-10">
        <div className="overflow-hidden rounded-[20px]">
          <img
            src={coverImage}
            alt={title}
            className="h-[420px] w-full object-cover md:h-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
