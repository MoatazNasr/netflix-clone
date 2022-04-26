import React from "react";
import "./featuredmovie.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const FeaturedMovie = () => {
  return (
    <section className="featuredmovie_section">
      <img
        className="featuredmovie_image"
        src="/assets/dcr1aui-26cc1992-2a38-41b9-b9ec-fcdd820c9bfd.jpg"
      />
      <div className="featuredmovie_data ">
        <p className="featuredmovie_data_description">
          A blind lawyer by day, vigilante by night. Matt Murdock fights the
          crime of New York as Daredevil. Edit Report This. As a child Matt
          Murdock was blinded by a chemical spill in a freak accident. Instead
          of limiting him it gave him superhuman senses that enabled him to see
          the world in a unique and powerful way.
        </p>
        <div className="featuredmovie_data_buttons">
          <button className="featuredmovie_data_buttons_playBTN">
            {" "}
            <PlayArrowIcon /> <span>Play</span>
          </button>
          <button className="featuredmovie_data_buttons_infoBTN">
            {" "}
            <ErrorOutlineIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
