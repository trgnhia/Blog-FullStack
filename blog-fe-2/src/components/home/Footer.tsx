// app/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-10">
      {/* divider full width */}
      <div className="relative left-1/2 -ml-[50vw] w-screen">
        <div className="h-px bg-black/10 dark:bg-white/10 transition-colors" />
      </div>

      {/* content */}
      <div className="py-24 text-center">
        <h2 className="text-4xl font-serif text-pink-600 dark:text-primary mb-4 transition-colors">
          MyBlog
        </h2>

        <p className="max-w-xl mx-auto text-black/70 dark:text-white/70 leading-relaxed transition-colors">
          Get the latest, most important news—fast. Real-time updates
          and verified facts, without the noise.
        </p>

        {/* social icons */}
        <div className="mt-8 flex justify-center gap-4">
          {["f", "x", "in", "be"].map((s) => (
            <button
              key={s}
              className="w-11 h-11 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors
                         flex items-center justify-center text-black/80 dark:text-white/80"
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        {/* copyright */}
        <p className="mt-10 text-sm text-black/40 dark:text-white/40 transition-colors">
          © 2025 <span className="text-[#1a1a1a] dark:text-white">MyBlog</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
