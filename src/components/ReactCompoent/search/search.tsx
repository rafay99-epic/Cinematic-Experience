// import * as React from "react";
// import { useState } from "react";
// import Fuse from "fuse.js";

// interface BlogPost {
//   title: string;
//   description?: string;
//   publishDate: string;
//   readingTime?: string;
//   slug: string;
//   tags?: string[];
//   heroimage?: string;
//   draft?: boolean;
// }

// interface SearchBlogProps {
//   posts: BlogPost[];
// }

// const SearchBlog: React.FC<SearchBlogProps> = ({ posts }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

//   const fuse = new Fuse(posts, {
//     keys: ["title", "description", "tags"],
//     threshold: 0.3,
//   });

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (!query) {
//       setFilteredPosts([]);
//     } else {
//       const results = fuse.search(query).map((result) => result.item);
//       setFilteredPosts(results);
//     }
//   };

//   return (
//     <div
//       className="w-full p-4"
//       style={{ backgroundColor: "var(--background-body)" }}
//     >
//       <input
//         type="text"
//         placeholder="Search by title, description, or tag..."
//         value={searchQuery}
//         onChange={handleSearch}
//         className="w-full p-2 mb-2 rounded-md focus:outline-none focus:ring-2"
//         style={{
//           backgroundColor: "#f2f2f2",
//           color: "var(--text-main)",
//           borderColor: "var(--primary-color)",
//         }}
//       />

//       <div
//         className="results grid gap-2"
//         style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
//       >
//         {filteredPosts.length > 0 ? (
//           filteredPosts.map((post) => (
//             <a
//               key={post.slug}
//               href={`/blog/${post.slug}`}
//               className="p-3 rounded-md shadow-sm hover:shadow-md transition-shadow"
//               style={{
//                 backgroundColor: "var(--background-body)",
//                 color: "var(--text-main)",
//                 textDecoration: "none",
//                 border: "1px solid var(--primary-color)",
//               }}
//             >
//               <h2
//                 className="text-lg font-semibold mb-1"
//                 style={{ color: "var(--primary-color)" }}
//               >
//                 {post.title}
//               </h2>
//               <p
//                 className="text-xs mb-1"
//                 style={{ color: "var(--text-secondary)" }}
//               >
//                 {post.publishDate} ~ {post.readingTime}
//               </p>
//               <p className="text-sm mb-1">{post.description}</p>
//               {post.tags && (
//                 <div className="tags flex flex-wrap gap-1 mt-1">
//                   {post.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2 py-1 rounded-md text-xs"
//                       style={{
//                         backgroundColor: "var(--primary-color)",
//                         color: "white",
//                       }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </a>
//           ))
//         ) : (
//           <p
//             className="text-center col-span-full"
//             style={{ color: "var(--text-secondary)" }}
//           >
//             {searchQuery
//               ? "No results found"
//               : "Start typing to search for posts"}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchBlog;

import * as React from "react";
import { useState, CSSProperties } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  const fuse = new Fuse(posts, {
    keys: ["title", "description", "tags"],
    threshold: 0.3,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredPosts([]);
    } else {
      const results = fuse.search(query).map((result) => result.item);
      setFilteredPosts(results);
    }
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      width: "100%",
      padding: "16px",
      backgroundColor: "var(--background-body)",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "8px",
      borderRadius: "4px",
      outline: "none",
      border: "1px solid var(--primary-color)",
      backgroundColor: "#f2f2f2",
      color: "var(--text-main)",
    },
    results: {
      display: "grid",
      gap: "16px",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    },
    postLink: {
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: "var(--background-body)",
      color: "var(--text-main)",
      textDecoration: "none",
      border: "1px solid var(--primary-color)",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "box-shadow 0.2s",
    },
    postLinkHover: {
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    },
    title: {
      fontSize: "1.125rem",
      fontWeight: 600,
      marginBottom: "4px",
      color: "var(--primary-color)",
    },
    details: {
      fontSize: "0.75rem",
      marginBottom: "4px",
      color: "var(--text-secondary)",
    },
    description: {
      fontSize: "0.875rem",
      marginBottom: "8px",
    },
    tagsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "4px",
      marginTop: "8px",
    },
    tag: {
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "0.75rem",
      backgroundColor: "var(--primary-color)",
      color: "white",
    },
    noResults: {
      textAlign: "center" as "center",
      gridColumn: "1 / -1",
      color: "var(--text-secondary)",
    },
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search by title, description, or tag..."
        value={searchQuery}
        onChange={handleSearch}
        style={styles.input}
      />

      <div style={styles.results}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={styles.postLink}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  styles.postLinkHover.boxShadow)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow = styles.postLink.boxShadow)
              }
            >
              <h2 style={styles.title}>{post.title}</h2>
              <p style={styles.details}>
                {post.publishDate} ~ {post.readingTime}
              </p>
              <p style={styles.description}>{post.description}</p>
              {post.tags && (
                <div style={styles.tagsContainer}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))
        ) : (
          <p style={styles.noResults}>
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
