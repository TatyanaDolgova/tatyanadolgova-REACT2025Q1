import { useState } from 'react';

export const useSearchRequest = (): [
  string | null,
  (query: string) => void,
] => {
  const [searchRequest, setSearchRequest] = useState<string | null>(
    localStorage.getItem('searchRequest')
  );

  const updateSearchRequest = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchRequest(trimmedQuery);
    localStorage.setItem('searchRequest', trimmedQuery);
  };
  return [searchRequest, updateSearchRequest];
};
