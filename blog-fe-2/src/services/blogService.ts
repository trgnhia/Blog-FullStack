import { BlogSummary } from "@/types/blog";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;


export async function fetchBlogs(): Promise<BlogSummary[]> {
  const res = await fetch(`${API_BASE}/api/blogs/published`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  return res.json();
}


export async function fetchBlogBySlug(slug: string): Promise<BlogSummary> {
  const url = `${API_BASE}/api/blogs/by-slug/${encodeURIComponent(slug)}`;

  console.log("FETCH URL:", url);

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.log("STATUS:", res.status, res.statusText);
    console.log("BODY:", text);
    throw new Error(`Failed to fetch detail blog: ${res.status}`);
  }

  return res.json();
}


export async function fetchBlogsByCategory(category: string): Promise<BlogSummary[]> {
  const res = await fetch(`${API_BASE}/api/blogs/category?category=${encodeURIComponent(category)}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  return res.json();
}