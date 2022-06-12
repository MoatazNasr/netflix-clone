import React, { useEffect, useState, useContext } from "react";
import "./searchresults.css";
import { GlobalContext } from "../../context/Provider";
import axiosInstance from "../../utils/TMDBAjax";
import MovieCard from "../moviecard/MovieCard";
const SearchResults = ({ query }) => {
  const { movieOrtvState } = useContext(GlobalContext);
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    axiosInstance
      .post(
        `https://api.themoviedb.org/3/search/${movieOrtvState.movieOrtv}/?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}`
      )
      .then((res) => {
        setSearchResults(res.data.results);
      });
  }, [query,movieOrtvState]);
  return (
    <section className="search-results">
      {searchResults.length > 0 &&
        searchResults.map((item, index) => (
          <MovieCard item={item} key={index} />
        ))}
    </section>
  );
};

export default SearchResults;
