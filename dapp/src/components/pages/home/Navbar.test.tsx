import { fireEvent, render, screen } from '@testing-library/react';

import Navbar from './Navbar';

test('connect button', () => {
  render(<Navbar />);
  const connectButton: HTMLElement = screen.getByRole('button', {
    name: 'connectWallet',
  });
  expect(connectButton.textContent).toBe('connected');

  fireEvent.click(connectButton);
  expect(connectButton).toBeEnabled();
});
