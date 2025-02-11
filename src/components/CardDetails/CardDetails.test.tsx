import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardDetails } from './CardDetails';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';

vi.mock('../../api/fetchPokemons', () => ({
  fetchPokemons: vi.fn(() =>
    Promise.resolve({
      pokemons: [
        {
          species: { name: 'Pikachu' },
          height: 10,
          weight: 6,
          base_experience: 112,
          abilities: [
            { ability: { name: 'static' }, is_hidden: false, slot: 1 },
          ],
          imageSrc: 'pikachu.png',
        },
      ],
    })
  ),
}));

describe('CardDetails', () => {
  it('displays loading indicator while data is being fetched', async () => {
    render(<CardDetails id="pikachu" currentPage={1} onClose={vi.fn()} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => screen.queryByTestId('card-details'));

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('displays detailed card information when data is loaded', async () => {
    render(<CardDetails id="pikachu" currentPage={1} onClose={vi.fn()} />);

    await waitFor(() => screen.getByTestId('card-details'));

    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    const heightText = await screen.findByTestId('card-details-height');
    expect(heightText).toHaveTextContent('Height: 10m');

    const weightText = await screen.findByTestId('card-details-weight');
    expect(weightText).toHaveTextContent('Weight: 6kg');

    const experienceText = await screen.findByTestId('card-details-experience');
    expect(experienceText).toHaveTextContent('Base Experience: 112');

    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
  });

  it('hides component when Close button is clicked', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const cardElement = await screen.findAllByTestId('card');
    fireEvent.click(cardElement[0]);

    const cardDetails = await screen.findByTestId('card-details');
    expect(cardDetails).toBeInTheDocument();
    fireEvent.click(screen.getByText('✖'));

    await waitFor(() => {
      expect(screen.queryByTestId('card-details')).not.toBeInTheDocument();
    });
  });
});
