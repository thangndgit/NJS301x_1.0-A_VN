/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { useUrl } from "../../hooks/hooks";
import { urlToRequest, imgToRequest } from "../../constants/request";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./MovieList.css";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [videoId, setVideoId] = useState("no_video");

  // Fetch movies
  useUrl(props.url, (data) => data.results, setMovies);

  // Get video id
  useEffect(() => {
    if (selected === -1) return;
    // IIFE fetch
    (async function () {
      try {
        // Get data
        const response = await fetch(urlToRequest(`/video?`), {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ film_id: movies[selected].id }),
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
  }, [movies, selected]);

  // View detail when click on movie image
  const viewDetail = (index) => {
    // If nothing has chosen, open detail
    if (props.selecting == -1) {
      props.onSelecting(props.id);
      setSelected(index);
    }
    // Else if another list had chosen before, swap to current detail
    if (props.selecting != props.id) {
      props.onSelecting(props.id);
      setSelected(index);
      return;
    }
    // Else if prev and current movie is the same, close detail
    if (selected === index) {
      props.onSelecting(-1);
      setSelected(-1);
      return;
    }
    // Else close detail
    setSelected(index);
  };

  return (
    <div className="movie-list">
      <div className="movie-list__title">{props.title}</div>
      <ul className="movie-list__items">
        {movies.map((movie, index) => (
          <li className="movie-list__item" key={index}>
            {props.direction === "horizontal" ? (
              <img
                src={
                  !movie.backdrop_path
                    ? require("../../images/no-image__backdrop-sm.png")
                    : imgToRequest(movie.backdrop_path, "w300")
                }
                className="horizontal"
                onClick={() => viewDetail(index)}
                alt="movie"
              />
            ) : (
              <img
                src={
                  !movie.poster_path
                    ? require("../../images/no-image__poster-sm.png")
                    : imgToRequest(movie.poster_path, "w154")
                }
                className="vertical"
                onClick={() => viewDetail(index)}
                alt="movie"
              />
            )}
          </li>
        ))}
      </ul>
      {/* If current list is selected, show detail */}
      {selected !== -1 && props.selecting == props.id && (
        <MovieDetail movie={movies[selected]} videoId={videoId} />
      )}
    </div>
  );
};

export default MovieList;
