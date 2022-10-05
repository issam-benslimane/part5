import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from '../components/BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm/> update parent state and calls onsubmit', async () => {
  const user = userEvent.setup();
  const addBlog = jest.fn();
  const displayMessage = jest.fn();

  render(<BlogForm addBlog={addBlog} displayMessage={displayMessage} />);

  await user.click(screen.getByText('new blog'));

  const urlInput = screen.getByLabelText('url:');
  const titleInput = screen.getByLabelText('title:');
  const authorInput = screen.getByLabelText('author:');

  await user.type(titleInput, 'title');
  await user.type(authorInput, 'author');
  await user.type(urlInput, 'http://www.url.com');
  await user.click(screen.getByText('create'));

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'title',
    author: 'author',
    url: 'http://www.url.com',
  });
});
