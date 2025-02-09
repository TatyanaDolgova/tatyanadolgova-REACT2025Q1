import './Card.css';
import { PokemonDetails } from '../../api/fetchPokemons';

interface CardProps {
  pokemon: PokemonDetails;
  onClick: () => void;
}

export const Card = ({ pokemon, onClick }: CardProps) => {
  const { name, imageSrc } = pokemon;
  return (
    <div className="card" onClick={onClick} data-testid="card">
      <img src={imageSrc} alt="pokemon" />
      <div className="card-header">
        <h3>{name}</h3>
      </div>
    </div>
  );
};
