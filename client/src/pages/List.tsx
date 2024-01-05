import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import PageNotFound from "./PageNotFound";
import listsService from "../features/lists/listsService";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ListType } from "../types/list";
import { MoonLoader } from "react-spinners";
import ListUpdate from "./ListUpdate";

function List() {
  const [movies, setMovies] = useState<ListType>({ _id: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const createdDate = new Date(movies.createdAt).toString().split(" ");
  const updatedDate = new Date(movies.updatedAt).toString().split(" ");

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
        setLoading(false);
        console.log(err);
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

  if (loading) {
    return <MoonLoader color="white" size={120} />;
  }

  // Check if the list was not set and the id in the
  // list does not equal the id in the query params
  if (!movies._id || queryParameters.get("id") !== movies._id) {
    return <PageNotFound />;
  }

  return (
    <div className="flex flex-col max-w-5xl items-center gap-2">
      <Routes>
        <Route path="/update" element={<ListUpdate />} />
      </Routes>
      <div className="flex flex-col items-center">
        <span className="text-4xl text-center font-bold">
          {movies.list_name}
        </span>
        <span className="text-xl">{movies.list_description}</span>
      </div>
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col items-center">
          <div className="flex flex-col">
            <span>
              Created:
              {` ${createdDate[1]} ${createdDate[2]}, ${createdDate[3]}`}
            </span>
            <span>
              Updated:
              {` ${updatedDate[1]} ${updatedDate[2]}, ${updatedDate[3]}`}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            className="border-2 bg-slate-700 rounded-md p-1 transition-all hover:bg-slate-600"
            to="/list/update"
            state={movies}
          >
            Update List
          </Link>
          <button
            className="border-2 bg-red-800 rounded-md p-1 transition-all hover:bg-red-600"
            onClick={deleteList}
          >
            Delete List
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full items-center">
        {movies.movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default List;
