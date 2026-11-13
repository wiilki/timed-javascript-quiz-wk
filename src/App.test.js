import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
  window.scrollTo = jest.fn();
});

test('shows the redesigned landing screen and mode selectors', () => {
  render(<App />);
  expect(screen.getByText(/Beat the clock/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Level up your logic/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText(/45 hand-picked questions/i)).toBeInTheDocument();
});

test('can begin a timed quiz and answer a question', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Let's do this/i }));
  expect(screen.getByText('SELECT ONE ANSWER')).toBeInTheDocument();
  expect(screen.getByLabelText('Questions answered')).toHaveAttribute('aria-valuenow', '0');
  const answer = document.querySelector('.answer-option');
  expect(answer).not.toBeNull();
  fireEvent.click(answer);
  expect(screen.getByLabelText('Questions answered')).toHaveAttribute('aria-valuenow', '1');
  expect(screen.getByRole('button', { name: /Next question/i })).toBeInTheDocument();
});

test('leaderboard includes an informative empty state', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /^Leaderboard$/i }));
  expect(screen.getByText('No scores yet.')).toBeInTheDocument();
});
