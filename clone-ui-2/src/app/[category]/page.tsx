import HeaderShell from "@/components/layout/HeaderShell";
import Container from "@/components/ui/Container";
import CategoryFeaturedPost from "@/components/category/CategoryFeaturedPost";
import CategoryHeader from "@/components/category/CategoryHeader";
import WeeklyTrending from "@/components/category/WeeklyTrending";
import PostsGridSection from "@/components/home/PostsGridSection";

export default function CategoryPage() {
  return (
    <>
      <HeaderShell />

      <main className="pb-20">
        <Container>
          <div className="grid grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-8">
              <CategoryHeader />
              <CategoryFeaturedPost />
              <PostsGridSection />
{/* 
              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <PostsGridSection />
              </div> */}
            </div>

            {/* RIGHT – Weekly trending (làm sau) */}
            <div className="hidden lg:block lg:col-span-4">
              <WeeklyTrending />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
