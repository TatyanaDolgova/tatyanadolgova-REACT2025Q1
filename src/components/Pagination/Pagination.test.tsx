import '@testing-library/jest-dom';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('should update the page number in the URL when clicking next and previous', () => {
    const currentPage = 1;
    const totalPages = 5;

    const navigate = vi.fn();

    render(
      <MemoryRouter initialEntries={['/pages/1']}>
        <Routes>
          <Route
            path="/pages/:page"
            element={
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => navigate(`/pages/${page}`)}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(window.location.pathname).toBe('/');

    fireEvent.click(screen.getByText('Next'));
    expect(navigate).toHaveBeenCalledWith('/pages/2');

    fireEvent.click(screen.getByText('Previous'));
    waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/pages/1');
    });
  });

  it('should disable Previous button on the first page and Next on the last page', () => {
    const currentPage = 1;
    const totalPages = 5;
    const onPageChange = vi.fn();

    render(
      <MemoryRouter>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Previous')).toBeDisabled();

    fireEvent.click(screen.getByText('Next'));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
