import HeaderShell from "@/components/layout/HeaderShell";
import CategoryChips from "@/components/sections/CategoryChips";
import TrendingTopics from "@/components/home/TrendingTopics";
import Container from "@/components/ui/Container";
import HeroSection from "@/components/home/HeroSection";
import PostsGridSection from "@/components/home/PostsGridSection";
import TopAuthorsSection from "@/components/home/TopAuthorsSection";
import Footer from "@/components/home/Footer";
import { fetchBlogs } from "@/services/blogService";
import { toBlogViewModels   } from "@/utils/blogMapper";

export default async function Page() {
  const rawBlogs = await fetchBlogs();
  const viewModelBlogs = toBlogViewModels(rawBlogs);
  const heroBlogs = viewModelBlogs.slice(0,2);
  const gridBlogs = viewModelBlogs.slice(2);
  return (
    <div className="min-h-screen">
      <HeaderShell />
  
      <main className="pb-20">
        <Container>
          <div className="pt-6">
            <HeroSection blogs={heroBlogs}/>
          </div>
  
          <div className="pt-10">
            <CategoryChips />
          </div>
  
          <div className="pt-6">
            <TrendingTopics />
          </div>
          <div className="pt-6">
            <PostsGridSection blogs={gridBlogs}/>
          </div>
          <section className="mt-10 pt-10">
            <div className="relative left-1/2 -ml-[50vw] w-screen">
              <div className="h-px bg-white/10" />
            </div>
  
            <div className="pt-10">
              <TopAuthorsSection />
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

