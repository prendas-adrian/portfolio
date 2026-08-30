import { useState } from "react";
import ReactMarkdown from "react-markdown";
import PrismCode from "../PrismCode";

function BlogPage({ blogs }) {
  const [expandedBlog, setExpandedBlog] = useState(null);

  const toggleBlog = (id) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  const components = {
    pre({ children }) {
      return children;
    },
    code({ inline, className, children }) {
      const language = /language-(\w+)/.exec(className || "")?.[1];
      if (inline || !language) {
        return <code className={className}>{children}</code>;
      }
      return <PrismCode language={language}>{children}</PrismCode>;
    },
  };

  return (
    <div id="blog">
      <section className="clearfix">
        <div className="g2">
          <h3>Blog</h3>
          <ul className="no-list work blog-list">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <a
                  href={`#${blog.id}`}
                  className="blog-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleBlog(blog.id);
                  }}
                >
                  {blog.title}
                </a>
                {expandedBlog === blog.id && (
                  <div className="blog-content">
                    <ReactMarkdown components={components}>
                      {blog.content}
                    </ReactMarkdown>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
