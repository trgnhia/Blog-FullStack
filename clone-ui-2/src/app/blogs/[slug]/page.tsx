import HeaderShell from "@/components/layout/HeaderShell";
import PostHeader from "@/components/blog_detail/PostHeader";
import Footer from "@/components/category/CategoryFooter";
import PostContent from "@/components/blog_detail/PostContent";
import PostCardSlider from "@/components/blog_detail/PostCardSlider";
import Container from "@/components/ui/Container";
import { fetchBlogBySlug, fetchBlogs } from "@/services/blogService";
import { toBlogViewModel, toBlogViewModels } from "@/utils/blogMapper";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blogRaw = await fetchBlogBySlug(slug);
    const blog = toBlogViewModel(blogRaw);

    const title = blog.title;
    const description = blog.excerpt ?? blog.content?.slice(0, 155) ?? "";

    return {
      title,
      description,
      openGraph: {
        type: "article",
        title,
        description,
        url: `/blogs/${slug}`,
        images: blog.coverImageUrl
          ? [{ url: blog.coverImageUrl, width: 1200, height: 630, alt: title }]
          : undefined,
      },
      alternates: { canonical: `/blogs/${slug}` },
    };
  } catch {
    return {
      title: "Blog not found",
      description: "The requested article does not exist or is unavailable.",
      alternates: { canonical: `/blogs/undefined` },
    };
  }
}

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
