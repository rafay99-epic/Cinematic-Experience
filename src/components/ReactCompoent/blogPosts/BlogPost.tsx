import * as React from "react";
import { useState } from "react";
import { BlogPost } from "../../../interfaces/BlogPostInterface";

interface RawPost {
  id: string;
  slug: string;
  collection: string;
  data: {
    title: string;
    publishDate: string;
    description?: string;
    draft?: boolean;
  };
}

interface BlogListProps {
  posts: RawPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const formattedPosts: BlogPost[] = posts.map((post) => ({
    title: post.data.title,
    publishDate: post.data.publishDate,
    description: post.data.description,
    slug: post.slug,
    draft: post.data.draft,
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Pagination logic
  const filteredPosts = formattedPosts.filter((post) => !post.draft);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-[color:var(--text-main)]">
        Blog
      </h1>
      <div>
        {currentPosts.map((post, index) => (
          <div key={post.slug}>
            {index !== 0 && (
              <hr className="my-6 border-[color:var(--text-secondary)]" />
            )}
            <div className="mb-6">
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontWeight: 700,
                }}
              >
                <a
                  href={`/blog/${post.slug}`}
                  className="hover:text-[color:var(--primary-color)]"
                >
                  {post.title}
                </a>
              </h2>
              <p className="text-[color:var(--text-secondary)] text-base mb-2">
                {post.description}
              </p>
              <div
                className="post-item-footer text-sm uppercase"
                style={{
                  color: "var(--text-secondary)",
                  textAlign: "left",
                }}
              >
                <span className="post-item-date">
                  — {new Date(post.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-[color:var(--primary-color)] text-white font-bold rounded disabled:opacity-50 ${
            currentPage === 1 ? "cursor-not-allowed" : "hover:bg-opacity-80"
          }`}
        >
          Previous
        </button>
        <span className="text-[color:var(--text-secondary)]">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-[color:var(--primary-color)] text-white font-bold rounded disabled:opacity-50 ${
            currentPage === totalPages
              ? "cursor-not-allowed"
              : "hover:bg-opacity-80"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
