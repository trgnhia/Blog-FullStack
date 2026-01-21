import BlogDeleteModal from "../../components/blog/BlogDeleteModal";
import { useState } from "react";
import axios from "axios";
import type { BlogResponse } from "../../types/Blog";
import DashboardOverview from "./DashboardOverview";
import TableSection from "./table/TableSection";
import useSWR from 'swr';
import type {Fetcher} from 'swr';
import { useAuth } from "../../auth/AuthContext";

const BLOG_PER_PAGE = 8;


const HomePage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {accessToken} = useAuth();
  const fetcher : Fetcher<BlogResponse[], string> = (url) => {
    return axios.get(
      url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      },
    ).then((res) => res.data);
  }
  

const { data: blogs, error, isLoading } =
  useSWR<BlogResponse[]>(accessToken ? "/api/blogs" : null, fetcher);


  if (isLoading) {
    return (
      <>
        <h4>Data is Fetching....</h4>
      </>
    );
  }
  if(error) {
    return (
      <>
      <h4>Have some error....</h4>
    </>
    );
  }
  if (blogs) {
    const totalBlogs = blogs.length;
    const totalPages = Math.ceil(totalBlogs / BLOG_PER_PAGE);
    const startIndex = (currentPage - 1) * BLOG_PER_PAGE;
    const endIndex = startIndex + BLOG_PER_PAGE;
    const blogsForPage = blogs.slice(startIndex, endIndex);
    function goToPage(page: number) {
      setCurrentPage(page);
    }
    const onPrevPage = () => {
      setCurrentPage(page => page - 1)
    };
    const onNextPage = () => {
      setCurrentPage(page => page + 1)
    }
  
    function handleOpenDeleteModal(id: string) {
      setShowDeleteModal(true);
      setSelectedId(id);
    }
    return (
      <div>
        <DashboardOverview allBlogs={blogs} />
        <TableSection
          currentPage={currentPage}
          allBlogs={blogsForPage}
          handleOpenDeleteModal={handleOpenDeleteModal}
          totalPages={totalPages}
          goToPage={goToPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
        <BlogDeleteModal
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
          id={selectedId}
        />
      </div>
    );
  }
};

export default HomePage;
