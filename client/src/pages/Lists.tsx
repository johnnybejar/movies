import { useState } from "react";

function Lists() {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState([]);

  return (
    <>
      <div className="">
        <button className=" bg-slate-300 text-black rounded p-2 font-bold hover:bg-slate-400 transition-all">
          Create a List
        </button>
      </div>
      <div className="flex flex-wrap">
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
      </div>
    </>
  );
}

export default Lists;
