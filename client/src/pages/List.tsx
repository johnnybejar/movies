import React from "react";
import { useList } from "../context/ListProvider";
import MovieCard from "../components/MovieCard";
import PageNotFound from "./PageNotFound";

function List() {
  const { movies } = useList();
  const queryParameters = new URLSearchParams(window.location.search);

  // Check to make sure the context is set and
  // the query params match with the id in the context
  if (!movies.movies || queryParameters.get("id") !== movies._id) {
    return <PageNotFound />;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-4xl underline">{movies.list_name}</span>
      <span className="text-xl">{movies.list_description}</span>
      <div>
        Created: {new Date(movies.createdAt).toString().substring(3, 15)} | Last
        Updated: {new Date(movies.updatedAt).toString().substring(3, 15)}
      </div>
      <div className="flex flex-col gap-2 w-3/4 max-w-5xl items-center">
        {movies.movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default List;
