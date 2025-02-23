import './SelectedPokemonsFlyout.css';

import { useDownloadPokemonCSV } from '../../hooks/useDownloadPokemonCSV/useDownloadPokemonCSV';
import { PokemonDetails } from '../../store/pokemonApi';

interface SelectedPokemonsFlyoutProps {
  selectedPokemons: string[];
  pokemons: PokemonDetails[] | undefined;
  onUnselectAll: () => void;
}

export const SelectedPokemonsFlyout = ({
  selectedPokemons,
  pokemons,
  onUnselectAll,
}: SelectedPokemonsFlyoutProps) => {
  const { handleDownload, downloadLinkRef } = useDownloadPokemonCSV(
    selectedPokemons,
    pokemons
  );

  if (selectedPokemons.length === 0) return null;

  return (
    <div className="flyout">
      <p>{selectedPokemons.length} items selected</p>
      <div className="flyout-buttons">
        <button className="flyout-button unselect" onClick={onUnselectAll}>
          Unselect all
        </button>
        <button
          className="flyout-button download"
          onClick={handleDownload}
          data-testid="download-button"
        >
          Download
        </button>
      </div>
      <a ref={downloadLinkRef} style={{ display: 'none' }}>
        Download
      </a>
    </div>
  );
};

export default SelectedPokemonsFlyout;
