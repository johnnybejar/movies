import { useState } from "react";
import searchMovie from "../features/lists/searchService";
import { Search } from "../types/search";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

function ListCreator() {
  const [list, setList] = useState([]);
  const [results, setResults] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoadingResults, setLoadingResults] = useState(false);

  const imgBaseUrl = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";

  async function getSearchResults() {
    // Clears results in case it is already set
    setResults([]);
    setLoadingResults(true);

    const res: Promise<unknown> = searchMovie(search);

    res.then((r: Search) => {
      const movies: Movie[] = r.results as Movie[];
      setResults((oldArr) => [...oldArr, ...movies]);
    });

    setLoadingResults(false);
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
        {results.length === 0 ? (
          <></>
        ) : (
          <>
            {results.map((movie) => {
              return (
                <div key={movie.id} className="flex flex-col items-center">
                  <img
                    src={imgBaseUrl + movie.poster_path}
                    alt={movie.title}
                    className="flex h-64 w-44 border-2 border-white hover:opacity-50 transition-all"
                  />
                  <span className="w-44 text-center">
                    {movie.title === movie.original_title
                      ? movie.title
                      : movie.title}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default ListCreator;
