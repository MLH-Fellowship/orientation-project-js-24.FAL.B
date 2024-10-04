import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Resume Builder heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/resume builder/i);
  expect(headingElement).toBeInTheDocument();
});
