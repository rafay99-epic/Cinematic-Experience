import * as React from "react";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-[color:var(--text-main)]">
        Blog
      </h1>
      <div>
        {formattedPosts
          .filter((post) => !post.draft)
          .map((post, index) => (
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
    </div>
  );
};

export default BlogList;
