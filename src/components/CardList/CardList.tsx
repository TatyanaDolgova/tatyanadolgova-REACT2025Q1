import { Card } from '../Card/Card';
import './CardList.css';
import { Pokemon } from '../../api/fetchPokemons';

interface CardListProps {
  pokemons: Pokemon[];
}

export const CardList = ({ pokemons }: CardListProps) => {
  return (
    <div className="card-list">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};
