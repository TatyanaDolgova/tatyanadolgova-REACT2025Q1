import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Card } from './Card';
import { PokemonDetails } from '../../store/pokemonApi';

describe('Card', () => {
  const mockPokemon: PokemonDetails = {
    name: 'Pikachu',
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'pikachu.png',
        },
      },
    },
  } as PokemonDetails;

  it('renders the relevant card data', () => {
    render(
      <Card
        pokemon={mockPokemon}
        onClick={vi.fn()}
        onCheckboxChange={vi.fn()}
        selectedPokemons={[]}
      />
    );

    const image = screen.getByAltText('pokemon') as HTMLImageElement;
    expect(image.src).toContain('pikachu.png');

    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
  });

  it('triggers the onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(
      <Card
        pokemon={mockPokemon}
        onClick={handleClick}
        onCheckboxChange={vi.fn()}
        selectedPokemons={[]}
      />
    );

    const card = screen.getByTestId('card');
    await userEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls the onCheckboxChange handler when checkbox is toggled', async () => {
    const handleCheckboxChange = vi.fn();
    render(
      <Card
        pokemon={mockPokemon}
        onClick={vi.fn()}
        onCheckboxChange={handleCheckboxChange}
        selectedPokemons={[]}
      />
    );

    const checkbox = screen.getByTestId('select-pokemon');
    await userEvent.click(checkbox);

    expect(handleCheckboxChange).toHaveBeenCalledWith('Pikachu');
  });

  it('marks the checkbox as checked when pokemon is in selectedPokemons', () => {
    const selectedPokemons = ['Pikachu'];
    render(
      <Card
        pokemon={mockPokemon}
        onClick={vi.fn()}
        onCheckboxChange={vi.fn()}
        selectedPokemons={selectedPokemons}
      />
    );

    const checkbox = screen.getByLabelText('Select') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('does not mark the checkbox as checked when pokemon is not in selectedPokemons', () => {
    const selectedPokemons: string[] = [];
    render(
      <Card
        pokemon={mockPokemon}
        onClick={vi.fn()}
        onCheckboxChange={vi.fn()}
        selectedPokemons={selectedPokemons}
      />
    );

    const checkbox = screen.getByLabelText('Select') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });
});
