const CHIPS = ["Technology", "Automotive", "Science", "Culture", "Gaming", "Social Issues", "Entertainment"];

export default function CategoryChips() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <p className="pill">What&apos;s Trending:</p>
      {CHIPS.map((c) => (
        <button key={c} className="pill-dark hover-up">
          {c}
        </button>
      ))}
    </div>
  );
}
