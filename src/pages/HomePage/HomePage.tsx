import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchPokemons, PokemonDetails } from '../../api/fetchPokemons';
import { Search } from '../../components/Search/Search';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { Loader } from '../../components/Loader/Loader';
import { CardList } from '../../components/CardList/CardList';
import { Pagination } from '../../components/Pagination/Pagination';
import { ThrowErrorButton } from '../../components/ThrowErrorButton/ThrowErrorButton';
import { CardDetails } from '../../components/CardDetails/CardDetails';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchRequest, setSearchRequest] = useState(
    localStorage.getItem('searchRequest')
  );
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const { page } = useParams();
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;
  const selectedPokemon = searchParams.get('details');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemons(searchRequest, currentPage);
        setPokemons(data.pokemons);
        setTotalPages(Math.ceil(data.count / 10));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Произошла неизвестная ошибка.');
        }
      }
    };

    fetchData();
  }, [searchRequest, currentPage]);

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    setSearchRequest(trimmedQuery);
    localStorage.setItem('searchRequest', trimmedQuery);
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

  return (
    <>
      <Search onSearch={handleSearch} initialValue={searchRequest} />
      <ErrorBoundary>
        {loading && <Loader />}
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="container">
              <CardList
                pokemons={pokemons}
                onSelect={handleSelectPokemon}
                onClick={handleCloseDetails}
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

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
        <ThrowErrorButton />
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
