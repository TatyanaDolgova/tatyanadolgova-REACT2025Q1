import React, { useEffect, useState } from 'react';
import './Search.css';
import { useSearchRequest } from '../../hooks/useSearchRequest';

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
    if (searchTerm) {
      onSearch(searchTerm);
    } else {
      onSearch('');
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
      />
      <button onClick={handleSearch} className="button">
        Search
      </button>
    </div>
  );
};
