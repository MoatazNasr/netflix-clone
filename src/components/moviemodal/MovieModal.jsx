import React, { useEffect, useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./moviemodal.css";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import StarRateIcon from "@mui/icons-material/StarRate";
import axios from "axios";
import { GlobalContext } from "../../context/Provider";
import { setMovieOrTvID } from "../../context/actions/movie-tvActions";
import { addToWishlist } from "../../context/actions/wishlistActions";
import { removeFromWishlist } from "../../context/actions/wishlistActions";
import RemoveIcon from "@mui/icons-material/Remove";
const Card = ({query}) => {
  const [movie, setMovie] = useState();
  const [inWishlist, setInWishlist] = useState(false);
  const {
    movieOrtvState,
    movieOrtvDispatch,
    wishlistDispatch,
    wishlistState,
    userState,
    successfulMessageDispatch
  } = useContext(GlobalContext);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${movieOrtvState.movieOrtv}/${movieOrtvState.movieOrtvID}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos`
      )
      .then((res) => {
        setMovie(res.data);
      });
    wishlistState.movies.forEach((item) => {
      if (item.movieID == movieOrtvState.movieOrtvID) setInWishlist(true);
    });
  }, [wishlistState]);

  let time = 0;
  if (movie && movieOrtvState.movieOrtv === "movie") {
    time = movie.runtime.toString().split("");
  }
  return (
    <>
      {movie && (
        <div className="card">
          <div className="card-content">
            <div className="card-header">
              <img
                src={ movie.poster_path || movie.backdrop_path ? `https://image.tmdb.org/t/p/original${
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path
                }`:''}
                alt="card"
              />
              <button
                onClick={() => setMovieOrTvID(null, movieOrtvDispatch)}
                className="close-button"
              >
                <CloseIcon fontSize="large"/>
              </button>
            </div>
            <div className="card-body">
              <p className="movie-title">
                {movieOrtvState.movieOrtv === "movie"
                  ? movie.title
                  : movie.original_name}
              </p>
              <p className="movie-tagline"> {movie.tagline}</p>
              <div className="movie-buttons">
                <NavLink
                  to={`/video/${movie.id}`}
                  state={movie.videos.results}
                  className="links"
                >
                  <PlayArrowIcon /> WATCH
                </NavLink>
                {window.location.pathname === "/mylist" && query === "" ? (
                  <button
                    onClick={() => {
                      removeFromWishlist(
                        {
                          movieID: movieOrtvState.movieOrtvID,
                          wishlistID: wishlistState._id,
                          token: userState.token,
                        },
                        wishlistDispatch,
                        successfulMessageDispatch
                      );
                      setMovieOrTvID(null, movieOrtvDispatch);
                    }}
                  >
                    <RemoveIcon /> REMOVE
                  </button>
                ) : (
                  <>
                    {!inWishlist && (
                      <button
                        onClick={() =>
                          addToWishlist(
                            {
                              type: movieOrtvState.movieOrtv,
                              state: wishlistState,
                              token: userState.token,
                              movieID: movie.id,
                            },
                            wishlistDispatch,
                            successfulMessageDispatch
                          )
                        }
                      >
                        <AddIcon />
                        WATCHLIST
                      </button>
                    )}
                  </>
                )}
              </div>
              <p className="movie-desc">{movie.overview}</p>
            </div>
            <div className="card-footer">
              <p className="movie-runtime-rating">
                {movieOrtvState.movieOrtv === "movie" ? (
                  <span>
                    {time[0]} Hour{" "}
                    {time[1] && time[2] ? time[1] + time[2] : time[1]} Minutes
                  </span>
                ) : (
                  <span>
                    Episode Time :{" "}
                    {movie.episode_run_time[0]
                      ? movie.episode_run_time[0]
                      : movie.last_episode_to_air.runtime}{" "}
                    Minutes
                  </span>
                )}
                <span>
                  {movie.vote_average} <StarRateIcon />
                </span>
              </p>
              {movie.genres.map((genre, index) => (
                <span className="genre-item" key={index}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
