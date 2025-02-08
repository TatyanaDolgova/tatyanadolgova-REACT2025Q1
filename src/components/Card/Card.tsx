import './Card.css';
import { Pokemon } from '../../api/fetchPokemons';

interface CardProps {
  pokemon: Pokemon;
}

export const Card = ({ pokemon }: CardProps) => {
  const { name, imageSrc } = pokemon;
  return (
    <div className="card">
      <div className="card-header">
        <h3>{name}</h3>
      </div>
      <img src={imageSrc} alt="pokemon" />
    </div>
  );
};
