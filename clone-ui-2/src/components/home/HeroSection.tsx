import HeroCardLarge from "./HeroCardLarge";
import HeroCardSmall from "./HeroCardSmall";
import { BlogViewModel } from "@/types/blog";

export default function HeroSection({ blogs }: { blogs: BlogViewModel[] }) {
  const smallHeroBlog = blogs[0];
  const largeHeroBlog = blogs[1];
  return (
    // <section className="container-page pb-10">
    //   <div className="grid gap-[42px] lg:grid-cols-[5fr_7fr]">
    //     <HeroCardSmall  blog={smallHeroBlog}/>
    //     <HeroCardLarge blog={largeHeroBlog} />
    //   </div>
    // </section>
    <section className="container-page pb-10">
  <div className="grid items-stretch gap-[42px] lg:grid-cols-[5fr_7fr]">
    <div className="h-full">
      <HeroCardSmall blog={smallHeroBlog} />
    </div>
    <div className="h-full">
      <HeroCardLarge blog={largeHeroBlog} />
    </div>
  </div>
</section>

  );
}
