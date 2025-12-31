
"use client";
import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="
        fixed bottom-6 right-6 z-50
        h-12 w-12
        rounded-full
        bg-black/40 backdrop-blur
        border border-white/20
        flex items-center justify-center
        text-white
        hover:bg-black/60
        transition
      "
    >
      <IoArrowUp size={20} />
    </button>
  );
}

// "use client";
// import { useState, useEffect, useRef } from "react";
// import { IoArrowUp } from "react-icons/io5";

// export default function ScrollToTopButton() {
//   const [show, setShow] = useState<boolean>(false);
//   const progressCircleRef = useRef<SVGCircleElement | null>(null);

//   const size = 48; // kích thước button

//   /*
//     SVG dùng hệ tọa độ riêng, không phải px

//     viewBox="0 0 40 40" nghĩa là:

//     góc trái trên: (0, 0)

//     góc phải dưới: (40, 40)
//   */
//   const viewBox = 40;
//   // tọa độ xy của tâm ,viewBox 40 40 ==> tâm chính giữa là 20 20
//   const cx = 20;
//   const cy = 20;
//   const radius = 18;

//   function calcScrollValue() {
//     //Vị trí đã scroll xuống bao nhiêu px tính từ top
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;

//     // scrollHeight: toàn bộ chiều cao trang (nội dung)
//     // clientHeight: chiều cao nhìn thấy trong viewport
//     const scrollHeight = document.documentElement.scrollHeight;
//     const clientHeight = document.documentElement.clientHeight;
//     // tổng chiều cao có thể scroll
//     const totalScrollable = scrollHeight - clientHeight;

//     const progress =
//       totalScrollable > 0 ? (scrollTop / totalScrollable) : 0;
//     const circumference = 2 * Math.PI * radius;
//     const dashoffset = circumference * (1 - progress);
//     setShow(window.scrollY > 100);

//     if (progressCircleRef.current) {
//       progressCircleRef.current.style.strokeDasharray = `${circumference}`;
//       progressCircleRef.current.style.strokeDashoffset = `${dashoffset}`;
//     }
//   }

//   useEffect(() => {
//     calcScrollValue();
//     window.addEventListener("scroll", calcScrollValue);
//     return () => window.removeEventListener("scroll", calcScrollValue);
//   }, []);



//   if (!show) return;
//    return (
//     <button
//       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//       aria-label="Back to top"
//       title="Back to top"
//       className="
//         fixed bottom-6 right-6 z-50
//         grid place-items-center
//         rounded-full
//         bg-black/40 backdrop-blur
//         border border-white/20
//         text-white
//         hover:bg-black/60
//         transition
//       "
//       style={{ width: size, height: size }}
//     >
//       {/* ===== SVG Progress Ring (absolute overlay) ===== */}
//       <svg
//         width="100%"
//         height="100%"
//         viewBox={`0 0 ${viewBox} ${viewBox}`}
//         className="absolute inset-0"
//         aria-hidden="true"
//       >
//         {/* Track (vòng nền) */}
//         <circle
//           cx={cx}
//           cy={cy}
//           r={radius}
//           fill="none"
//           stroke="rgba(255,255,255,0.18)"
//           strokeWidth="3"
//         />

//         {/* Progress (vòng chạy) */}
//         <circle
//           ref={progressCircleRef}
//           cx={cx}
//           cy={cy}
//           r={radius}
//           fill="none"
//           stroke="rgb(236 72 153)" 
//           strokeWidth="3"
//           strokeLinecap="round"
//           // Bắt đầu từ đỉnh (12h) thay vì 3h
//           transform={`rotate(-90 ${cx} ${cy})`}
//           style={{
//             transition: "stroke-dashoffset 120ms linear",
//           }}
//         />
//       </svg>

//       {/* ===== Inner circle (lõi) + icon ===== */}
//       <span
//         className="
//           relative
//           grid place-items-center
//           h-[80%] w-[80%]
//           rounded-full
//           bg-black/60
//           border border-white/10
//         "
//       >
//         <IoArrowUp size={18} />
//       </span>
//     </button>
//   );
// }
