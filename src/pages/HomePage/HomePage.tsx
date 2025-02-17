import { useMemo, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetPokemonsQuery } from '../../store/pokemonApi';
import { Search } from '../../components/Search/Search';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { Loader } from '../../components/Loader/Loader';
import { CardList } from '../../components/CardList/CardList';
import { Pagination } from '../../components/Pagination/Pagination';
import { ThrowErrorButton } from '../../components/ThrowErrorButton/ThrowErrorButton';
import { CardDetails } from '../../components/CardDetails/CardDetails';
import { useSearchRequest } from '../../hooks/useSearchRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  selectPokemon,
  unselectAllPokemons,
  unselectPokemon,
} from '../../store/pokemonSlice';
import { useTheme } from '../../context/ThemeContext';

const HomePage = () => {
  const downloadUrlRef = useRef<string | null>(null);
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

  const currentPage = useMemo(() => {
    return Number(page) || 1;
  }, [page]);

  const handleSearch = async (query: string) => {
    setSearchRequest(query);
  };

  const setPage = (newPage: number) => {
    navigate(`/pages/${newPage}`);
  };

  const handleSelectPokemon = (id: string) => {
    setSearchParams({ details: id });
  };

  const handleCloseDetails = () => {
    setSearchParams((prevParams) => {
      prevParams.delete('details');
      return prevParams;
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

  const handleDownload = () => {
    if (!selectedPokemons.length || !data?.pokemons) return;

    const csvContent = selectedPokemons
      .map((name) => {
        const pokemon = data.pokemons.find((p) => p.name === name);
        return pokemon
          ? `${pokemon.name},${pokemon.height},${pokemon.base_experience}`
          : '';
      })
      .filter((line) => line !== '')
      .join('\n');

    if (!csvContent) return;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    downloadUrlRef.current = url;

    const downloadFile = () => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedPokemons.length}_pokemons.csv`;
      link.dispatchEvent(new MouseEvent('click'));
    };

    downloadFile();

    setTimeout(() => {
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
        downloadUrlRef.current = null;
      }
    }, 100);
  };

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Search onSearch={handleSearch} initialValue={searchRequest} />
      <ErrorBoundary>
        {isLoading && <Loader />}
        {error ? (
          <p className="error-message">Ошибка загрузки данных.</p>
        ) : (
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
        )}
        {selectedPokemons.length > 0 && (
          <div className="flyout">
            <p>{selectedPokemons.length} items are selected</p>
            <button onClick={handleUnselectAll}>Unselect all</button>
            <button onClick={handleDownload}>Download</button>
          </div>
        )}
        <ThrowErrorButton />
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
