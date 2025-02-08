import { useEffect, useState } from 'react';
import { Search } from './components/Search/Search';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Loader } from './components/Loader/Loader';
import { CardList } from './components/CardList/CardList';
import { ThrowErrorButton } from './components/ThrowErrorButton/ThrowErrorButton';

export interface Hero {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: 'male' | 'female';
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  starships: string[];
  url: string;
  vehicles: string[];
}

interface AppState {
  searchRequest: string;
  heroes: Hero[];
  loading: boolean;
  error: string | null;
}

interface Response {
  count: number;
  results: Hero[];
}

const App = () => {
  const [state, setState] = useState<AppState>({
    searchRequest: localStorage.getItem('searchRequest') || '',
    heroes: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    fetchData(state.searchRequest);
  }, []);

  const fetchData = (query: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const url = query
      ? `https://swapi.dev/api/people/?search=${query}`
      : 'https://swapi.dev/api/people/';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          let errorMessage = `Error ${response.status}: `;
          if (response.status >= 400 && response.status < 500) {
            errorMessage += 'Client error - The request was incorrect.';
          } else if (response.status >= 500) {
            errorMessage += 'Server error - Please try again later.';
          } else {
            errorMessage += 'Unexpected error occurred.';
          }
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then((data: Response) => {
        setState((prev) => ({ ...prev, heroes: data.results, loading: false }));
      })
      .catch((error: unknown) => {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred.',
          loading: false,
        }));
      });
  };

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    setState((prev) => ({ ...prev, searchRequest: trimmedQuery }));
    localStorage.setItem('searchRequest', trimmedQuery);
    fetchData(trimmedQuery);
  };

  return (
    <>
      <Search onSearch={handleSearch} initialValue={state.searchRequest} />
      <ErrorBoundary>
        {state.loading && <Loader />}
        {state.error ? (
          <p className="error-message">{state.error}</p>
        ) : (
          <CardList heroes={state.heroes} />
        )}
        <ThrowErrorButton />
      </ErrorBoundary>
    </>
  );
};

export default App;
