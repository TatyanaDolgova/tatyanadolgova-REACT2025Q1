import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from './HomePage';
import { pokemonApi, useGetPokemonsQuery } from '../../store/pokemonApi';
import { useParams, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../context/ThemeProvider';

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
