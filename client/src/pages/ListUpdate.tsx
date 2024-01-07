import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { useLocation, useNavigate } from "react-router-dom";
import searchMovie from "../features/lists/searchService";
import { toast } from "react-toastify";
import { Search } from "../types/search";
import MovieCard from "../components/MovieCard";
import { ListType } from "../types/list";
import PageNotFound from "./PageNotFound";
import listsService from "../features/lists/listsService";
import { MoonLoader } from "react-spinners";

function ListUpdate() {
  const [list] = useState(useLocation().state as ListType);

  if (!list || !list._id) {
    return <PageNotFound />;
  }

  const [movies, setMovies] = useState<Movie[]>(list.movies);
  const [title, setTitle] = useState(list.list_name);
  const [description, setDescription] = useState(list.list_description);
  const [results, setResults] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [isLoadingResults, setLoadingResults] = useState(false);
  const imgBaseUrl = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";

  const navigate = useNavigate();

  // Updates the list when addToList is called
  useEffect(() => {}, [list]);

  async function getSearchResults() {
    // Clears results in case it is already set
    setResults([]);
    setLoadingResults(true);

    const res = searchMovie(search);

    res.then((r: Search) => {
      const movies: Movie[] = r.results as Movie[];
      if (movies.length === 0) toast("No movies found...");
      setResults((oldArr) => [...oldArr, ...movies]);
    });

    setLoadingResults(false);
  }

  function addToList(movie: Movie) {
    // Checks if the movie is already in the list
    if (movies.filter((m) => m.id === movie.id).length > 0) {
      toast.error("Movie is already in the list!");
      setSearch("");
      setResults([]);
    } else {
      setMovies((oldArr) => [...oldArr, movie]);
      setSearch("");
      setResults([]);
      toast.success(`Successfully added: ${movie.title}`);
    }
  }

  function updateList() {
    // Title must be set and list must not be empty
    // descriptions are optional
    if (!title) {
      toast.error("Please create a title for your list!");
      return;
    }

    // Should be taken care in the disabled update list
    // button but I'll put this here just in case
    if (movies.length === 0) {
      toast.error("The list must not be empty!");
      return;
    }

    const res = listsService.updateList(
      JSON.parse(localStorage.getItem("user")),
      list._id,
      title,
      description,
      movies
    );

    res
      .then(() => {
        toast.success(`List ${title} updated successfully!`);
        navigate(`/list?id=${list._id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const onChange = (e: React.ChangeEvent, setter: (s) => void) => {
    const element = e.currentTarget as HTMLInputElement;

    switch (setter) {
      case setTitle:
        if (element.value.length >= 64) {
          setter(() => element.value.substring(0, 64));
          return;
        }
        break;
      case setDescription:
        if (element.value.length >= 512) {
          setter(() => element.value.substring(0, 512));
          return;
        }
        break;
      default:
        break;
    }

    setter(() => element.value);
  };

  if (isLoadingResults) {
    return <MoonLoader />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">List Title</span>
          <input
            className="rounded w-72 max-sm:w-48 h-10 p-2 text-center text-black"
            type="text"
            id="list-title"
            name="list-title"
            value={title}
            onChange={(e) => onChange(e, setTitle)}
          ></input>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">List Description</span>
          <textarea
            className="rounded w-96 max-sm:w-64 h-24 p-1 max-h-48 min-h-12 text-black"
            id="list-description"
            name="list-description"
            value={description}
            onChange={(e) => onChange(e, setDescription)}
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col items-center m-2 gap-1">
        <span className="text-3xl">Movie Search</span>
        <div className="flex gap-2">
          <input
            className="rounded h-10 p-2 text-center text-black"
            type="text"
            id="movie-search"
            name="movie-search"
            value={search}
            placeholder="Search for a movie"
            onChange={(e) => onChange(e, setSearch)}
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
      </div>
      {results.length === 0 ? (
        <></>
      ) : (
        <button
          className="bg-white text-black rounded-sm px-4 py-2 hover:bg-gray-300 transition-all"
          onClick={() => setResults([])}
        >
          Clear Results
        </button>
      )}
      {list.movies.length === 0 ? (
        <button
          className=" bg-gray-500 text-gray-900 rounded-sm py-2 px-4 cursor-default transition-all"
          onClick={() => toast.error("The list must not be empty!")}
        >
          Update List
        </button>
      ) : (
        <button
          className="bg-white text-black rounded-sm py-2 px-4 hover:bg-gray-300 transition-all"
          onClick={updateList}
        >
          Update List
        </button>
      )}
      <div className="flex gap-2 flex-wrap w-3/4 justify-center">
        {results.map((movie) => {
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
                {/* TODO: Handle titles that are extremely long */}
                {`${movie.title} - ${
                  movie.release_date ? movie.release_date.slice(0, 4) : "N/A"
                }`}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-2 max-w-3xl items-center">
        {movies.length === 0 && results.length === 0 ? (
          <span className=" text-2xl">
            Add a film by searching for a movie above!
          </span>
        ) : (
          movies.map((movie) => {
            return (
              <div className="relative min-w-full" key={movie.id}>
                <MovieCard movie={movie} />
                <button
                  className="absolute top-2 right-2 border-2 bg-slate-700 rounded-md p-1 transition-all hover:bg-slate-600"
                  onClick={() => {
                    // Removes the item clicked on by using filter
                    setMovies(movies.filter((m) => m.id !== movie.id));
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default ListUpdate;
