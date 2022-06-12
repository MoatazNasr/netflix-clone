import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import MovieModal from "../../components/moviemodal/MovieModal";
import MovieCard from "../../components/moviecard/MovieCard";
import { GlobalContext } from "../../context/Provider";
import axiosInstance from "../../utils/TMDBAjax.js";
import SearchResults from "../../components/searchresults/SearchResults";
import "./mylist.css";
const MyList = () => {
  const { movieOrtvState, wishlistState } = useContext(GlobalContext);
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    let resultMovies = [];
    let filterdMovies = wishlistState.movies.filter(
      (item) => item.type === movieOrtvState.movieOrtv
    );
    if (filterdMovies.length === 0) {
      setWishlistMovies([]);
    } else {
      let promises = filterdMovies.map((item) => {
        return axiosInstance
          .get(
            `https://api.themoviedb.org/3/${item.type}/${item.movieID}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos`
          )
          .then((res) => {
            resultMovies.push(res.data);
          });
      });
      Promise.all(promises).then((res) => {
        setWishlistMovies(resultMovies);
      });
    }
  }, [wishlistState, movieOrtvState]);
  return (
    <>
      <Navbar setSearchInput={setSearchInput} />
      <main>
        <h1 className="title">{searchInput ? "Search Results" : "My List"}</h1>
        <section className="mylist">
          {searchInput === "" ? (
            <>
              {wishlistMovies &&
                wishlistMovies.map((movie, index) => (
                  <MovieCard item={movie} key={index} />
                ))}
            </>
          ) : (
            <SearchResults query={searchInput} />
          )}

          {movieOrtvState.movieOrtvID && <MovieModal query={searchInput} />}
        </section>
      </main>
    </>
  );
};

export default MyList;
