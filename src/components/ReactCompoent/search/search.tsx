import * as React from "react";
import { useState } from "react";
import Fuse from "fuse.js";

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

interface SearchBlogProps {
  posts: BlogPost[];
}

const SearchBlog: React.FC<SearchBlogProps> = ({ posts }) => {
  const publishedPosts = posts.filter((post) => !post.draft);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] =
    useState<BlogPost[]>(publishedPosts);

  const fuse = new Fuse(publishedPosts, {
    keys: ["title", "description", "tags"],
    threshold: 0.3,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredPosts(publishedPosts);
    } else {
      const results = fuse.search(query).map((result) => result.item);
      setFilteredPosts(results);
    }
  };

  return (
    <div className="w-full p-4 bg-background-body">
      <input
        type="text"
        placeholder="Search by title, description, or tag..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 mb-2 border border-primary-color rounded-md bg-transparent text-text-main focus:outline-none"
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-3 border border-primary-color bg-background-body text-text-main rounded-lg shadow-sm transition-shadow duration-200 hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold mb-1 text-primary-color">
                {post.title}
              </h2>
              <p className="text-xs text-text-secondary mb-1">
                {new Date(post.publishDate).toLocaleDateString()} ~{" "}
                {post.readingTime}
              </p>
              <p className="text-sm mb-2">{post.description}</p>
              {post.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-xs bg-primary-color text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))
        ) : (
          <p className="text-center col-span-full text-text-secondary">
            {searchQuery
              ? "No results found"
              : "Start typing to search for posts"}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBlog;
