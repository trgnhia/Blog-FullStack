import { Card, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { BlogResponse } from "../../types/Blog";
import axios from "axios";
import { toBlogViewModel } from "../../utils/BlogMapper";
import { NavLink } from "react-router-dom";
const BlogViewPage = () => {
  const { blogSlug } = useParams();
  const [blog, setBlog] = useState<BlogResponse>();
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get<BlogResponse>(`/api/blogs/${blogSlug}`);
      setBlog(response.data);
    };
    fetchBlog();
  }, [blogSlug]);
  if (!blog) {
    return <p>Loading...</p>;
  }
  const blogModel = toBlogViewModel(blog);
  return (
    <div className="mx-auto" style={{ maxWidth: "900px" }}>
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4 p-md-5">
          <header className="mb-4">
            <div className="d-flex flex-wrap align-items-center gap-3 text-muted small mb-3">
              {/* Avatar chữ cái đầu tên tác giả */}
              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary fw-semibold"
                  style={{ width: 36, height: 36 }}
                >
                  {blogModel.author.charAt(0)}
                </div>
                <div className="d-flex flex-column lh-sm">
                  <span className="fw-semibold text-dark">
                    {blogModel.author}
                  </span>
                  <span className="text-muted">Author</span>
                </div>
              </div>

              <span className="text-secondary d-none d-md-inline">•</span>

              <span>{blogModel.created}</span>
              {blogModel.publish && <Badge bg="success">Published</Badge>}
              {!blogModel.publish && (
                <Badge bg="warning" text="dark">
                  Draft
                </Badge>
              )}
            </div>

            <h1 className="h3 h-lg2 fw-bold mb-0">{blog.title}</h1>
          </header>

          <div className="mb-4 rounded-4 overflow-hidden bg-light">
            <img
              src={blogModel.coverImageUrl}
              alt={blogModel.title}
              className="w-100"
              style={{ maxHeight: 380, objectFit: "cover" }}
            />
          </div>

          {blogModel.tagsArray.map((tag) => {
            return (
              <div className="mb-3 d-flex flex-wrap gap-2">
                <Badge
                  key={tag}
                  bg="secondary"
                  className="bg-opacity-25 text-secondary"
                  pill
                >
                  {tag}
                </Badge>
              </div>
            );
          })}
          <section
            className="mt-3 blog-content"
            style={{ fontSize: 15, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: blogModel.content }}
          />
          <div className="d-flex justify-content-end mt-4">
            <NavLink to="/">
              <Button variant="secondary">Back</Button>
            </NavLink>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogViewPage;
