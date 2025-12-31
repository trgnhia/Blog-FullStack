export const BLOG_CATEGORIES = [
  "lifestyle",
  "fashion",
  "technology",
  "design",
  "travel",
  "gaming",
  "automotive",
  "culture",
  "inspiration",
  "science",
  "law"
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
