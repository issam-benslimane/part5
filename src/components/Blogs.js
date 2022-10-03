import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} {...blog} />
      ))}
    </ul>
  );
};

export default Blogs;
