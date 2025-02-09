import { Component } from 'react';
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

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchRequest: localStorage.getItem('searchRequest') || '',
      heroes: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData(this.state.searchRequest);
  }

  fetchData = (query: string) => {
    this.setState(() => ({ loading: true, error: null }));
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
        this.setState({ heroes: data.results, loading: false });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          this.setState({ error: error.message, loading: false });
        } else {
          this.setState({
            error: 'An unknown error occurred.',
            loading: false,
          });
        }
      });
  };

  handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    this.setState(() => ({ searchRequest: trimmedQuery }));
    localStorage.setItem('searchRequest', trimmedQuery);
    this.fetchData(trimmedQuery);
  };

  render() {
    const { searchRequest, heroes, loading, error } = this.state;

    return (
      <>
        <Search onSearch={this.handleSearch} initialValue={searchRequest} />
        <ErrorBoundary>
          {loading && <Loader />}
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <CardList heroes={heroes} />
          )}
          <ThrowErrorButton />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
