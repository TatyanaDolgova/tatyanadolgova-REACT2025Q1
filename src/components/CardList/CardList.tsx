import { Component } from 'react';
import Card from '../Card/Card';
import './CardList.css';
import { Hero } from '../../App';

interface CardListProps {
  heroes: Hero[];
}

export class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="card-list">
        {this.props.heroes.map((hero) => (
          <Card key={hero.name} hero={hero} />
        ))}
      </div>
    );
  }
}
