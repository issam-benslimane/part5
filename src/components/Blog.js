import React from "react";

const Blog = ({ title, author, url }) => {
  return (
    <li>
      <p>
        {author}: {title}
      </p>
    </li>
  );
};

export default Blog;
