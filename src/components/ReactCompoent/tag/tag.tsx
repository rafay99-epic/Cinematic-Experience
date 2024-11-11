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
  // Filter out posts that are drafts
  const publishedPosts = posts.filter((post) => !post.draft);

  // Gather unique tags from published posts only
  const allTags = Array.from(
    new Set(publishedPosts.flatMap((post) => post.tags || []))
  ).sort();

  // State to hold the selected tag and filtered posts
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? publishedPosts.filter((post) => post.tags?.includes(selectedTag))
    : publishedPosts;

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  return (
    <div>
      <div className="tags-container" style={{ marginBottom: "1rem" }}>
        {allTags.map((tag: string) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            style={{
              padding: "0.5rem 1rem",
              margin: "0.2rem",
              borderRadius: "5px",
              backgroundColor:
                selectedTag === tag
                  ? "var(--primary-color)"
                  : "var(--background-body)",
              color: selectedTag === tag ? "#fff" : "var(--text-main)",
              border: `1px solid ${
                selectedTag === tag
                  ? "var(--primary-color)"
                  : "var(--text-secondary)"
              }`,
              cursor: "pointer",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="post-item"
              style={{ marginBottom: "1.5rem" }}
            >
              <h2>
                <a
                  href={`/blog/${post.slug}`}
                  style={{
                    color: "var(--primary-color)",
                    textDecoration: "none",
                  }}
                >
                  {post.title}
                </a>
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                {post.description}
              </p>
              <small style={{ color: "var(--text-secondary)" }}>
                {post.publishDate} • {post.readingTime}
              </small>
            </div>
          ))
        ) : (
          <p style={{ color: "var(--text-secondary)" }}>
            No posts found for this tag.
          </p>
        )}
      </div>
    </div>
  );
};

export default TagFilter;
