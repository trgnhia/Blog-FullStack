import HeaderShell from "@/components/layout/HeaderShell";
import PostHeader from "@/components/blog_detail/PostHeader";
import Footer from "@/components/category/Footer";
import PostContent from "@/components/blog_detail/PostContent";
import PostCardSlider from "@/components/blog_detail/PostCardSlider";
import Container from "@/components/ui/Container";
export default function BlogDetailPage() {
  return (
    <>
      <HeaderShell />

      <main className="pb-20">
        <PostHeader
          coverImage="/images/s5_1.jpg"
          category="Creative"
          title="The Subtle Art of Slowing Down in a World That Never Seems to Stop Moving"
          authorName="Emma Collins"
          authorAvatar="/uploads/blogImages/author.jpg"
          dateText="12 July, 2025"
          readTime="6 mins read"
          commentsCount={98}
          viewsCount={168}
        />
      </main>
      <PostContent />
      <Container>
        <PostCardSlider />
      </Container>
      <Footer />
    </>
  );
}
