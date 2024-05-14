import { IoMdStar } from "react-icons/io";
import { genres } from "../data/genres";
import { Movie } from "../types/movie";

function MovieCard(props: Movie) {
  const imgBaseUrl = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";
  const imgRef = "https://www.themoviedb.org/movie/" + props.id;

  return (
    <div className="flex w-full items-center gap-3 bg-slate-700 p-3 rounded">
      <a href={imgRef} target="_blank" rel="noreferrer">
        <img
          src={imgBaseUrl + props.poster_path}
          alt={props.title}
          className="max-w-32 w-32 h-48 border-2 hover:scale-105 transition-all"
        ></img>
      </a>
      <div className="flex flex-col items-start gap-1 pl-1 max-h-52 text-clip overflow-y-auto">
        <div>
          <span className="text-center underline font-bold">{props.title}</span>
          <span>
            {/* Render only the year of release, if available */ " "}(
            {props.release_date ? props.release_date.slice(0, 4) : "N/A"})
          </span>
        </div>
        <span>
          {props.genre_ids.map(
            (id, index) =>
              genres.get(id) +
              (index === props.genre_ids.length - 1 ? "" : " | ")
          )}
        </span>
        <div className="flex gap-1 items-center">
          <IoMdStar />
          <span className="font-bold">{props.vote_average.toFixed(1)}</span>
          <span>{` (${props.vote_count})`}</span>
        </div>
        <span className="max-sm:text-sm">
          {/* prevents movie descriptions that are too long from overflowing */}
          {/* TODO: Reconsider this solution when I get to screen responsiveness */}
          {props.overview.length <= 255
            ? props.overview
            : props.overview.substring(0, 253) + "..."}
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
