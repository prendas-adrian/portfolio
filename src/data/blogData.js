const rawBlogs = import.meta.glob("/examples/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const titleFromFilename = (filename) => {
  const name = filename.split("/").pop().replace(/\.md$/, "");
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const blogs = Object.entries(rawBlogs)
  .map(([filename, content]) => ({
    id: filename.split("/").pop().replace(/\.md$/, ""),
    title: titleFromFilename(filename),
    content,
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

export default blogs;
