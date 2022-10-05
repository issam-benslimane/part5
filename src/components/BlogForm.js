import React, { useRef } from 'react';
import Togglable from './Togglable';

const BlogForm = ({ addBlog, displayMessage }) => {
  const toggleFormRef = useRef();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const data = getFormData(ev.target);
    addBlog(data, (resp) => (blogs) => blogs.concat(resp));
    displayMessage(`a new blog "${data.title}" added`);
    toggleFormRef.current.toggleVisible();
    ev.target.reset();
  };

  return (
    <Togglable label="new blog" ref={toggleFormRef}>
      <form onSubmit={handleSubmit} className="blog-form">
        <h2>Create new</h2>
        <div>
          <label htmlFor="title">title:</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input type="text" name="author" id="author" />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input type="url" name="url" id="url" />
        </div>
        <button>create</button>
      </form>
    </Togglable>
  );
};

const getFormData = (form) => {
  const elements = Array.from(form.elements);
  return Object.fromEntries(
    elements
      .filter((el) => el.name && el.value)
      .map((el) => [el.name, el.value])
  );
};

export default BlogForm;
