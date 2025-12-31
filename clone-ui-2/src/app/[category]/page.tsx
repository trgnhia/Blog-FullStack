import HeaderShell from "@/components/layout/HeaderShell";
import Container from "@/components/ui/Container";
import CategoryFeaturedPost from "@/components/category/CategoryFeaturedPost";
import CategoryHeader from "@/components/category/CategoryHeader";
import WeeklyTrending from "@/components/category/WeeklyTrending";
import CategoryPostsGrid from "@/components/category/CategoryPostsGrid";
import CategoriesBlock from "@/components/category/CategoriesBlock";
import CategoryFooter from "@/components/category/CategoryFooter";
import CategorySideImages from "@/components/category/CategorySideImages";
import { toBlogViewModels } from "@/utils/blogMapper";
import { fetchBlogsByCategory } from "@/services/blogService";
const slides = [
  "/images/category/image_2.jpg",
  "/images/category/image_1.jpg",
  "/images/category/image_3.jpg",
  "/images/category/image_4.jpg",
  "/images/category/image_5.jpg",
];

const images = slides.map((src) => ({ src }));

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const rawBlogs = await fetchBlogsByCategory(category);
  const categoryBlogs = toBlogViewModels(rawBlogs);
  const numberOfBlogs = categoryBlogs.length;
  const featuredPost = categoryBlogs[0];
  const gridBlogs = categoryBlogs.slice(1);
  const trendingBlogs = categoryBlogs.slice(0, 5);
  return (
    <>
      <HeaderShell />
      <main className="pb-20">
        <Container>
          <div className="grid grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-8">
              <CategoryHeader
                category={category}
                numberOfBlogs={numberOfBlogs}
                src={`/images/home/${category}.jpg`}
              />
              <CategoryFeaturedPost blog={featuredPost} />
              <CategoryPostsGrid columns={2} blogs={gridBlogs} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <WeeklyTrending blogs={trendingBlogs} />
              <CategoriesBlock />
              <div className="pt-10">
                <CategorySideImages images={images} />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <CategoryFooter />
    </>
  );
}
