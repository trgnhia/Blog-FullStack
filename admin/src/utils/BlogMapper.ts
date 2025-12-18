import type { BlogResponse, BlogViewModel } from "../types/Blog";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
export function toBlogViewModel(blog : BlogResponse) : BlogViewModel {
  return {
    ...blog,
    tagsArray: blog.tags ? blog.tags.split(",").map((t) => t.trim()) : [],
    created: dayjs(blog.createdAt).format("YYYY-MM-DD")
  };
}

export function toBlogViewModels (blogs : BlogResponse[]) : BlogViewModel[] {
  return blogs.map(toBlogViewModel);
}