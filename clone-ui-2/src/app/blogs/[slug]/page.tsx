import HeaderShell from "@/components/layout/HeaderShell";
import Container from "@/components/ui/Container";
import PostHeader from "@/components/blog_detail/PostHeader";
import Footer from "@/components/category/Footer";
export default function BlogDetailPage() {
  return (
    <>
      <HeaderShell />
      <main className="pb-20">
        <Container>
          <div className="grid grid-cols-12 gap-10 pt-6">
            {/* LEFT content */}
            <div className="col-span-12 lg:col-span-7 lg:pr-10">
              <PostHeader
                category="Creative"
                title="The Subtle Art of Slowing Down in a World That Never Seems to Stop Moving"
                authorName="Emma Collins"
                authorAvatar="/uploads/blogImages/author.jpg"
                dateText="12 July, 2025"
                readTime="6 mins read"
                commentsCount={98}
                viewsCount={168}
              />
            </div>

            {/* RIGHT coverImage sẽ làm sau */}
            <div className="col-span-12 lg:col-span-5" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
