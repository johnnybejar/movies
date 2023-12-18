import React from "react";

type MovieDetails = {
  genre_ids: Array<number>;
  id: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

function MovieCard(Movie: MovieDetails) {
  return (
    <>
      <div>MovieCard</div>
    </>
  );
}

export default MovieCard;
