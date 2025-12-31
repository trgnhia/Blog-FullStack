import HeaderShell from "@/components/layout/HeaderShell";
import PostHeader from "@/components/blog_detail/PostHeader";
import Footer from "@/components/category/CategoryFooter";
import PostContent from "@/components/blog_detail/PostContent";
import PostCardSlider from "@/components/blog_detail/PostCardSlider";
import Container from "@/components/ui/Container";
import { fetchBlogBySlug, fetchBlogs } from "@/services/blogService";
import { toBlogViewModel, toBlogViewModels } from "@/utils/blogMapper";
import { BlogSummary } from "@/types/blog";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogRaw = await fetchBlogBySlug(slug);
  const blog = toBlogViewModel(blogRaw);
  const allBlogsRaw = await fetchBlogs();
  const blogs = toBlogViewModels(allBlogsRaw).slice(0, 8);
  return (
    <>
      <HeaderShell />

      <main className="pb-20">
        <PostHeader
          coverImage={blog.coverImageUrl}
          category={blog.category}
          title={blog.title}
          authorName={blog.author}
          authorAvatar={blog.author}
          timeAgo={blog.timeAgo}
          readTime="6 mins read"
          commentsCount={98}
          viewsCount={168}
        />
        <PostContent content={blog.content} />

        <Container>
          <PostCardSlider blogs={blogs} />
        </Container>
      </main>

      <Footer />
    </>
  );
}
