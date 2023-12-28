import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import PageNotFound from "./PageNotFound";
import listsService from "../features/lists/listsService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ListType } from "../types/list";

function List() {
  const [movies, setMovies] = useState<ListType>({ _id: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);

  useEffect(() => {
    const response = listsService.getList(
      JSON.parse(localStorage.getItem("user")),
      queryParameters.get("id")
    );

    response
      .then((list) => {
        setMovies(list);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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

  function updateList() {
    // const response = listsService.updateList(
    //   JSON.parse(localStorage.getItem("user")),
    //   movies._id
    // );
    // response
    //   .then((v) => {
    //     console.log(v);
    //     toast.success("List deleted successfully!");
    //     navigate("/");
    //   })
    //   .catch(() => {});
    console.log("update");
  }

  if (loading) {
    return <>loading...</>;
  }

  // Check if the list was not set and the id in the
  // list does not equal the id in the query params
  if (!movies._id || queryParameters.get("id") !== movies._id) {
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
      <button
        className="absolute top-2 left-32 border-2 bg-slate-700 rounded-md p-1 transition-all hover:bg-slate-600"
        onClick={updateList}
      >
        Update List
      </button>
    </div>
  );
}

export default List;
