import { useEffect, useState } from "react";
import searchMovie from "../features/lists/searchService";
import { Search } from "../types/search";
import { Movie } from "../types/movie";

function ListCreator() {
  const [list, setList] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState<string>("");

  async function getSearchResults() {
    const res: Search = await searchMovie(search);
    console.log(res.results);
    setResults(res.results);
  }

  const onChange = (e: React.ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    setSearch(() => element.value);
  };

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
      <div>{results ? <>stuff</> : <>nothing</>}</div>
    </>
  );
}

export default ListCreator;
