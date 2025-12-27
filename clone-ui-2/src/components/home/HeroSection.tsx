import HeroCardLarge from "./HeroCardLarge";
import HeroCardSmall from "./HeroCardSmall";

export default function HeroSection() {
  return (
    <section className="container-page pb-10">
      <div className="grid gap-[42px] lg:grid-cols-[5fr_7fr]">
        <HeroCardSmall />
        <HeroCardLarge />
      </div>
    </section>
  );
}
