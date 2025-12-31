"use client";

import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import BlogCard from "@/components/blogs/BlogCard";
import BlogsPagination from "./BlogsPagination";
import { useRouter } from "next/navigation";
import { BlogViewModel } from "@/types/blog";

type Props = {
  allBlogs: BlogViewModel[];
};

const PER_PAGE = 8;
export default function BlogPagePagination({ allBlogs }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  let page = Number(pageParam);
  if (!page || page < 1) {
    page = 1;
  }
  const totalBlogs = allBlogs.length;
  const totalPage = Math.ceil(totalBlogs / PER_PAGE);
  const startIndex = (page - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const visibleBlogsPerPage = allBlogs.slice(startIndex, endIndex);

  function handleNextPage() {
    router.push(`/blogs?page=${page + 1}`);
  }
  function handlePrevPage() {
    router.push(`/blogs?page=${page - 1}`);
  }
  function handlePageChange(selectedPage: number) {
    router.push(`/blogs?page=${selectedPage}`);
  }
  return (
    <>
      <section className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          <span className="text-gray-900">For </span>
          <span className="text-purple-600">you</span>
        </h1>

        {/* Search input */}
        <div className="mt-4 max-w-xl">
          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
            <span className="text-gray-400 text-sm">
              <FaSearch size={15} />
            </span>
            <input
              type="text"
              placeholder="Search article..."
              className="w-full border-none bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </section>

      {/* Blog list */}
      <section className="space-y-4">
        {visibleBlogsPerPage.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </section>
      <BlogsPagination
        currentPage={page}
        totalPage={totalPage}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
