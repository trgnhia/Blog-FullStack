// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-white/70">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-white px-6 py-3 text-black"
      >
        Go back home
      </Link>
    </div>
  );
}
