import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButton from '../ActionButton';

describe('ActionButton Component', () => {
    it('renders correctly with given props', () => {
      render(<ActionButton title='Click Me' stylingClasses='btn-class' />);
      const button = screen.getByText('Click Me');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('btn-class');
    });
  
    it('handles onClick event', () => {
      const onClickMock = vi.fn();
      render(<ActionButton title='Click Me' onClick={onClickMock} />);
      const button = screen.getByText('Click Me');
      fireEvent.click(button);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  
    it('renders as disabled when disabled prop is true', () => {
      render(<ActionButton title='Disabled' disabled={true} />);
      const button = screen.getByText('Disabled');
      expect(button).toBeDisabled();
    });
  });