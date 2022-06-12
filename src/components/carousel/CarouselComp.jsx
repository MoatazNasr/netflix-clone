import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import "./carousel.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CarouselItem from "../moviecard/MovieCard";
import axiosInstace from "../../utils/TMDBAjax";
import { GlobalContext } from "../../context/Provider";
let events = ["change", "resize"];
const List = ({ title, url }) => {
  const [list, setList] = useState([]);
  const [movedSlides, setMovedSlides] = useState(0);
  const { movieOrtvState } = useContext(GlobalContext);
  const [width, setWidth] = useState(window.innerWidth);
  const availableSlides = list.length - Math.floor(width / 277.96);
  let movieCardWidthRemainder = "." + (width / 277.96 + "").split(".")[1];
  const carouselDiv = useRef();
  const handleCarouselChange = (direction) => {
    let position;
    let movieCardWidth = 277.96;
    if (direction === "left") {
      if (movedSlides === availableSlides - 1) {
        movieCardWidth -= Number(movieCardWidthRemainder) * movieCardWidth;
      }
      position = carouselDiv.current.getBoundingClientRect().x - movieCardWidth;
      setMovedSlides((prevValue) => prevValue + 1);
    } else {
      if (movedSlides === availableSlides) {
        movieCardWidth -= Number(movieCardWidthRemainder) * movieCardWidth;
      }
      position = carouselDiv.current.getBoundingClientRect().x + movieCardWidth;
      setMovedSlides((prevValue) => prevValue - 1);
    }
    carouselDiv.current.style.transform = `translateX(${position}px)`;
  };
  useEffect(() => {
    if (title && url) {
      axiosInstace.get(url).then((res) => {
        setList(res.data.results);
      });
    }
  }, [movieOrtvState]);
  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, () => {
        setWidth(window.innerWidth);
      });
    });
  }, []);
  useEffect(() => {
    if (movedSlides !== 0 && movedSlides > availableSlides / 3) {
      setTimeout(() => {
        setMovedSlides(0);
        carouselDiv.current.style.transform = `translateX(${0}px)`;
      }, 500);
    }
  }, [width]);
  return (
    <section className="carousel">
      <h1>{title}</h1>
      <div className="carousel-wrapper" ref={carouselDiv}>
        {list.length > 0 &&
          list.map((item, index) => <CarouselItem item={item} key={index} />)}
      </div>
      {movedSlides < availableSlides && (
        <button
          className="carousel-next-button"
          onClick={() => handleCarouselChange("left")}
        >
          <ChevronRightIcon fontSize="lg" />
        </button>
      )}

      {movedSlides > 0 && (
        <button
          className="carousel-prev-button"
          onClick={() => handleCarouselChange("right")}
        >
          <ChevronLeftIcon fontSize="lg" />
        </button>
      )}
    </section>
  );
};

export default List;
