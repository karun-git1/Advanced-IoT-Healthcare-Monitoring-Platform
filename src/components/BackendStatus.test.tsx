import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import BackendStatus from './BackendStatus';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: 'Backend is running!' })
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders loading and then backend status', async () => {
  render(<BackendStatus />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText(/backend is running/i)).toBeInTheDocument());
}); 