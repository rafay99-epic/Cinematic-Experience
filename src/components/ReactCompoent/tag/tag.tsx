import * as React from "react";
import { useState } from "react";

interface BlogPost {
  title: string;
  description?: string;
  publishDate: string;
  readingTime?: string;
  slug: string;
  tags?: string[];
  heroimage?: string;
  draft?: boolean;
}

interface TagFilterProps {
  posts: BlogPost[];
}

const TagFilter: React.FC<TagFilterProps> = ({ posts }) => {
  const publishedPosts = posts.filter((post) => !post.draft);

  const allTags = Array.from(
    new Set(publishedPosts.flatMap((post) => post.tags || []))
  ).sort();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? publishedPosts.filter((post) => post.tags?.includes(selectedTag))
    : publishedPosts;

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  return (
    <div>
      <div className="tags-container mb-4 flex flex-wrap">
        {allTags.map((tag: string) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 m-1 rounded-lg border text-sm cursor-pointer ${
              selectedTag === tag
                ? "bg-primary-color text-white border-primary-color"
                : "bg-background-body text-text-main border-text-secondary"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.slug} className="post-item mb-6">
              <h2 className="text-xl font-bold">
                <a
                  href={`/blog/${post.slug}`}
                  className="text-primary-color hover:underline"
                >
                  {post.title}
                </a>
              </h2>
              <p className="text-text-secondary">{post.description}</p>
              <small className="text-text-secondary">
                {post.publishDate} • {post.readingTime}
              </small>
            </div>
          ))
        ) : (
          <p className="text-text-secondary">No posts found for this tag.</p>
        )}
      </div>
    </div>
  );
};

export default TagFilter;
