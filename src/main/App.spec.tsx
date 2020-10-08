import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Server Explorer App', () => {
  it('should render with navbar', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Server Explorer/i);
    expect(linkElement).toBeInTheDocument();
  })
});
