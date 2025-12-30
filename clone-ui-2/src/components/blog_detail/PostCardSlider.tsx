"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import PostCard from "../home/PostCard";
import { useRef } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

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

export default function PostCardSlider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="mt-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            Related posts
          </h3>
          <p className="mt-2 text-sm text-white/60">
            More stories you may enjoy.
          </p>
        </div>
      </div>
      <div className="relative">
        <button
          ref={prevRef}
          className="
            hidden md:flex
            absolute left-[-32px] top-1/2 -translate-y-1/2
            z-10
            h-11 w-11 items-center justify-center
            rounded-full
            bg-black/40 backdrop-blur
            border border-white/15
            text-white
            hover:bg-black/60
            transition
            swiper-button-prev custom-nav
          "
        >
          <GrLinkPrevious className="text-xl" />
        </button>

         {/* NEXT */}
         <button
          ref={nextRef}
          className="
            hidden md:flex
            absolute right-[-32px] top-1/2 -translate-y-1/2
            z-10
            h-11 w-11 items-center justify-center
            rounded-full
            bg-black/40 backdrop-blur
            border border-white/15
            text-white
            hover:bg-black/60
            transition
            swiper-button-next custom-nav
          "
        >
          <GrLinkNext className="text-xl" />
        </button>
        <Swiper
          loop
          breakpoints={{
            340: { slidesPerView: 2, spaceBetween: 15 },
            700: { slidesPerView: 3, spaceBetween: 15 },
          }}
          freeMode
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }}
          modules={[FreeMode, Navigation]}
          className="md:px-12 pb-10"
        >
          {MOCK_POSTS.map((item, idx) => (
            <SwiperSlide key={item.title} className="h-auto">
              <div className="h-full">
                <PostCard
                  key={idx}
                  slug={item.description}
                  title={item.title}
                  excerpt={item.description}
                  category={item.category}
                  timeAgo="12 July, 2025"
                  author="6 mins read"
                  imageSrc="/images/s6_1.jpg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
