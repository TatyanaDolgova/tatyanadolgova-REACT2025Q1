import { Card } from '../Card/Card';
import './CardList.css';
import { PokemonDetails } from '../../store/pokemonApi';
import { useState } from 'react';

interface CardListProps {
  pokemons: PokemonDetails[];
  onSelect: (id: string) => void;
  onClick: () => void;
}

export const CardList = ({ pokemons, onSelect, onClick }: CardListProps) => {
  const [onOpen, setOnOpen] = useState(false);

  const onHandleClick = () => {
    if (onOpen) {
      onClick();
      setOnOpen(false);
    } else {
      setOnOpen(true);
    }
  };

  return (
    <div className="card-list" onClick={onHandleClick}>
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
            onClick={() => onSelect(pokemon.name)}
            data-testid="card"
          />
        ))
      ) : (
        <p data-testid="no-pokemon-message" className="no-pokemon-message">
          Pokemons not found
        </p>
      )}
    </div>
  );
};
