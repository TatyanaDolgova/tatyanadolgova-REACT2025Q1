import './CardDetails.css';

import { useGetPokemonsQuery } from '../../store/pokemonApi';
import { Loader } from '../Loader/Loader';

interface PokemonDetailsProps {
  id: string;
  currentPage: number;
  onClose: () => void;
}

export const CardDetails = ({
  id,
  onClose,
  currentPage,
}: PokemonDetailsProps) => {
  const { data, error, isLoading } = useGetPokemonsQuery({
    query: id,
    page: currentPage,
  });

  if (isLoading) return <Loader />;

  if (error) {
    return <div className="error-message">Failed to load Pokémon details.</div>;
  }

  const pokemon = data?.pokemons[0];

  return (
    <div className="pokemon-details" data-testid="card-details">
      <button onClick={onClose} className="close-button">
        ✖
      </button>

      <div className="pokemon-header">
        <h2>{pokemon?.species.name}</h2>
        <img
          src={pokemon?.sprites.other['official-artwork'].front_default}
          alt={pokemon?.species.name}
          className="pokemon-image"
        />
      </div>

      <div className="pokemon-info">
        <div className="pokemon-basic-info">
          <p data-testid="card-details-height">
            <span>Height:</span> {pokemon?.height}m
          </p>
          <p data-testid="card-details-weight">
            <span>Weight:</span> {pokemon?.weight}kg
          </p>
          <p data-testid="card-details-experience">
            <span>Base Experience:</span> {pokemon?.base_experience}
          </p>
        </div>

        <div className="pokemon-abilities">
          <h3>Abilities</h3>
          <ul>
            {pokemon?.abilities.map((ability, index) => (
              <li key={index}>
                <span>{ability.ability.name}</span>
                {ability.is_hidden ? ' Hidden' : ''} (Slot {ability.slot})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
