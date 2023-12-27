import React from "react";
import { useList } from "../context/ListProvider";
import MovieCard from "../components/MovieCard";
import PageNotFound from "./PageNotFound";
import listsService from "../features/lists/listsService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function List() {
  const { movies } = useList();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);

  function deleteList() {
    const response = listsService.deleteList(
      JSON.parse(localStorage.getItem("user")),
      movies._id
    );

    response
      .then((v) => {
        console.log(v);
        toast.success("List deleted successfully!");
        navigate("/");
      })
      .catch(() => {});
  }

  // Check to make sure the context is set and
  // the query params match with the id in the context
  if (!movies.movies || queryParameters.get("id") !== movies._id) {
    return <PageNotFound />;
  }

  return (
    <div className="flex relative flex-col items-center gap-2">
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
      <button
        className="absolute top-2 right-32 border-2 bg-slate-700 rounded-md p-1 transition-all hover:bg-slate-600"
        onClick={deleteList}
      >
        Delete List
      </button>
    </div>
  );
}

export default List;
