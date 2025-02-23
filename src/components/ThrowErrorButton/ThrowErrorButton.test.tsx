import '@testing-library/jest-dom';

import { describe, expect, it } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { ThrowErrorButton } from './ThrowErrorButton';

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
