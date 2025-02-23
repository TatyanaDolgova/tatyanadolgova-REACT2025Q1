import { useCallback, useEffect, useRef, useState } from 'react';

import { PokemonDetails } from '../../store/pokemonApi';

export const useDownloadPokemonCSV = (
  selectedPokemons: string[],
  pokemons: PokemonDetails[] | undefined
) => {
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(null);
      }
    };
  }, [downloadUrl]);

  const handleDownload = useCallback(() => {
    if (!selectedPokemons.length || !pokemons) return;

    const headers = ['Name', 'Height (m)', 'Weight (kg)', 'Base Experience'];
    const csvRows: string[] = [
      '\uFEFF' + headers.join(';'),
      ...selectedPokemons.map((name) => {
        const pokemon = pokemons.find((p) => p.name === name);
        return pokemon
          ? `"${pokemon.name}";${pokemon.height};${pokemon.weight};${pokemon.base_experience}`
          : '';
      }),
    ];

    const csvContent = csvRows.join('\n');

    try {
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = `pokemons_${selectedPokemons.length}.csv`;
        downloadLinkRef.current.click();
      }
    } catch (error) {
      console.error('Failed to generate or download CSV:', error);
    }
  }, [selectedPokemons, pokemons]);

  return { handleDownload, downloadLinkRef };
};
