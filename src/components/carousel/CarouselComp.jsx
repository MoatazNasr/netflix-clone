import React, { useState, useRef } from "react";
import "./carousel.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SwiperItem from "../carouselitem/CarouselItem";
const List = () => {
  let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [movedSlides, setMovedSlides] = useState(0);
  const carouselDiv = useRef();
  const handleCarouselChange = (direction) => {
    let position;
    if (direction === "left") {
      
      position = carouselDiv.current.getBoundingClientRect().x - 236.4;
      setMovedSlides(movedSlides + 1);
    } else {
      position = carouselDiv.current.getBoundingClientRect().x + 236.4;
      setMovedSlides(movedSlides - 1);
    }
    carouselDiv.current.style.transform = `translateX(${position}px)`;
  };
  return (
    <section className="carousel">
      <div className="carousel-wrapper" ref={carouselDiv}>
        {list.map((item, index) => (
          <SwiperItem value={item} key={index} />
        ))}
      </div>
      {movedSlides < Math.floor(list.length / 2) && (
        <button
          className="carousel-next-button"
          onClick={() => handleCarouselChange("left")}
        >
          <ChevronRightIcon />
        </button>
      )}

      {movedSlides > 0 && (
        <button
          className="carousel-prev-button"
          onClick={() => handleCarouselChange("right")}
        >
          <ChevronLeftIcon />
        </button>
      )}
    </section>
  );
};

export default List;
