import { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userauthorization"));
    if (user) logUser(user);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("userauthorization", JSON.stringify(user));
  }, [user]);

  const logUser = (user) => {
    setUser(user);
    blogService.setToken(user.token);
  };

  const addBlog = async (blog) => {
    try {
      const response = await blogService.create(blog);
      setBlogs(blogs.concat(response));
      displayMessage(`a new blog "${blog.title}" added`);
    } catch (error) {
      const errorMsg = error.response.data.error;
      displayMessage(errorMsg, "error");
    }
  };

  const displayMessage = (content, type = "success") => {
    setMessage({ content, type });
    setTimeout(() => {
      setMessage(null);
    }, 2500);
  };

  if (user) {
    return (
      <div className="App">
        <Notification message={message} />
        <h2>Blogs</h2>
        <p>{user.username} logged in</p>
        <BlogForm addBlog={addBlog} />
        <Blogs blogs={blogs} />
      </div>
    );
  }

  return (
    <div className="App">
      <Notification message={message} />
      <LoginForm logUser={logUser} displayMessage={displayMessage} />
    </div>
  );
}

export default App;
