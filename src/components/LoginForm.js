import React from "react";
import loginService from "../services/login";

const LoginForm = ({ logUser, displayMessage }) => {
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const elements = Array.from(ev.target.elements);
    const credentials = Object.fromEntries(
      elements.filter((el) => el.name).map((el) => [el.name, el.value])
    );

    try {
      const user = await loginService.login(credentials);
      logUser(user);
    } catch (error) {
      const errorMsg = error.response.data.error;
      displayMessage(errorMsg, "error");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login in to application</h2>
      <div>
        <label htmlFor="username">username:</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <input type="password" name="password" id="password" />
      </div>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
