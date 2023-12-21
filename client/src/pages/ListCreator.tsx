import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import searchMovie from "../features/lists/searchService";
import { Search } from "../types/search";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

function ListCreator() {
  const [list, setList] = useState<Movie[]>([]);
  const [results, setResults] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [isLoadingResults, setLoadingResults] = useState(false);
  const imgBaseUrl = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";

  // Updates the list when addToList is called
  useEffect(() => {}, [list]);

  async function getSearchResults() {
    // Clears results in case it is already set
    setResults([]);
    setLoadingResults(true);

    const res = searchMovie(search);

    res.then((r: Search) => {
      const movies: Movie[] = r.results as Movie[];
      setResults((oldArr) => [...oldArr, ...movies]);
    });

    setLoadingResults(false);
  }

  function addToList(movie: Movie) {
    // Checks if the movie is already in the list
    if (list.filter((m) => m.id === movie.id).length > 0) {
      toast.error("Movie is already in the list!");
      setSearch("");
      setResults([]);
    } else {
      setList((oldArr) => [...oldArr, movie]);
      setSearch("");
      setResults([]);
    }
  }

  const onChange = (e: React.ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    setSearch(() => element.value);
  };

  if (isLoadingResults) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="flex m-2 gap-1">
        <input
          className="rounded h-10 p-2 text-center text-black"
          type="text"
          id="search"
          name="search"
          value={search}
          placeholder="Search for a movie"
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              getSearchResults();
            }
          }}
        ></input>
        <button
          className="bg-white text-black rounded-sm px-4 hover:bg-gray-300 transition-all"
          onClick={getSearchResults}
        >
          Search
        </button>
      </div>
      <div className="flex gap-2 flex-wrap w-3/4 justify-center">
        {results.map((movie, index) => {
          return (
            <div
              key={movie.id}
              className="flex flex-col items-center"
              onClickCapture={() => addToList(movie)}
            >
              <img
                src={imgBaseUrl + movie.poster_path}
                alt={movie.title}
                className="h-64 w-44 border-2 border-white hover:opacity-50 transition-all"
              />
              <span className="w-44 text-center">
                {/* puts the original title in parenthesis after, usually for foreign films */}
                {movie.title === movie.original_title
                  ? movie.title
                  : `${movie.title} (${movie.original_title})`}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-2 w-1/2 max-w-3xl items-center">
        {list.length === 0 && results.length === 0 ? (
          <span>Add a film by searching for a movie!</span>
        ) : (
          list.map((movie) => {
            return <MovieCard movie={movie} />;
          })
        )}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default ListCreator;
