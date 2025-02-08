import { Card } from '../Card/Card';
import './CardList.css';
import { Hero } from '../../App';

interface CardListProps {
  heroes: Hero[];
}

export const CardList = ({ heroes }: CardListProps) => {
  return (
    <div className="card-list">
      {heroes.map((hero) => (
        <Card key={hero.name} hero={hero} />
      ))}
    </div>
  );
};
