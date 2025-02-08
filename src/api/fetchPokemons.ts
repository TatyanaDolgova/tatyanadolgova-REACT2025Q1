interface PokemonRequest {
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
  move_learn_method: PokemonRequest;
  version_group: PokemonRequest;
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[];
}

interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
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

interface PokemonDetailsResponse {
  results: PokemonRequest[];
  count: number;
}

const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch details: ${response.status}`);
  }
  return await response.json();
};

export const fetchPokemons = async (query: string | null, page: number) => {
  const url = query
    ? `https://pokeapi.co/api/v2/pokemon/${query}`
    : `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 10}&limit=10`;

  const response = await fetch(url);

  if (!response.ok) {
    let errorMessage = `Error ${response.status}: `;
    if (response.status >= 400 && response.status < 500) {
      errorMessage += 'Client error - The request was incorrect.';
    } else if (response.status >= 500) {
      errorMessage += 'Server error - Please try again later.';
    } else {
      errorMessage += 'Unexpected error occurred.';
    }
    throw new Error(errorMessage);
  }

  const data: PokemonDetailsResponse | PokemonDetails = await response.json();

  if ('results' in data) {
    const dataResponse = data as PokemonDetailsResponse;
    const pokemons: PokemonDetails[] = await Promise.all(
      dataResponse.results.map(async (pokemon: PokemonRequest) => {
        const pokemonDetails = await fetchPokemonDetails(pokemon.url);

        return {
          ...pokemonDetails,
          name: pokemonDetails.name,
          imageSrc:
            pokemonDetails.sprites.other['official-artwork'].front_default,
        };
      })
    );

    return {
      pokemons,
      count: dataResponse.count,
    };
  } else {
    const pokemonDetails = data as PokemonDetails;

    return {
      pokemons: [
        {
          ...pokemonDetails,
          imageSrc:
            pokemonDetails.sprites.other['official-artwork'].front_default,
        },
      ],
      count: 1,
    };
  }
};
