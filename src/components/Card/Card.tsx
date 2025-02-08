import './Card.css';
import { Hero } from '../../App';

interface CardProps {
  hero: Hero;
}

export const Card = ({ hero }: CardProps) => {
  const { name, birth_year, gender, height, eye_color, hair_color } = hero;
  return (
    <div className="card">
      <div className="card-header">
        <h3>{name}</h3>
      </div>
      <div className="card-body">
        <p>
          <span>Year of birth:</span> {birth_year}
        </p>
        <p>
          <span>Gender:</span> {gender}
        </p>
        <p>
          <span>Height:</span> {height}
        </p>
        <p>
          <span>Eye color:</span> {eye_color}
        </p>
        <p>
          <span>Hair color:</span> {hair_color}
        </p>
      </div>
    </div>
  );
};
