"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
  images: Array<{ src: string; alt?: string }>;
};

export default function CategorySideImages({ images }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-black/5 dark:bg-white/5 transition-colors">
      <div className="relative aspect-[4/5] w-full">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          speed={500}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={`${img.src}-${i}`}>
              <img
                src={img.src}
                alt={img.alt ?? ""}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}
