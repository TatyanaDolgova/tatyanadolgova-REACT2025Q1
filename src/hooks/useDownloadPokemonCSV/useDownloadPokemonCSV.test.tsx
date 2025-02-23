import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDownloadPokemonCSV } from './useDownloadPokemonCSV';
import { PokemonDetails } from '../../store/pokemonApi';

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

describe('useDownloadPokemonCSV Hook', () => {
  const mockSelectedPokemons = ['Pikachu', 'Charmander'];
  const mockPokemons: PokemonDetails[] = [
    {
      ...pokemon,
      name: 'Pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
    },
    {
      ...pokemon,
      name: 'Charmander',
      height: 6,
      weight: 85,
      base_experience: 62,
    },
  ];

  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('creates a CSV file and sets the download URL when handleDownload is called', () => {
    const { result } = renderHook(() =>
      useDownloadPokemonCSV(mockSelectedPokemons, mockPokemons)
    );

    const mockAnchorElement = {
      click: vi.fn(),
      href: '',
      download: '',
    } as unknown as HTMLAnchorElement;

    result.current.downloadLinkRef.current = mockAnchorElement;

    act(() => {
      result.current.handleDownload();
    });

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);

    expect(mockAnchorElement.href).toBe('mock-url');
    expect(mockAnchorElement.download).toBe('pokemons_2.csv');

    expect(mockAnchorElement.click).toHaveBeenCalledTimes(1);
  });

  it('does not create a CSV file if selectedPokemons is empty', () => {
    const { result } = renderHook(() =>
      useDownloadPokemonCSV([], mockPokemons)
    );

    act(() => {
      result.current.handleDownload();
    });

    expect(global.URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('does not create a CSV file if pokemons is undefined', () => {
    const { result } = renderHook(() =>
      useDownloadPokemonCSV(mockSelectedPokemons, undefined)
    );

    act(() => {
      result.current.handleDownload();
    });

    expect(global.URL.createObjectURL).not.toHaveBeenCalled();
  });
});
