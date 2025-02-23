import './CardList.css';

import { useState } from 'react';

import { PokemonDetails } from '../../store/pokemonApi';
import { Card } from '../Card/Card';

interface CardListProps {
  pokemons: PokemonDetails[];
  onSelect: (id: string) => void;
  onClick: () => void;
  onCheckboxChange: (id: string) => void;
  selectedPokemons: string[];
}

export const CardList = ({
  pokemons,
  onSelect,
  onClick,
  onCheckboxChange,
  selectedPokemons,
}: CardListProps) => {
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
    <div className="card-list" onClick={onHandleClick} data-testid="card-list">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
            onClick={() => onSelect(pokemon.name)}
            data-testid="card"
            onCheckboxChange={onCheckboxChange}
            selectedPokemons={selectedPokemons}
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
