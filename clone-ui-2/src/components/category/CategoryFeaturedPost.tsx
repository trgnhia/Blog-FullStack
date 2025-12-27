import Image from "next/image";
import Link from "next/link";

export default function CategoryFeaturedPost() {
  return (
    <article className="mt-10">
      {/* Image */}
      <Link href="#">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="/images/featured-post.webp" // thay bằng src bạn đã dùng
            alt="Turning Ordinary Things into Truly Extraordinary Concepts"
            width={1200}
            height={700}
            className="w-full h-auto transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>

      {/* Title */}
      <Link href="#">
        <h2 className="mt-6 text-3xl font-serif text-white leading-snug hover:underline">
          Turning Ordinary Things into Truly Extraordinary Concepts
        </h2>
      </Link>

      {/* Excerpt */}
      <p className="mt-3 text-white/70 max-w-2xl">
        Everyday life is full of creative potential. Learn how to look deeper,
        reimagine familiar things, and turn them into unique, design concepts.
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        <Image
          src="/images/author-avatar.webp" // thay bằng src bạn dùng
          alt="Emma Collins"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="text-sm">
          <p className="text-white font-medium">Emma Collins</p>
          <p className="text-white/50">12 July, 2025</p>
        </div>
      </div>
    </article>
  );
}
