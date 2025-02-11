import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFoundPage } from './NotFoundPage';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('NotFoundPage', () => {
  it('should render 404 title and error message', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();

    expect(screen.getByText('Oops! Page Not Found')).toBeInTheDocument();
  });

  it('should render "Go to Home" button with correct link', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const button = screen.getByText('Go to Home');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/');
  });
});
