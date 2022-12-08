import React, { useRef } from "react";
import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  // Value of search input
  const keywordRef = useRef("");
  const genreRef = useRef("");
  const mediaTypeRef = useRef("");
  const languageRef = useRef("");
  const yearRef = useRef("");

  // Handler when click reset button
  const inputResetHandler = (event) => {
    event.preventDefault();
    keywordRef.current.value = "";
    genreRef.current.value = "";
    mediaTypeRef.current.value = "";
    languageRef.current.value = "";
    yearRef.current.value = "";
  };

  // Handler when submit form
  const inputSubmitHandler = (event) => {
    event.preventDefault();
    // Get search input
    const keyword = keywordRef.current.value;
    const genre = genreRef.current.value;
    const mediaType = mediaTypeRef.current.value;
    const language = languageRef.current.value;
    const year = yearRef.current.value;
    // Create search object
    const searchObj = {};
    // Check
    if (keyword.trim().length === 0) {
      alert("You must enter some words to search!");
      return;
    }
    // Set data for search object
    searchObj.keyword = keyword;
    if (genre.trim()) searchObj.genre = genre;
    if (mediaType.trim()) searchObj.mediaType = mediaType;
    if (language.trim()) searchObj.language = language;
    if (year.trim()) searchObj.year = year;
    // Search
    props.onSearch(JSON.stringify(searchObj));
    props.onSelect(-1);
  };

  // Render
  return (
    <form className={classes["search-form"]} onSubmit={inputSubmitHandler}>
      <div className={classes["search-form__top"]}>
        <input
          type="text"
          name="keyword"
          ref={keywordRef}
          placeholder="Enter the keyword . . ."
        />
        <input
          type="text"
          name="genre"
          ref={genreRef}
          placeholder="Enter the genre name . . ."
        />
        <input
          type="text"
          name="mediaType"
          ref={mediaTypeRef}
          placeholder="Enter the media type (all, movie, tv, person) . . ."
        />
        <input
          type="text"
          name="language"
          ref={languageRef}
          placeholder="Enter the language code (en-us, ja, ko) . . ."
        />
        <input
          type="text"
          name="year"
          ref={yearRef}
          placeholder="Enter the published year . . ."
        />
      </div>
      <div className={classes["search-form__bot"]}>
        <button className={classes["btn-search"]} type="submit">
          Search
        </button>
        <button className={classes["btn-reset"]} onClick={inputResetHandler}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
