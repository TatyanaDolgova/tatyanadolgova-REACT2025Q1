import { render, screen } from '@testing-library/react';
import { describe, expect, vi, it } from 'vitest';
import { CardList } from './CardList';
import { PokemonDetails } from '../../store/pokemonApi';

vi.mock('../Card/Card', () => ({
  Card: ({
    pokemon,
    onClick,
  }: {
    pokemon: PokemonDetails;
    onClick: () => void;
  }) => (
    <div data-testid="card" onClick={onClick}>
      {pokemon.name}
    </div>
  ),
}));

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

describe('CardList', () => {
  it('should render the correct number of cards', () => {
    const mockPokemons: PokemonDetails[] = [
      { ...pokemon, name: '1' },
      { ...pokemon, name: '2' },
      { ...pokemon, name: '3' },
    ];

    render(
      <CardList pokemons={mockPokemons} onSelect={vi.fn()} onClick={vi.fn()} />
    );

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockPokemons.length);
  });

  it('should display a message when there are no cards', () => {
    const mockPokemons: PokemonDetails[] = [];

    render(
      <CardList pokemons={mockPokemons} onSelect={vi.fn()} onClick={vi.fn()} />
    );

    const message = screen.getByTestId('no-pokemon-message');
    expect(message.textContent).toBe('Pokemons not found');
  });
});
