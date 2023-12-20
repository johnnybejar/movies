import React from "react";
import { Movie } from "../types/movie";

function MovieCard(props: Movie) {
  return (
    <>
      <div>{props.title}</div>
    </>
  );
}

export default MovieCard;
