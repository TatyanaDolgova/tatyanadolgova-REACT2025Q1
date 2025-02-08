interface PokemonRequest {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  imageSrc: string;
}

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

  const data = await response.json();

  if (!data.results) {
    return {
      pokemons: [
        {
          name: data.name,
          imageSrc: data.sprites.other['official-artwork'].front_default,
        },
      ],
      count: 1,
    };
  }

  const pokemons: Pokemon[] = await Promise.all(
    data.results.map(async (item: PokemonRequest) => {
      const pokemon = await fetch(item.url).then((res) => res.json());
      return {
        name: item.name,
        imageSrc: pokemon.sprites.other['official-artwork'].front_default,
      };
    })
  );

  return {
    pokemons,
    count: data.count,
  };
};
