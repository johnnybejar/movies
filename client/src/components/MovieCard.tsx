import React from "react";
import { Movie } from "../types/movie";
import { IoMdStar } from "react-icons/io";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard(props: MovieCardProps) {
  const imgBaseUrl = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";

  return (
    <div className="flex items-center gap-3 bg-slate-700 p-3 max-h-60">
      <img
        src={imgBaseUrl + props.movie.poster_path}
        alt={props.movie.title}
        className="h-46 w-32"
      ></img>
      <div className="flex flex-col items-start gap-1 pl-1 max-h-52">
        <span className="text-center underline">{props.movie.title}</span>
        <div className="flex gap-1 items-center">
          <IoMdStar />
          <span className="text-center">
            {props.movie.vote_average.toFixed(1)}
          </span>
        </div>
        <span className="">
          {/* prevents movie descriptions that are too long from overflowing */}
          {props.movie.overview.length <= 255
            ? props.movie.overview
            : props.movie.overview.substring(0, 255) + "..."}
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
