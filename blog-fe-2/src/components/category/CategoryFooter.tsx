import Link from "next/link";
import Container from "@/components/ui/Container";

const FOOTER_LINKS = {
  categories: ["culture", "automotive", "science", "technology"],
  company: ["Mission & Vision", "Become an author", "Careers", "Press & Media"],
  policy: ["Private policy", "Term & Condition", "Subscribe", "Advertise"],
};

function SocialBtn({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-black/80 dark:text-white/80 transition-colors hover:-translate-y-0.5 hover:bg-black/10 dark:hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export default function CategoryFooter() {
  return (
    <footer className="mt-16 overflow-hidden">
      {/* full-width divider (tràn 2 bên) */}
      <div className="relative left-1/2 -ml-[50vw] w-screen">
        <div className="h-px bg-black/10 dark:bg-white/10 transition-colors" />
      </div>

      <div className="pb-16 pt-14">
        <Container>
          <div className="grid grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-4 lg:pr-10">
              <Link
                href="/"
                className="text-4xl font-extrabold tracking-tight text-pink-600 dark:text-[#d65778] transition-colors"
              >
                MyBlog
              </Link>

              <p className="mt-4 max-w-md text-sm leading-6 text-black/70 dark:text-white/70 transition-colors">
                Get the latest, most important news—fast. Real-time updates and
                verified facts, without the noise.
              </p>

              <div className="mt-6 inline-flex gap-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] transition-colors p-2">
                <SocialBtn>f</SocialBtn>
                <SocialBtn>X</SocialBtn>
                <SocialBtn>in</SocialBtn>
                <SocialBtn>Bē</SocialBtn>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                {/* Categories */}
                <div>
                  <h6 className="mb-4 font-serif text-lg text-[#1a1a1a] dark:text-white transition-colors">
                    Categories
                  </h6>
                  <ul className="space-y-4 text-black/55 dark:text-white/55 transition-colors">
                    {FOOTER_LINKS.categories.map((t) => (
                      <li key={t}>
                        <a href={`/${t}`} className="transition-colors hover:text-[#1a1a1a] dark:hover:text-white capitalize">
                          {t}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h6 className="mb-4 font-serif text-lg text-[#1a1a1a] dark:text-white transition-colors">Company</h6>
                  <ul className="space-y-4 text-black/55 dark:text-white/55 transition-colors">
                    {FOOTER_LINKS.company.map((t) => (
                      <li key={t}>
                        <div className="transition-colors hover:text-[#1a1a1a] dark:hover:text-white cursor-pointer">
                          {t}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Policy (ẩn trên mobile giống Elora: d-none d-md-block) */}
                <div className="hidden md:block">
                  <h6 className="mb-4 font-serif text-lg text-[#1a1a1a] dark:text-white transition-colors">Policy</h6>
                  <ul className="space-y-4 text-black/55 dark:text-white/55 transition-colors">
                    {FOOTER_LINKS.policy.map((t) => (
                      <li key={t}>
                        <div className="transition-colors hover:text-[#1a1a1a] dark:hover:text-white cursor-pointer">
                          {t}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="col-span-12 pt-10">
              <p className="text-center text-sm text-black/50 dark:text-white/50 lg:text-left transition-colors">
                © 2025 <span className="text-[#1a1a1a] dark:text-white">TranNghia</span>. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
