import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sign In button', () => {
  // Render the component
  render(<App />);

  // Use getByText to find the button with the text "Sign In"
  const signInButton = screen.getByText('Sign In');

  // Assert that the button is in the document
  expect(signInButton).toBeInTheDocument();
});