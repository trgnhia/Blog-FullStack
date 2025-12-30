'use client'
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";


type Props = {
  currentPage: number;
  totalPage: number;
  onPageChange?: (page: number) => void;
  onNextPage?: () => void
  onPrevPage?: () => void
}

export default function BlogsPagination ({
  currentPage,
  totalPage,
  onNextPage,
  onPrevPage,
  onPageChange
} : Props) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPage;

  return (
    <div className="mt-10 flex justify-end">
      <div className="flex items-center gap-6 rounded-3xl bg-white px-8 py-4 shadow-md ring-1 ring-gray-100">
        <button
          type="button"
          disabled={isFirstPage}
          className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs transition
            ${
              isFirstPage
                ? "cursor-not-allowed border-gray-300 text-gray-300"
                : "border-gray-500 text-gray-700 hover:border-purple-400 hover:text-purple-600"
            }
          `}
          onClick={onPrevPage}
        >
          <GrLinkPrevious />
        </button>

        {/* Các số trang */}
        <div className="flex items-center gap-4 text-xs font-medium">
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange?.(p)}
                className={`transition ${
                  isActive
                    ? "text-purple-600 font-semibold"
                    : "text-gray-500 hover:text-purple-500"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Nút Next */}
        <button
          type="button"
          disabled={isLastPage}
          className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs transition
            ${
              isLastPage
                ? "cursor-not-allowed border-gray-300 text-gray-300"
                : "border-gray-500 text-gray-700 hover:border-purple-400 hover:text-purple-600"
            }
          `}
          onClick={onNextPage}
        >
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
}