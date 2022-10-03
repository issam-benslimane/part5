import React from "react";

const BlogForm = ({ addBlog }) => {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const elements = Array.from(ev.target.elements);
    const data = Object.fromEntries(
      elements
        .filter((el) => el.name && el.value)
        .map((el) => [el.name, el.value])
    );
    addBlog(data);
    ev.target.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>
        <label htmlFor="title">title:</label>
        <input type="text" name="title" id="title" />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input type="author" name="author" id="author" />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input type="url" name="url" id="url" />
      </div>
      <button>create</button>
    </form>
  );
};

export default BlogForm;
