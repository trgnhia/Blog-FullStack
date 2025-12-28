import HeaderShell from "@/components/layout/HeaderShell";
import Container from "@/components/ui/Container";
import CategoryFeaturedPost from "@/components/category/CategoryFeaturedPost";
import CategoryHeader from "@/components/category/CategoryHeader";
import WeeklyTrending from "@/components/category/WeeklyTrending";
import CategoryPostsGrid from "@/components/category/CategoryPostsGrid";
import CategoriesBlock from "@/components/category/CategoriesBlock";
import Footer from "@/components/category/Footer";
import CategorySideImages from "@/components/category/CategorySideImages";
const slides = [
  "/images/s5_1.jpg",
  "/images/s5_2.jpg",
  "/images/s5_3.jpg",
  "/images/s6_1.jpg",
  "/images/s6_2.jpg",
  "/images/s6_3.jpg",
];

const images = slides.map((src) => ({ src }));

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
              <CategoryPostsGrid columns={2} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <WeeklyTrending />
              <CategoriesBlock />
              <div className="pt-10">
                <CategorySideImages images={images} />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
