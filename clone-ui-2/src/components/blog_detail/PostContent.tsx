export default function PostContent() {
  return (
    <section className="mx-auto max-w-[860px] lg:max-w-[960px] px-6 pb-24 pt-10">

      {/* Lead paragraph */}
      <p className="text-lg leading-[1.8] text-white/90">
        In an age of constant notifications, deadlines, and digital noise,
        slowing down isn&apos;t laziness — it&apos;s a skill. Learning how to
        pause, reflect, and breathe can bring clarity, creativity, and peace
        back into everyday life.
      </p>

      {/* Section title */}
      <h2 className="mt-12 font-serif text-2xl font-medium text-white">
        The Illusion of Constant Motion
      </h2>

      {/* Paragraphs */}
      <p className="mt-6 leading-[1.8] text-white/80">
        We live in a culture that glorifies speed — fast results, fast
        responses, fast growth. Every scroll, every click, every task adds
        up, leaving little room to reflect on why we&apos;re moving in the
        first place.
      </p>

      <p className="mt-6 leading-[1.8] text-white/80">
        The truth is, constant motion doesn&apos;t always mean progress.
        Sometimes, it simply means drifting further away from what truly
        matters.
      </p>

      {/* Image inside content */}
      <div className="my-12 overflow-hidden rounded-[18px]">
        <img
          src="/images/s5_2.jpg"
          alt="Stillness moment"
          className="w-full object-cover"
        />
      </div>

      {/* More text */}
      <p className="leading-[1.8] text-white/80">
        Slowing down allows space for awareness. It helps us notice subtle
        emotions, unspoken needs, and overlooked joys. In stillness, we
        reconnect with intention instead of urgency.
      </p>

      <p className="mt-6 leading-[1.8] text-white/80">
        This isn&apos;t about doing less — it&apos;s about doing things more
        consciously. Choosing depth over speed. Presence over pressure.
      </p>

      {/* Quote block (optional but đẹp UI) */}
      <blockquote className="mt-12 border-l-2 border-white/20 pl-6 italic text-white/70">
        “Almost everything will work again if you unplug it for a few minutes…
        including you.”
      </blockquote>
    </section>
  );
}
