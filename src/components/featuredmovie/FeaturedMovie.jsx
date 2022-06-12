import React, { useEffect, useState, useContext } from "react";
import "./featuredmovie.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";
import Video from "../../containers/video/Video";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/Provider";
import { setMovieOrTvID } from "../../context/actions/movie-tvActions";
const FeaturedMovie = () => {
  const [movie, setMovie] = useState();
  const { movieOrtvState, movieOrtvDispatch } = useContext(GlobalContext);
  useEffect(() => {
    if (movieOrtvState.movieOrtv === "movie") {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/646385?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos`
        )
        .then((res) => {
          setMovie(res.data);
        });
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/87739?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos`
        )
        .then((res) => {
          setMovie(res.data);
        });
    }
  }, [movieOrtvState]);
  return (
    <section className="featuredmovie_section">
      {movie && (
        <>
          <img
            className="featuredmovie_image"
            src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
          />
          <div className="featuredmovie_data ">
            <p className="featuredmovie_data_title">
              {movieOrtvState.movieOrtv === "movie"
                ? movie.original_title
                : movie.original_name}
            </p>
            <p className="featuredmovie_data_description">{movie.overview}</p>
            <div className="featuredmovie_data_buttons">
              <NavLink
                to={`/video/${movie.id}`}
                state={movie.videos.results}
                className="featuredmovie_data_buttons_playBTN links"
              >
                {" "}
                <PlayArrowIcon /> <span>Play</span>
              </NavLink>
              <button
                className="featuredmovie_data_buttons_infoBTN"
                onClick={() => setMovieOrTvID(movie.id, movieOrtvDispatch)}
              >
                <span>More Info</span>
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedMovie;
