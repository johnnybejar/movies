import { useEffect, useState } from "react";
import listsService from "../features/lists/listsService";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ListType } from "../types/list";
import { MoonLoader } from "react-spinners";

function Lists() {
  const [lists, setLists] = useState<ListType[]>([]);
  const [loading, setLoading] = useState(true);
  const imgBaseUrl = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";
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
        .then((lists: ListType[]) => {
          setLists(lists);
          setLoading(false);
        })
        .catch((err: AxiosError) => {
          // If the user is not authorized or the token is invalid/expired
          console.log(err);
          if (err.response && err.response.status == 401) {
            localStorage.removeItem("user");
            navigate("/login");
            setLoading(false);
          } else {
            localStorage.removeItem("user");
            setLoading(false);
          }
        });
    }
  }, []);

  if (loading) {
    return <MoonLoader color="white" size={120} />;
  }

  if (!loading && lists.length === 0) {
    return (
      <>
        <div>
          <button className="bg-white text-black rounded p-2 hover:bg-gray-300 transition-all">
            <Link to="/create">Create a list</Link>
          </button>
        </div>
        <span className="text-3xl">
          {"You don't have any lists! Click the button above to create one!"}
        </span>
      </>
    );
  }

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <Link to="/create">
        <button className="bg-white text-black rounded p-2 hover:bg-gray-300 transition-all">
          Create a list
        </button>
      </Link>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap justify-center items-center max-w-7xl gap-3">
          {lists.map((list) => {
            return (
              <Link
                to={{ pathname: `/list`, search: "?id=" + list._id }}
                key={list._id}
                className="flex flex-col items-center w-full max-w-sm h-70 overflow-auto text-clip gap-1 px-8 bg-slate-700 p-2 rounded-lg border border-transparent transition-all hover:border-white"
              >
                <h3 className="text-3xl text-center w-full mr-auto ml-auto truncate">
                  {list.list_name}
                </h3>
                <span className="text-gray-300">
                  {list.movies.length} movies
                </span>
                <div className="flex gap-2 mt-1 justify-center">
                  {list.movies.slice(0, 3).map((movie) => {
                    return (
                      <img
                        key={movie.id}
                        className="w-24 border"
                        src={imgBaseUrl + movie.poster_path}
                      />
                    );
                  })}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Lists;
