import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./video.css";
import { NavLink, useLocation } from "react-router-dom";
const Video = () => {
  const location = useLocation();
  let movieVideos = location.state.filter((item) => item.type === "Trailer");
  return (
    <section className="movie-video">
      <NavLink className="back-home links" to={-1}>
        <ArrowBackIcon /> <span>Back</span>
      </NavLink>
      {movieVideos.length > 0 ? (
        <iframe
          src={`https://www.youtube.com/embed/${
            movieVideos[0].key ? movieVideos[0].key : location.state[0].key
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="movie-trailer"
        />
      ) : (
        <p>No Trailer</p>
      )}
    </section>
  );
};

export default Video;
