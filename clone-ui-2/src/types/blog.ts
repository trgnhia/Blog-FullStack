export interface BlogSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  author: string;
  tags: string;     
  createdAt: string;
  content: string
}

export interface BlogViewModel extends BlogSummary {
  tagsArray: string[];
  timeAgo: string;
}
