// src/interfaces/BlogPost.ts
export interface BlogPost {
  title: string;
  description?: string;
  publishDate: string;
  readingTime?: string;
  slug: string;
  tags?: string[];
  heroimage?: string;
  draft?: boolean;
}
