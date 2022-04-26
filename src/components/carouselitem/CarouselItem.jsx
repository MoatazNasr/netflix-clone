import React, { useState } from "react";
import "./carouselitem.css";
import MovieCard from "../moviecard/MovieCard";
const SwiperItem = ({ value }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="swiper-item"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src="/assets/20201225201649583970.jpg" alt="movie" />
      {hover && <MovieCard />}
    </div>
  );
};

export default SwiperItem;
