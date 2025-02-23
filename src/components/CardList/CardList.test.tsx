import { render, screen } from '@testing-library/react';
import { describe, expect, vi, it } from 'vitest';
import { CardList } from './CardList';
import { PokemonDetails } from '../../store/pokemonApi';
import userEvent from '@testing-library/user-event';

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
      <CardList
        pokemons={mockPokemons}
        onSelect={vi.fn()}
        onClick={vi.fn()}
        onCheckboxChange={vi.fn()}
        selectedPokemons={[]}
      />
    );

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockPokemons.length);
  });

  it('should display a message when there are no cards', () => {
    const mockPokemons: PokemonDetails[] = [];

    render(
      <CardList
        pokemons={mockPokemons}
        onSelect={vi.fn()}
        onClick={vi.fn()}
        onCheckboxChange={vi.fn()}
        selectedPokemons={[]}
      />
    );

    const message = screen.getByTestId('no-pokemon-message');
    expect(message.textContent).toBe('Pokemons not found');
  });

  it('should trigger onSelect when a card is clicked', async () => {
    const mockSelect = vi.fn();
    const mockPokemons: PokemonDetails[] = [{ ...pokemon, name: 'Pikachu' }];

    render(
      <CardList
        pokemons={mockPokemons}
        onSelect={mockSelect}
        onClick={vi.fn()}
        onCheckboxChange={vi.fn()}
        selectedPokemons={[]}
      />
    );

    const card = screen.getByTestId('card');
    await userEvent.click(card);

    expect(mockSelect).toHaveBeenCalledWith('Pikachu');
  });
});
