import React from "react";

const Notification = ({ message }) => {
  if (message == null) return null;
  const { content, type } = message;
  return <div className={type}>{content}</div>;
};

export default Notification;
