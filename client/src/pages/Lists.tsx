import { useEffect, useState } from "react";
import listsService from "../features/lists/listsService";
import { Link, useNavigate } from "react-router-dom";

interface Movie {
  _id: string;
  createdAt: string;
  list_description: string;
  list_name: string;
  movies: Array<string>;
  updatedAt: string;
  user_id: string;
}

function Lists() {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect user to login, if they are not authenticated
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      // User is authenticated, so we get their lists
      const lists = listsService.getLists(
        JSON.parse(localStorage.getItem("user"))
      );

      lists
        .then((lists: Array<Movie>) => {
          setMovies(lists);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <>
      <div className="">
        <button className=" bg-slate-300 text-black rounded p-2 font-bold hover:bg-slate-400 transition-all">
          <Link to="/create">Create a list</Link>
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-col items-center gap-3">
          {movies.map((movie) => {
            return (
              <div
                key={movie._id}
                className="flex flex-col p-2 border rounded-md min-w-full hover:scale-105 transition-all"
              >
                <h3 className=" text-2xl">{movie.list_name}</h3>
                <span className=" text-gray-400">
                  {movie.movies.length} movies
                </span>
                <span className=" text-gray-400">
                  Created:
                  {new Date(movie.createdAt).toString().substring(3, 15)} |
                  Updated:
                  {new Date(movie.updatedAt).toString().substring(3, 15)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="flex flex-wrap">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col p-2 border rounded-md min-w-full hover:scale-105 transition-all">
            <h3 className=" text-2xl">Watched movies</h3>
            <span className=" text-gray-400">24 movies</span>
            <span className=" text-gray-400">
              Created: Jul. 20, 2023 | Updated: Aug. 12, 2023
            </span>
          </div>
          <div className="flex flex-col p-2 border rounded-md min-w-full hover:scale-105 transition-all">
            <h3 className=" text-2xl">Watched movies</h3>
            <span className=" text-gray-400">24 movies</span>
            <span className=" text-gray-400">
              Created: Jul. 20, 2023 | Updated: Aug. 12, 2023
            </span>
          </div>
          <div className="flex flex-col p-2 border rounded-md min-w-full hover:scale-105 transition-all">
            <h3 className=" text-2xl">Watched movies</h3>
            <span className=" text-gray-400">24 movies</span>
            <span className=" text-gray-400">
              Created: Jul. 20, 2023 | Updated: Aug. 12, 2023
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Lists;
