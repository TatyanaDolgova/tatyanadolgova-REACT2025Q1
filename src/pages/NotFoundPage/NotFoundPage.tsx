import './NotFoundPage.css';

import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Oops! Page Not Found</p>
      <Link to="/" className="not-found-button">
        Go to Home
      </Link>
    </div>
  );
};
