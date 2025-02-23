import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '../../context/ThemeProvider';
import { pokemonApi, useGetPokemonsQuery } from '../../store/pokemonApi';
import { store } from '../../store/store';
import { HomePage } from './HomePage';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../store/pokemonApi', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof pokemonApi;
  return {
    ...actual,
    useGetPokemonsQuery: vi.fn(),
  };
});

const setup = () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </Provider>
  );
};

describe('HomePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when data is being fetched', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      refetch: vi.fn(),
    });

    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    vi.mocked(useParams).mockReturnValue({ page: '1' });

    setup();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', async () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: null,
      error: new Error('Failed to fetch'),
      isLoading: false,
      refetch: vi.fn(),
    });

    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    vi.mocked(useParams).mockReturnValue({ page: '1' });

    setup();

    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });
});
