export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-2 text-white/60">{subtitle}</p>}
    </div>
  );
}
