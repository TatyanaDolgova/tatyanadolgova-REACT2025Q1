import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Search } from './Search';

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    setItem: vi.fn(),
    getItem: vi.fn().mockReturnValue('pikachu'),
    removeItem: vi.fn(),
    clear: vi.fn(),
  });
  cleanup();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Search', () => {
  it('should save the search term to localStorage when the Search button is clicked', () => {
    const onSearch = vi.fn();
    const initialValue = '';

    render(<Search onSearch={onSearch} initialValue={initialValue} />);

    const input = screen.getByPlaceholderText('Enter your query');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(searchButton);

    waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'searchTerm',
        'pikachu'
      );
    });
  });

  it('should retrieve the search term from localStorage when the component mounts', () => {
    const onSearch = vi.fn();
    const initialValue = null;

    render(<Search onSearch={onSearch} initialValue={initialValue} />);

    const input = screen.getByPlaceholderText('Enter your query');

    expect(input).toHaveValue('pikachu');
  });

  it('should call onSearch with the correct search term when Search button is clicked', () => {
    const onSearch = vi.fn();
    const initialValue = '';

    render(<Search onSearch={onSearch} initialValue={initialValue} />);

    const input = screen.getByPlaceholderText('Enter your query');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledWith('bulbasaur');
  });
});
