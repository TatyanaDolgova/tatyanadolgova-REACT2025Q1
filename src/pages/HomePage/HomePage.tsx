import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { CardDetails } from '../../components/CardDetails/CardDetails';
import { CardList } from '../../components/CardList/CardList';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { Search } from '../../components/Search/Search';
import SelectedPokemonsFlyout from '../../components/SelectedPokemonsFlyout/SelectedPokemonsFlyout';
import { ThrowErrorButton } from '../../components/ThrowErrorButton/ThrowErrorButton';
import { useTheme } from '../../context/ThemeContext';
import { useSearchRequest } from '../../hooks/useSearchRequest/useSearchRequest';
import { useGetPokemonsQuery } from '../../store/pokemonApi';
import {
  selectPokemon,
  unselectAllPokemons,
  unselectPokemon,
} from '../../store/pokemonSlice';
import { RootState } from '../../store/store';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPokemon = searchParams.get('details');
  const [searchRequest, setSearchRequest] = useSearchRequest();
  const { data, error, isLoading } = useGetPokemonsQuery({
    query: searchRequest,
    page: Number(page) || 1,
  });
  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemon.selectedPokemons
  );
  const { theme, toggleTheme } = useTheme();

  const currentPage = Number(page) || 1;

  const handleSearch = async (query: string) => {
    setSearchRequest(query);
  };

  const setPage = (newPage: number) => {
    navigate(`/pages/${newPage}`, { replace: true });
  };

  const handleSelectPokemon = (id: string) => {
    setSearchParams({ details: id });
  };

  const handleCloseDetails = () => {
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      updatedParams.delete('details');
      return updatedParams;
    });
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedPokemons.includes(id)) {
      dispatch(unselectPokemon(id));
    } else {
      dispatch(selectPokemon(id));
    }
  };

  const handleUnselectAll = () => {
    dispatch(unselectAllPokemons());
  };

  if (isLoading) return <Loader />;
  if (error || !data)
    return <p className="error-message">Error loading data</p>;

  return (
    <div className={`app ${theme}`} data-testid="home-page">
      <button onClick={toggleTheme} className="button">
        Toggle Theme
      </button>
      <Search onSearch={handleSearch} initialValue={searchRequest} />
      <ErrorBoundary>
        <>
          <div className="container">
            <CardList
              pokemons={data?.pokemons || []}
              onSelect={handleSelectPokemon}
              onClick={handleCloseDetails}
              onCheckboxChange={handleCheckboxChange}
              selectedPokemons={selectedPokemons}
            />
            {selectedPokemon && (
              <div className="right-section">
                <CardDetails
                  id={selectedPokemon}
                  onClose={handleCloseDetails}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>

          {data?.count && data.count > 10 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.count}
              onPageChange={setPage}
            />
          )}
        </>
        <SelectedPokemonsFlyout
          selectedPokemons={selectedPokemons}
          pokemons={data?.pokemons}
          onUnselectAll={handleUnselectAll}
        />
        <ThrowErrorButton />
      </ErrorBoundary>
    </div>
  );
};
