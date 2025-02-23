import { beforeEach, describe, expect, it } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useSearchRequest } from './useSearchRequest';

beforeEach(() => {
  localStorage.clear();
});

describe('useSearchRequest', () => {
  it('should initialize searchRequest from localStorage if present', () => {
    localStorage.setItem('searchRequest', 'pikachu');

    const { result } = renderHook(() => useSearchRequest());

    expect(result.current[0]).toBe('pikachu');
  });

  it('should update searchRequest in localStorage when updateSearchRequest is called', () => {
    const { result } = renderHook(() => useSearchRequest());

    expect(result.current[0]).toBe(null);

    act(() => {
      result.current[1]('bulbasaur');
    });

    expect(result.current[0]).toBe('bulbasaur');

    expect(localStorage.getItem('searchRequest')).toBe('bulbasaur');
  });

  it('should trim the query before saving to localStorage', () => {
    const { result } = renderHook(() => useSearchRequest());

    act(() => {
      result.current[1]('  charizard  ');
    });

    expect(result.current[0]).toBe('charizard');
    expect(localStorage.getItem('searchRequest')).toBe('charizard');
  });
});
