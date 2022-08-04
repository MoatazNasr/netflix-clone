import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import FeaturedMovie from "../../components/featuredmovie/FeaturedMovie";
import Carousel from "../../components/carousel/CarouselComp";
import MovieModal from "../../components/moviemodal/MovieModal";
import "./home.css";
import { GlobalContext } from "../../context/Provider";
import SearchResults from "../../components/searchresults/SearchResults";
const Home = () => {
  const { movieOrtvState } = useContext(GlobalContext);
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <Navbar setSearchInput={setSearchInput} />
      <main className="home" aria-label='home-main'>
        <h1 className="title">{searchInput && "Search Results"}</h1>
        {searchInput === "" ? (
          <>
            <FeaturedMovie />
            <Carousel
              title="Original Netflix"
              url={`/discover/${movieOrtvState.movieOrtv}?api_key=${process.env.REACT_APP_TMDB_KEY}&with_networks=213&append_to_response=videos`}
            />
            <Carousel
              title="Trending"
              url={`/trending/${movieOrtvState.movieOrtv}/week?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos`}
            />
            <Carousel
              title="Top Rated"
              url={`/${movieOrtvState.movieOrtv}/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos`}
            />
            <Carousel
              title="Animation"
              url={`/discover/${movieOrtvState.movieOrtv}?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=16&append_to_response=videos`}
            />{" "}
             <Carousel
              title="Comedy"
              url={`/discover/${movieOrtvState.movieOrtv}?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=35&append_to_response=videos`}
            />{" "}
             <Carousel
              title="Romance"
              url={`/discover/${movieOrtvState.movieOrtv}?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=10749&append_to_response=videos`}
            />{" "}
          </>
        ) : (
          <SearchResults query={searchInput} />
        )}
        {movieOrtvState.movieOrtvID && <MovieModal query={searchInput} />}
      </main>
    </>
  );
};

export default Home;
