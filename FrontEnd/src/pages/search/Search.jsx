import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchForm from "../../components/SearchForm/SearchForm";
import ResultList from "../../components/ResultList/ResultList";
import MovieDetail from "../../components/MovieDetail/MovieDetail";
import { urlToRequest } from "../../constants/request";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [hasSearch, setHasSearch] = useState(false);
  const [results, setResults] = useState([]);
  const [videoId, setVideoId] = useState("no_video");
  const [selecting, setSelecting] = useState(-1);

  // Search movie
  useEffect(() => {
    // Re-check
    if (query.length === 0) return;
    // IIFE fetch
    (async function () {
      try {
        // Get data
        const response = await fetch(urlToRequest(`/search?`), {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: query,
        });
        const data = await response.json();
        // Set data
        setResults(data.results);
        setHasSearch(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [query]);

  // Get selecting movie video id
  useEffect(() => {
    if (selecting === -1) return;
    // IIFE fetch
    (async function () {
      try {
        // Get data
        const response = await fetch(urlToRequest(`/video?`), {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ film_id: results[selecting].id }),
        });
        const data = await response.json();
        // Set data
        setVideoId(data.video.key);
      } catch (err) {
        // Log error
        console.log(err);
        // Set no video
        setVideoId("no_video");
      }
    })();
  }, [results, selecting]);

  const searchHandler = (query) => {
    setQuery(query);
  };

  const selectHandler = (id) => {
    setSelecting(id);
  };

  return (
    <div className="app">
      <Navbar />
      <SearchForm onSearch={searchHandler} onSelect={selectHandler} />
      {/* When a movie is selected, open detail */}
      {selecting !== -1 && (
        <div className="search-movie-info">
          <h3>Movie info</h3>
          <MovieDetail movie={results[selecting]} videoId={videoId} />
        </div>
      )}
      {/* When has results, open results */}
      {results.length !== 0 && (
        <ResultList items={results} onSelect={selectHandler} />
      )}
      {results.length === 0 && hasSearch && (
        <h3 className="search-no-result">No result found</h3>
      )}
    </div>
  );
};

export default Search;
