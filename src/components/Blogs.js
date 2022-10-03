import React from "react";
import Blog from "./Blog";

const sortByLikes = (b, a) => a.likes - b.likes;

const Blogs = ({ blogs, user, updateBlog, removeBlog }) => {
  return (
    <ul>
      {blogs.sort(sortByLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </ul>
  );
};

export default Blogs;
