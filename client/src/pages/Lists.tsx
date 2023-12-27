import { useEffect, useLayoutEffect, useState } from "react";
import listsService from "../features/lists/listsService";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useList } from "../context/ListProvider";

interface List {
  _id: string;
  createdAt: string;
  list_description: string;
  list_name: string;
  movies: Array<string>;
  updatedAt: string;
  user_id: string;
}

function Lists() {
  const [lists, setLists] = useState<Array<List>>([]);
  const { setMovies } = useList();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect user to login, if they are not authenticated
    if (!localStorage.getItem("user")) {
      toast.error("You must be logged in to view lists!");
      navigate("/login");
    } else {
      // User is authenticated, so we get their lists
      const lists = listsService.getLists(
        JSON.parse(localStorage.getItem("user"))
      );

      lists
        .then((lists: Array<List>) => {
          setLists(lists);
        })
        .catch((err: AxiosError) => {
          // If the user is not authorized or the token is invalid/expired
          if (err.response.status == 401) {
            localStorage.removeItem("user");
            navigate("/login");
          }
        });
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
          {lists.map((list, index) => {
            return (
              <Link
                to={{ pathname: `/list`, search: "?id=" + list._id }}
                key={list._id}
                className="flex flex-col bg-slate-700 p-2 border rounded-md min-w-full hover:scale-105 transition-all cursor-pointer"
                onClick={() => {
                  // Won't have to worry about resetting this context later as
                  // its only used to render already made lists and each
                  // time a list is clicked on, it gets updated automatically
                  setMovies(list);
                }}
              >
                <h3 className=" text-2xl">{list.list_name}</h3>
                <span className=" text-gray-300">
                  {list.movies.length} movies
                </span>
                <span className=" text-gray-300">
                  {`Created:
                  ${new Date(list.createdAt).toString().substring(3, 15)} |
                  Updated:
                  ${new Date(list.updatedAt).toString().substring(3, 15)}`}
                </span>
              </Link>
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
