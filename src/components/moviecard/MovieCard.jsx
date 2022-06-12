import React, { useContext } from "react";
import "./moviecard.css";
import { GlobalContext } from "../../context/Provider";
import { setMovieOrTvID } from "../../context/actions/movie-tvActions";
const CarouselItem = ({ item }) => {
  const { movieOrtvDispatch, movieOrtvState } = useContext(GlobalContext);
  return (
    <>
      <div className="carousel-item">
        <img
          src={
            item.poster_path
              ? "https://image.tmdb.org/t/p/original" + item.poster_path
              : ""
          }
          alt={movieOrtvState.movieOrtv}
        />
        <button
          onClick={() => setMovieOrTvID(item.id, movieOrtvDispatch)}
          className="movie-info"
        >
          More Info
        </button>
      </div>
    </>
  );
};

export default CarouselItem;
