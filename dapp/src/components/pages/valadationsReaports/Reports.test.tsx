import { render, screen } from '@testing-library/react';

import Report from './Report';

test('button has been clicked', () => {
  render(<Report />);
  const incre: HTMLElement = screen.getByRole('button');
  expect(incre).toBeInTheDocument();
});
