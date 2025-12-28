import Link from "next/link";
import Container from "@/components/ui/Container";

const FOOTER_LINKS = {
  categories: ["Lifestyle", "Business", "Science", "Technology"],
  company: ["Mission & Vision", "Become an author", "Careers", "Press & Media"],
  policy: ["Private policy", "Term & Condition", "Subscribe", "Advertise"],
};

function SocialBtn({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 overflow-hidden">
      {/* full-width divider (tràn 2 bên) */}
      <div className="relative left-1/2 -ml-[50vw] w-screen">
        <div className="h-px bg-white/10" />
      </div>

      <div className="pb-16 pt-14">
        <Container>
          <div className="grid grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-4 lg:pr-10">
              <Link
                href="/"
                className="text-4xl font-extrabold tracking-tight text-[#d65778]"
              >
                Elora
              </Link>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
                Get the latest, most important news—fast. Real-time updates and
                verified facts, without the noise.
              </p>

              <div className="mt-6 inline-flex gap-3 rounded-2xl bg-white/[0.03] p-2">
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
                  <h6 className="mb-4 font-serif text-lg text-white">
                    Categories
                  </h6>
                  <ul className="space-y-4 text-white/55">
                    {FOOTER_LINKS.categories.map((t) => (
                      <li key={t}>
                        <a href="#" className="transition hover:text-white">
                          {t}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h6 className="mb-4 font-serif text-lg text-white">Company</h6>
                  <ul className="space-y-4 text-white/55">
                    {FOOTER_LINKS.company.map((t) => (
                      <li key={t}>
                        <a href="#" className="transition hover:text-white">
                          {t}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Policy (ẩn trên mobile giống Elora: d-none d-md-block) */}
                <div className="hidden md:block">
                  <h6 className="mb-4 font-serif text-lg text-white">Policy</h6>
                  <ul className="space-y-4 text-white/55">
                    {FOOTER_LINKS.policy.map((t) => (
                      <li key={t}>
                        <a href="#" className="transition hover:text-white">
                          {t}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="col-span-12 pt-10">
              <p className="text-center text-sm text-white/50 lg:text-left">
                © 2025 <span className="text-white">Elora</span>. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
