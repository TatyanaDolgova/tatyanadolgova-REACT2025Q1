import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPokemons, Pokemon } from '../../api/fetchPokemons';
import { Search } from '../../components/Search/Search';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { Loader } from '../../components/Loader/Loader';
import { CardList } from '../../components/CardList/CardList';
import { Pagination } from '../../components/Pagination/Pagination';
import { ThrowErrorButton } from '../../components/ThrowErrorButton/ThrowErrorButton';

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

const HomePage = () => {
  const [searchRequest, setSearchRequest] = useState(
    localStorage.getItem('searchRequest')
  );
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const { page } = useParams();
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;

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

  return (
    <>
      <Search onSearch={handleSearch} initialValue={searchRequest} />
      <ErrorBoundary>
        {loading && <Loader />}
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <CardList pokemons={pokemons} />
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
