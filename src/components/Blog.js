import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const { id, title, author, url, likes, user: userId } = blog;
  const [showDetails, setShowDetails] = useState(false);

  const incrementLike = () => {
    updateBlog(id, { likes: likes + 1 });
  };

  return (
    <li style={blogStyle}>
      <p>
        {author}: {title}
        <button onClick={() => setShowDetails((prev) => !prev)}>
          {showDetails ? "hide" : "view"}
        </button>
      </p>
      {showDetails && (
        <div>
          <p>{url}</p>
          <p>
            likes: {likes} <button onClick={incrementLike}>like</button>
          </p>
          <p>{user.username}</p>
          {user.id === userId && (
            <button onClick={() => removeBlog(id)}>remove</button>
          )}
        </div>
      )}
    </li>
  );
};

const blogStyle = {
  padding: 10,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

export default Blog;
