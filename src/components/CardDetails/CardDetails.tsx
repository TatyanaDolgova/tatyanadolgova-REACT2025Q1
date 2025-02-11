import React, { useEffect, useState } from 'react';
import { fetchPokemons, PokemonDetails } from '../../api/fetchPokemons';
import { Loader } from '../Loader/Loader';
import './CardDetails.css';

interface PokemonDetailsProps {
  id: string;
  currentPage: number;
  onClose: () => void;
}

export const CardDetails: React.FC<PokemonDetailsProps> = ({
  id,
  onClose,
  currentPage,
}) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemons(id, currentPage);
        setPokemon(data.pokemons[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, currentPage]);

  if (loading) return <Loader />;
  return (
    <div className="pokemon-details" data-testid="card-details">
      <button onClick={onClose} className="close-button">
        ✖
      </button>

      <div className="pokemon-header">
        <h2>{pokemon?.species.name}</h2>
        <img
          src={pokemon?.imageSrc}
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
