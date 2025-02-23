import './Search.css';

import React, { useEffect, useState } from 'react';

import { useSearchRequest } from '../../hooks/useSearchRequest/useSearchRequest';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialValue: string | null;
}

export const Search = ({ onSearch, initialValue }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [searchRequest] = useSearchRequest();

  useEffect(() => {
    setSearchTerm(searchRequest);
  }, [searchRequest]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm || '');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm ? searchTerm : ''}
        placeholder="Enter your query"
        className="search-input"
        onChange={handleInputChange}
        data-testid="search"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="button"
        data-testid="search-button"
      >
        Search
      </button>
    </div>
  );
};
