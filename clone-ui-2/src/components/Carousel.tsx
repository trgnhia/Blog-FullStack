// 'use client'
// import { useEffect, useState } from "react";
// import {ChevronLeft, ChevronRight} from "react-feather";

// export default function Carousel ({children: slides, autoSlide=false, autoSlideInterval=2200}) {
//   const [curr, setCurr] = useState(0);
//   const prev = () => {
//     setCurr((curr) => (curr === 0 ? slides.length - 1 : curr -1));
//   }
//   const next = () => {
//     setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
//   }
//   useEffect(() => {
//     if (!autoSlide) return;
//     const slideInterval = setInterval(next, autoSlideInterval);
//     return () => clearInterval(slideInterval);
//   }, [autoSlide, autoSlideInterval, slides.length])
//   return (
//     <div className="overflow-hidden relative">
//       <div className="flex transition-transform ease-out duration-500" style={{transform: `translateX(-${curr*100}%)` }}>{slides}</div>
//       <div className="absolute inset-0 flex items-center justify-between p-4">
//         <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 
//         text-gray-800 hover:bg-white">
//           <ChevronLeft size={40} />
//         </button>
//         <button onClick={next} className="p-1 rounded-full shadow bg-white/80 
//         text-gray-800 hover:bg-white">
//           <ChevronRight size={40}/>
//         </button>
//       </div>
//       <div className="absolute bottom-4 right-0 left-0">
//         <div className="flex items-center justify-center gap-2">
//           {slides.map((_,i) => (
//             <div
//             key={i}
//             className={`h-3 w-3 rounded-full transition-all ${
//               curr === i ? "bg-white scale-110" : "bg-white/50"
//             }`}
//           />
          
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// **************------------no swipper with fade ***************** -------------
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { ChevronLeft, ChevronRight } from "react-feather";

// type CarouselProps = {
//   children: React.ReactNode;
//   autoSlide?: boolean;
//   autoSlideInterval?: number; // ms
//   durationMs?: number; // thời gian fade
// };

// export default function Carousel({
//   children,
//   autoSlide = false,
//   autoSlideInterval = 2500,
//   durationMs = 700,
// }: CarouselProps) {
//   const slides = useMemo(() => React.Children.toArray(children), [children]);
//   const n = slides.length;

//   const [curr, setCurr] = useState(0);

//   const prev = () => setCurr((c) => (c - 1 + n) % n);
//   const next = () => setCurr((c) => (c + 1) % n);

//   useEffect(() => {
//     if (!autoSlide || n <= 1) return;
//     const id = setInterval(() => setCurr((c) => (c + 1) % n), autoSlideInterval);
//     return () => clearInterval(id);
//   }, [autoSlide, autoSlideInterval, n]);

//   if (n === 0) return null;

//   return (
//     <div className="relative overflow-hidden">
//       {/* Layer stack */}
//       <div className="relative">
//         {slides.map((slide, i) => (
//           <div
//             key={i}
//             className={[
//               "absolute inset-0",
//               "transition-opacity ease-out",
//               i === curr ? "opacity-100" : "opacity-0",
//             ].join(" ")}
//             style={{ transitionDuration: `${durationMs}ms`, willChange: "opacity" }}
//           >
//             {slide}
//           </div>
//         ))}

//         {/* giữ chiều cao bằng 1 “ghost” slide */}
//         <div className="invisible">{slides[0]}</div>
//       </div>

//       {/* arrows */}
//       {n > 1 && (
//         <div className="absolute inset-0 flex items-center justify-between p-4">
//           <button
//             onClick={prev}
//             className="rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft size={40} />
//           </button>
//           <button
//             onClick={next}
//             className="rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white"
//             aria-label="Next slide"
//           >
//             <ChevronRight size={40} />
//           </button>
//         </div>
//       )}

//       {/* dots */}
//       {n > 1 && (
//         <div className="absolute bottom-4 left-0 right-0">
//           <div className="flex items-center justify-center gap-2">
//             {slides.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurr(i)}
//                 className={`h-3 w-3 rounded-full transition-all ${
//                   curr === i ? "bg-white scale-110" : "bg-white/50"
//                 }`}
//                 aria-label={`Go to slide ${i + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
  images: Array<{ src: string; alt?: string }>;
};

export default function Carousel({ images }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[16px]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={500} // độ mượt/độ trễ
        pagination={{ clickable: true }}
        className="w-full"
      >
        {images.map((img) => (
          <SwiperSlide key={img.src}>
            <img
              src={img.src}
              alt={img.alt ?? ""}
              className="h-64 w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
