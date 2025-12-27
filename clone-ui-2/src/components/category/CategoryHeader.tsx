import Image from "next/image";

export default function CategoryHeader() {
  return (
    <section className="pt-6">
      {/* Avatar + Title */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <Image
            src="http://localhost:8081/uploads/blogImages/c447dbd1-2c3a-4f20-83dc-f0f749c5d4d5.jpg"  
            alt="Lifestyle"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        {/* Title + meta */}
        <div>
          <h1 className="text-4xl font-serif text-white mb-1">
            Lifestyle
          </h1>
          <p className="text-white/60 text-lg">
            20 articles
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 max-w-2xl text-white/70 leading-relaxed">
        Discover simple ways to live with purpose, balance, and creativity — from
        mindful habits to meaningful routines that make everyday life feel more
        inspiring and fulfilling.
      </p>
    </section>
  );
}
