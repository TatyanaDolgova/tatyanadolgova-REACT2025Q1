import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SelectedPokemonsFlyout } from './SelectedPokemonsFlyout';
import { useDownloadPokemonCSV } from '../../hooks/useDownloadPokemonCSV/useDownloadPokemonCSV';
import { MutableRefObject } from 'react';
import '@testing-library/jest-dom';

const pokemon = {
  abilities: [
    {
      ability: {
        name: '1234',
        url: '',
      },
      is_hidden: true,
      slot: 1,
    },
  ],
  base_experience: 1,
  moves: [
    {
      move: {
        name: '',
        url: '',
      },
      version_group_details: [
        {
          level_learned_at: 1,
          move_learn_method: {
            name: 'string;',
            url: 'string',
          },
          version_group: {
            name: 'string;',
            url: 'string',
          },
        },
      ],
    },
  ],
  species: {
    name: 'string',
    url: 'string',
  },
  height: 999,
  weight: 999,
  imageSrc: 'string',
  name: 'string',
  sprites: {
    other: {
      'official-artwork': {
        front_default: '',
      },
    },
  },
};

vi.mock('../../hooks/useDownloadPokemonCSV/useDownloadPokemonCSV', () => ({
  useDownloadPokemonCSV: vi.fn(),
}));

const mockedUseDownloadPokemonCSV = vi.mocked(useDownloadPokemonCSV);

describe('SelectedPokemonsFlyout Component', () => {
  mockedUseDownloadPokemonCSV.mockReturnValue({
    handleDownload: () => {},
    downloadLinkRef: {
      current: null,
    } as MutableRefObject<HTMLAnchorElement | null>,
  });

  const mockSelectedPokemons = ['1', '2', '3'];
  const mockPokemons = [
    { ...pokemon, id: '1', name: 'Pikachu' },
    { ...pokemon, id: '2', name: 'Charmander' },
    { ...pokemon, id: '3', name: 'Bulbasaur' },
  ];
  const mockOnUnselectAll = vi.fn();

  it('does not render when selectedPokemons is empty', () => {
    render(
      <SelectedPokemonsFlyout
        selectedPokemons={[]}
        pokemons={mockPokemons}
        onUnselectAll={mockOnUnselectAll}
      />
    );

    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });

  it('renders the number of selected pokemons', () => {
    render(
      <SelectedPokemonsFlyout
        selectedPokemons={mockSelectedPokemons}
        pokemons={mockPokemons}
        onUnselectAll={mockOnUnselectAll}
      />
    );

    expect(
      screen.getByText(`${mockSelectedPokemons.length} items selected`)
    ).toBeInTheDocument();
  });

  it('calls onUnselectAll when the Unselect all button is clicked', () => {
    render(
      <SelectedPokemonsFlyout
        selectedPokemons={mockSelectedPokemons}
        pokemons={mockPokemons}
        onUnselectAll={mockOnUnselectAll}
      />
    );

    const unselectButton = screen.getByText(/Unselect all/i);
    fireEvent.click(unselectButton);

    expect(mockOnUnselectAll).toHaveBeenCalledTimes(1);
  });

  it('calls handleDownload when the Download button is clicked', () => {
    const mockHandleDownload = vi.fn();
    const mockDownloadLinkRef = { current: null };

    vi.mocked(useDownloadPokemonCSV).mockReturnValue({
      handleDownload: mockHandleDownload,
      downloadLinkRef: mockDownloadLinkRef,
    });

    render(
      <SelectedPokemonsFlyout
        selectedPokemons={mockSelectedPokemons}
        pokemons={mockPokemons}
        onUnselectAll={mockOnUnselectAll}
      />
    );

    const downloadButton = screen.getByTestId('download-button');
    fireEvent.click(downloadButton);

    expect(mockHandleDownload).toHaveBeenCalledTimes(1);
  });
});
