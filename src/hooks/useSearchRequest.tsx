import { useState, useEffect } from 'react';

export const useSearchRequest = (): [
  string | null,
  (query: string) => void,
] => {
  const [searchRequest, setSearchRequest] = useState<string | null>(null);

  useEffect(() => {
    const savedSearchRequest = localStorage.getItem('searchRequest');

    if (savedSearchRequest) {
      setSearchRequest(savedSearchRequest);
    }
  }, []);

  const updateSearchRequest = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchRequest(trimmedQuery);
    if (trimmedQuery) {
      localStorage.setItem('searchRequest', trimmedQuery);
    } else {
      localStorage.removeItem('searchRequest');
    }
  };

  return [searchRequest, updateSearchRequest];
};
