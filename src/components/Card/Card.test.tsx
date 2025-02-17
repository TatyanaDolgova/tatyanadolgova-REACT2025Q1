import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Card } from './Card';
import { PokemonDetails } from '../../store/pokemonApi';

describe('Card', () => {
  const mockPokemon: PokemonDetails = {
    name: 'Pikachu',
    imageSrc: 'pikachu.png',
  } as PokemonDetails;

  it('renders the relevant card data', () => {
    render(<Card pokemon={mockPokemon} onClick={vi.fn()} />);

    const image = screen.getByAltText('pokemon') as HTMLImageElement;
    expect(image.src).toContain('pikachu.png');

    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
  });

  it('triggers the onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Card pokemon={mockPokemon} onClick={handleClick} />);

    const card = screen.getByText('Pikachu');
    await userEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('fetches and displays detailed card information on click', async () => {
    const fetchDetails = vi.fn();

    render(<Card pokemon={mockPokemon} onClick={fetchDetails} />);

    const card = screen.getByText('Pikachu');
    await userEvent.click(card);

    expect(fetchDetails).toHaveBeenCalled();
  });
});
