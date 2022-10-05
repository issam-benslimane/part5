import React, { useState } from 'react';

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const { id, title, author, url, likes, user: blogPoster } = blog;
  const [showDetails, setShowDetails] = useState(false);

  const incrementLike = () => {
    updateBlog(
      id,
      { likes: likes + 1 },
      (resp) => (blogs) => blogs.map((blog) => (blog.id === id ? resp : blog))
    );
  };

  const removeBlogHandler = () => {
    removeBlog(id, () => (blogs) => blogs.filter((blog) => blog.id !== id));
  };

  return (
    <li style={blogStyle} className="blog-item">
      <p>
        {author}: {title}
        <button onClick={() => setShowDetails((prev) => !prev)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </p>
      {showDetails && (
        <div data-testid="togglable">
          <p>{url}</p>
          <p>
            likes: {likes} <button onClick={incrementLike}>like</button>
          </p>
          <p>{blogPoster.username}</p>
          {user.id === blogPoster.id && (
            <button onClick={removeBlogHandler}>remove</button>
          )}
        </div>
      )}
    </li>
  );
};

const blogStyle = {
  padding: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

export default Blog;
