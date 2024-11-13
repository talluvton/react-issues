import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';


test('renders React Project Issues header', async () => {
  render(<App />);
  await waitFor(() => {
    const headerElement = screen.getByText(/React Issues/i);
    expect(headerElement).toBeInTheDocument();
  });
});

// Mock the global fetch function
global.fetch = jest.fn();

test('displays an error message when fetch fails', async () => {
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Error fetching issues: Fetch failed/i)).toBeInTheDocument();
  });
});
