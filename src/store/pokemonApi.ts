import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface PokemonListItem {
  name: string;
  url: string;
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: PokemonListItem;
  version_group: PokemonListItem;
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[];
}

interface Sprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  moves: Move[];
  species: {
    name: string;
    url: string;
  };
  height: number;
  weight: number;
  imageSrc: string;
  name: string;
  sprites: Sprites;
}

interface PokemonListResponse {
  results: PokemonListItem[];
  count: number;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<
      { pokemons: PokemonDetails[]; count: number },
      { query: string | null; page: number }
    >({
      query: ({ query, page }) =>
        query
          ? `pokemon/${query}`
          : `pokemon?offset=${(page - 1) * 10}&limit=10`,
      transformResponse: async (
        response: PokemonListResponse | PokemonDetails
      ) => {
        if ('results' in response) {
          const dataResponse = response as PokemonListResponse;
          const pokemons = await Promise.all(
            dataResponse.results.map(async (pokemon) => {
              const detailsRes = await fetch(pokemon.url);
              return detailsRes.json();
            })
          );
          return { pokemons, count: dataResponse.count };
        } else {
          return { pokemons: [response as PokemonDetails], count: 1 };
        }
      },
    }),

    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = pokemonApi;
