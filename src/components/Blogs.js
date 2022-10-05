import React from 'react';
import Blog from './Blog';

const sortByLikes = (b, a) => a.likes - b.likes;

const Blogs = ({ blogs, user, updateBlogs, displayMessage }) => {
  return (
    <ul>
      {blogs.sort(sortByLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlogs('update')}
          removeBlog={updateBlogs('remove')}
          displayMessage={displayMessage}
        />
      ))}
    </ul>
  );
};

export default Blogs;
