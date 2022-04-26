import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FeaturedMovie from "../../components/featuredmovie/FeaturedMovie";
import Carousel from '../../components/carousel/CarouselComp';
import './home.css';
const Home = () => {
  return (
    <div className="home">
      <header >
        <Navbar />
        <FeaturedMovie />
      </header>
      <Carousel />

    </div>
  );
};

export default Home;
