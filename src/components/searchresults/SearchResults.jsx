import React, { useEffect, useState, useContext } from "react";
import "./searchresults.css";
import { GlobalContext } from "../../context/Provider";
import axiosInstance from "../../utils/TMDBAjax";
import MovieCard from "../moviecard/MovieCard";
const SearchResults = ({ query }) => {
  const { movieOrtvState } = useContext(GlobalContext);
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    axiosInstance.get(`/search/${movieOrtvState.movieOrtv}/?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}`)
      .then((res) => {
        setSearchResults(res.data.results);
      })
      .catch(()=>{
        
      })
  }, [query,movieOrtvState]);
  return (
    <section className="search-results" aria-label='search-results' role='region'>
      {searchResults.length > 0 &&
        searchResults.map((item, index) => (
          <MovieCard item={item} key={index} />
        ))}
    </section>
  );
};

export default SearchResults;
