import BlogForm from "../../components/blog/form/BlogForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { BlogResponse } from "../../types/Blog";

const BlogEditPage = () => {
  const { blogSlug } = useParams();
  const [blog, setBlog] = useState<BlogResponse>();
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get<BlogResponse>(`/api/blogs/slug/${blogSlug}`);
      setBlog(res.data);
    };
    fetchBlog();
  }, []);
  if (!blog) return;
  return <BlogForm mode="edit" blog={blog} />;
};

export default BlogEditPage;
