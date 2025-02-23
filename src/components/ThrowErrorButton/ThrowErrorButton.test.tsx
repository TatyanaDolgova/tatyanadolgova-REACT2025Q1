import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThrowErrorButton } from './ThrowErrorButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import '@testing-library/jest-dom';

describe('ThrowErrorButton', () => {
  it('renders the button correctly', () => {
    render(<ThrowErrorButton />);

    expect(screen.getByText('Throw error')).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(getByText('Throw error'));

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('does not throw an error initially', () => {
    const { getByText } = render(<ThrowErrorButton />);

    expect(getByText('Throw error')).toBeInTheDocument();
  });
});
