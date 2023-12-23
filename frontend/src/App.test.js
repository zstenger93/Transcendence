import React from 'react';
import { render, screen, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { within } from '@testing-library/dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import Sidebar from './components/Sidebar';
import { MemoryRouter } from 'react-router-dom';

test('renders Sign In button', () => {
  const { container } = render(<App />);

  console.log(prettyDOM(container));

  const signInButton = screen.getByText('Sign In');

  expect(signInButton).toBeInTheDocument();
});

test('clicks on Sign In button and finds Welcome text', () => {
  const { container } = render(<App />);

  const signInButton = screen.getByText('Sign In');
  userEvent.click(signInButton);

  console.log(prettyDOM(container));

  const welcomeText = screen.getByText('Welcome');

  expect(welcomeText).toBeInTheDocument();
});

// test('renders chat page', () => {
//   render(<App />);
//   const chatElement = screen.getByText('Chat');
//   expect(chatElement).toBeInTheDocument();
// });

// test('renders about page', () => {
//   render(<App />);
//   const aboutElement = screen.getByText('About');
//   expect(aboutElement).toBeInTheDocument();
// });

// test('renders profile page', () => {
//   render(<App />);
//   const profileElement = screen.getByText('Profile');
//   expect(profileElement).toBeInTheDocument();
// });

// test('renders home page', () => {
//   render(<App />);
//   const homeElement = screen.getByText('Home');
//   expect(homeElement).toBeInTheDocument();
// });

// test('can upload an image on chat page', () => {
//   render(<App />);

//   const fileInput = screen.getByLabelText('Choose File');

//   const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

//   userEvent.upload(fileInput, file);

//   expect(fileInput.files[0]).toStrictEqual(file);
//   expect(fileInput.files.item(0)).toStrictEqual(file);
//   expect(fileInput.files).toHaveLength(1);
// });

// test('can change language to Hungarian', () => {
//   render(
//     <I18nextProvider i18n={i18n}>
//       <MemoryRouter>
//         <Sidebar />
//       </MemoryRouter>
//     </I18nextProvider>
//   );

//   const languageButton = screen.getByText('Language');

//   userEvent.click(languageButton);

//   const dropdown = screen.getByRole('listbox');

//   const hungarianOption = within(dropdown).getByText('HU');

//   userEvent.click(hungarianOption);

//   expect(i18n.language).toBe('hu');
// });

// test('navigates to the correct page when a sidebar link is clicked', () => {
//   render(
//     <MemoryRouter>
//       <Sidebar />
//     </MemoryRouter>
//   );

//   const links = [
//     { text: 'Home', path: '/home' },
//     { text: 'Channels & Private Messages', path: '/chat' },
//     { text: 'Play & Watch Games', path: '/games' },
//     { text: 'Profile', path: '/profile' },
//     { text: 'About Us', path: '/about' },
//     { text: 'Logout', path: '/' },
//   ];

//   links.forEach(({ text, path }) => {
//     const link = screen.getByText(text);

//     userEvent.click(link);

//     expect(window.location.pathname).toBe(path);
//   });
// });