import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BlogViewModel, BlogSummary } from "@/types/blog";

dayjs.extend(relativeTime);

export function toBlogViewModel(blog: BlogSummary): BlogViewModel {
  return {
    ...blog,
    tagsArray: blog.tags ? blog.tags.split(",").map((t) => t.trim()) : [],
    timeAgo: dayjs(blog.createdAt).fromNow(),
  };
}

export function toBlogViewModels(blogs: BlogSummary[]): BlogViewModel[] {
  return blogs.map(toBlogViewModel);
}

export function shuffleBlogs(array: BlogViewModel[]) : BlogViewModel[] {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
