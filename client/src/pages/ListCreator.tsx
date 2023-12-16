import { useEffect, useState } from "react";
import searchMovie from "../features/lists/searchService";

function ListCreator() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState({});

  function searchResults() {
    const res = searchMovie(search);
    console.log(res);
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
        ></input>
        <button
          className="bg-white text-black rounded-sm px-4 hover:bg-gray-300 transition-all"
          onSubmit={searchResults}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default ListCreator;
