import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardDetails } from './CardDetails';
import { describe, expect, it, vi } from 'vitest';
import { useGetPokemonsQuery } from '../../store/pokemonApi';

vi.mock('../../store/pokemonApi', () => ({
  useGetPokemonsQuery: vi.fn(),
}));

const mockPokemon = {
  species: { name: 'Pikachu' },
  sprites: {
    other: {
      'official-artwork': { front_default: 'image_url' },
    },
  },
  height: 4,
  weight: 60,
  base_experience: 112,
  abilities: [
    { ability: { name: 'static' }, is_hidden: false, slot: 1 },
    { ability: { name: 'lightning-rod' }, is_hidden: true, slot: 3 },
  ],
};

const mockedUseGetPokemonsQuery = vi.mocked(useGetPokemonsQuery);

describe('CardDetails', () => {
  it('displays loading indicator while data is being fetched', async () => {
    mockedUseGetPokemonsQuery.mockReturnValue({
      isLoading: true,
      data: undefined,
      error: undefined,
      refetch: vi.fn(),
    });

    render(<CardDetails id="1" currentPage={1} onClose={() => {}} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    mockedUseGetPokemonsQuery.mockReturnValue({
      isLoading: false,
      data: undefined,
      error: { status: 500, data: 'Error' },
      refetch: vi.fn(),
    });

    render(<CardDetails id="1" currentPage={1} onClose={() => {}} />);
    expect(
      screen.getByText(/Failed to load Pokémon details./i)
    ).toBeInTheDocument();
  });

  it('displays pokemon details when data is successfully fetched', async () => {
    mockedUseGetPokemonsQuery.mockReturnValue({
      isLoading: false,
      data: { pokemons: [mockPokemon] },
      error: undefined,
      refetch: vi.fn(),
    });

    render(<CardDetails id="1" currentPage={1} onClose={() => {}} />);

    await waitFor(() => screen.getByTestId('card-details'));

    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    const heightText = await screen.findByTestId('card-details-height');
    expect(heightText).toHaveTextContent('Height: 4m');

    const weightText = await screen.findByTestId('card-details-weight');
    expect(weightText).toHaveTextContent('Weight: 60kg');

    const experienceText = await screen.findByTestId('card-details-experience');
    expect(experienceText).toHaveTextContent('Base Experience: 112');

    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onCloseMock = vi.fn();
    mockedUseGetPokemonsQuery.mockReturnValue({
      isLoading: false,
      data: { pokemons: [mockPokemon] },
      error: undefined,
      refetch: vi.fn(),
    });

    render(<CardDetails id="1" currentPage={1} onClose={onCloseMock} />);

    const closeButton = screen.getByText('✖');
    closeButton.click();

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
