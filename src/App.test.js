import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import AddDevice from "./page/AddDevice";
import UpdateDevice from "./page/UpdateDevice";


test('renders dashboard screen when app run', () => {
  render(<App />);
  const pageTitle = screen.getByText('Dashboard');
  expect(pageTitle).toBeInTheDocument();
});

test('render add device screen', () => {
  render(<AddDevice />);
  const pageTitle = screen.getByText('Add Device');
  expect(pageTitle).toBeInTheDocument();
});

// test('render update device screen', () => {
//   render(<UpdateDevice />);
//   const pageTitle = screen.getByText(/Updating: .*/);
//   expect(pageTitle).toBeInTheDocument();
// });
