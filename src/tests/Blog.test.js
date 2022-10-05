import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../components/Blog';
import userEvent from '@testing-library/user-event';

const blog = {
  title: 'test title',
  url: 'http://test.com',
  likes: 0,
  author: 'author',
  user: 'test',
};

const userDetails = { username: 'test', id: 'test' };

test('renders title and author only', () => {
  render(<Blog blog={blog} />);

  screen.getByText('author: test title');

  const hiddenContent = screen.queryByTestId('togglable');
  const url = screen.queryByText(blog.url);
  const likes = screen.queryByText(`likes: ${blog.likes}`);
  expect(hiddenContent).toBeNull();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test('clicking button shows rest of details', async () => {
  const user = userEvent.setup();

  render(<Blog blog={blog} user={userDetails} />);

  const button = screen.getByText('view');
  await user.click(button);

  screen.getByTestId('togglable');
  screen.getByText(blog.url);
  screen.getByText(`likes: ${blog.likes}`);
});

test('clicking like button triggers it\'s handler function', async () => {
  const user = userEvent.setup();
  const mockHandler = jest.fn();

  render(<Blog blog={blog} user={userDetails} updateBlog={mockHandler} />);

  const expandButton = screen.getByText('view');
  await user.click(expandButton);

  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
