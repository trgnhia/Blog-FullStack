
import React from "react";
import { Card, Badge } from "react-bootstrap";

// Bạn có thể thay type này bằng interface Blog thật của bạn
type BlogView = {
  title: string;
  author: string;
  createdAt: string; // hoặc Date string
  category?: string;
  coverImage: string;
  tags: string[];
  // content là HTML do TinyMCE trả về
  content: string;
};

const mockBlog: BlogView = {
  title: "How to make a Game look more attractive with New VR & AI Technology",
  author: "Pedro Domingos",
  createdAt: "16 March 2023",
  category: "Development",
  coverImage: "/images/blog-detail-vr.jpg",
  tags: ["VR", "AI", "Gaming"],
  content: `
    <p>
      Google has been investing in AI for many years and bringing its benefits
      to individuals, businesses and communities. Whether it's publishing
      state-of-the-art research, building helpful products or developing tools
      and resources that enable others, we're committed to making AI accessible
      to everyone.
    </p>

    <p>
      We're now at a pivotal moment in our AI journey. Breakthroughs in
      generative AI are fundamentally changing how people interact with
      technology — and at Google, we've been responsibly developing large
      language models so we can safely bring them to our products.
    </p>

    <blockquote>
      “People worry that computers will get too smart and take over the world,
      but the real problem is that they're too stupid and they've already taken
      over the world.”
    </blockquote>

    <p>
      More than 3 billion people already benefit from AI-powered features in
      Google Workspace, whether it's using Smart Compose in Gmail or
      auto-generated summaries in Google Docs. Now, we're excited to take the
      next step and bring a limited set of trusted testers a new set of features
      that makes the process of writing even easier.
    </p>
  `,
};

const BlogViewPage: React.FC = () => {
  // Sau này bạn sẽ lấy blog thật từ props / route / context
  const blog = mockBlog;

  return (
    <div className="mx-auto" style={{ maxWidth: "900px" }}>
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4 p-md-5">
          {/* Meta trên cùng */}
          <header className="mb-4">
            <div className="d-flex flex-wrap align-items-center gap-3 text-muted small mb-3">
              {/* Avatar chữ cái đầu tên tác giả */}
              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary fw-semibold"
                  style={{ width: 36, height: 36 }}
                >
                  {blog.author.charAt(0)}
                </div>
                <div className="d-flex flex-column lh-sm">
                  <span className="fw-semibold text-dark">
                    {blog.author}
                  </span>
                  <span className="text-muted">Author</span>
                </div>
              </div>

              <span className="text-secondary d-none d-md-inline">•</span>

              <span>{blog.createdAt}</span>

              {blog.category && (
                <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary fw-semibold">
                  {blog.category}
                </span>
              )}
            </div>

            <h1 className="h3 h-lg2 fw-bold mb-0">{blog.title}</h1>
          </header>

          {/* Ảnh cover */}
          <div className="mb-4 rounded-4 overflow-hidden bg-light">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-100"
              style={{ maxHeight: 380, objectFit: "cover" }}
            />
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="mb-3 d-flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge
                  key={tag}
                  bg="secondary"
                  className="bg-opacity-25 text-secondary"
                  pill
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Nội dung — sau này thay bằng content HTML từ TinyMCE */}
          <section
            className="mt-3 blog-content"
            style={{ fontSize: 15, lineHeight: 1.8 }}
            // content là HTML (TinyMCE) 👉 dùng dangerouslySetInnerHTML
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogViewPage;
