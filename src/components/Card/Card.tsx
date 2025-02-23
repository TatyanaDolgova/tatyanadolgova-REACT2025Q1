import './Card.css';
import { PokemonDetails } from '../../store/pokemonApi';

interface CardProps {
  pokemon: PokemonDetails;
  onClick: () => void;
  onCheckboxChange: (id: string) => void;
  selectedPokemons: string[];
}

export const Card = ({
  pokemon,
  onClick,
  onCheckboxChange,
  selectedPokemons,
}: CardProps) => {
  const { name } = pokemon;
  return (
    <div className="card" onClick={onClick} data-testid="card">
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt="pokemon"
      />
      <div className="card-header">
        <h3>{name}</h3>
      </div>
      <div className="card-checkbox">
        <input
          type="checkbox"
          checked={selectedPokemons.includes(pokemon.name)}
          onChange={() => onCheckboxChange(pokemon.name)}
          id={`checkbox-${pokemon.name}`}
        />
        <label
          htmlFor={`checkbox-${pokemon.name}`}
          data-testid="select-pokemon"
        >
          Select
        </label>
      </div>
    </div>
  );
};
