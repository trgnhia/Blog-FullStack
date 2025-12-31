import {BlogSummary } from "@/types/blog";

const API_BASE = "http://localhost:8081";

export async function fetchBlogs(): Promise<BlogSummary[]> {
  const res = await fetch(`${API_BASE}/api/blogs/published`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  return res.json();
}


export async function fetchBlogBySlug(slug : string) : Promise<BlogSummary> {
  const res = await fetch(`${API_BASE}/api/blogs/slug/${slug}`, {
    next : {revalidate:60}
  });
  if (!res.ok) throw new Error("Failed to fetch detail blog");
  return res.json();
}


export async function fetchBlogsByCategory(category : string): Promise<BlogSummary[]> {
  const res = await fetch(`${API_BASE}/api/blogs/category/${category}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  return res.json();
}
