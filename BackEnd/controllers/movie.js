// Import model
const Movie = require("../models/movie");
const Genre = require("../models/genre");
const Video = require("../models/video");

// Import util
const paging = require("../utils/paging");

// GET - Trending movies
exports.getTrendingMovies = (req, res) => {
  // Create response data
  const resData = {};

  // Get query from url
  const page = Number(req.query.page) || 1;

  // Get all data
  const movies = Movie.all();

  // Sort movies by popularity
  const trendingMovies = movies.sort((a, b) => b.popularity - a.popularity);

  // Paging
  const paged = paging(page, 20, trendingMovies);

  // If page query is outer valid range
  if ((page <= 0 || page > paged.total_pages) && paged.total_pages !== 0) {
    resData.message = `The page query must be in range [1; ${paged.total_pages}]`;
    return res.status(400).json(resData);
  }

  // If every thing is fine
  resData.results = paged.results;
  resData.page = paged.page;
  resData.total_pages = paged.total_pages;
  return res.json(resData);
};

// GET - Top rate movies
exports.getTopRateMovies = (req, res) => {
  // Create response data
  const resData = {};

  // Get query from url
  const page = Number(req.query.page) || 1;

  // Get all data
  const movies = Movie.all();

  // Sort movies by vote_average
  const topRateMovies = movies.sort((a, b) => b.vote_average - a.vote_average);

  // Paging
  const paged = paging(page, 20, topRateMovies);

  // If page query is outer valid range
  if ((page <= 0 || page > paged.total_pages) && paged.total_pages !== 0) {
    resData.message = `The page query must be in range [1; ${paged.total_pages}]`;
    return res.status(400).json(resData);
  }

  // If every thing is fine
  resData.results = paged.results;
  resData.page = paged.page;
  resData.total_pages = paged.total_pages;
  return res.json(resData);
};

// GET - Movies by genre
exports.getMoviesByGenre = (req, res) => {
  // Create response data
  const resData = {};

  // Get query from url
  const page = Number(req.query.page) || 1;
  const genre = Number(req.query.genre);

  // Check if genre is undefined
  if (!genre) {
    resData.message = "Genre query is missing";
    return res.status(400).json(resData);
  }

  // Get all data
  const movies = Movie.all();
  const genres = Genre.all();

  // Get genre
  const genreFound = genres.find((g) => g.id === genre);

  // Check if genre not found
  if (!genreFound) {
    resData.message = "Genre not found";
    return res.status(404).json(resData);
  }

  // Filter movies by genre
  const filteredMovies = movies.filter((movie) =>
    movie.genre_ids.includes(genre)
  );

  // Paging
  const paged = paging(page, 20, filteredMovies);

  // If page query is outer valid range
  if ((page <= 0 || page > paged.total_pages) && paged.total_pages !== 0) {
    resData.message = `The page query must be in range [1; ${paged.total_pages}]`;
    return res.status(400).json(resData);
  }

  // If every thing is fine
  resData.results = paged.results;
  resData.page = paged.page;
  resData.total_pages = paged.total_pages;
  resData.genre_name = genreFound.name;
  return res.json(resData);
};

// GET - Trailer of a specific movie
exports.postTrailerOfMovie = (req, res) => {
  // Create response data
  const resData = {};

  // Get query from url
  const film_id = Number(req.body.film_id);
  console.log(req.body);
  console.log(req.body.film_id);

  // Check if film_id is undefined
  if (!film_id) {
    resData.message = "film_id query is missing";
    return res.status(400).json(resData);
  }

  // Get all data
  const videos = Video.all();

  // Get trailer of movie that had id = film_id
  const foundVideos = videos.find((video) => video.id === film_id);

  // If videos were founded
  if (foundVideos) {
    // Filter videos
    const filteredVideos = foundVideos.videos.filter(
      (video) => video.official === true && video.site === "YouTube"
    );
    // Sort video by published_at decrease
    filteredVideos.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );

    // Get trailer videos
    const trailerVideos = filteredVideos.filter(
      (video) => video.type === "Trailer"
    );
    // Get teaser videos
    const teaserVideos = filteredVideos.filter(
      (video) => video.type === "Teaser"
    );

    // If this movie has trailer
    if (trailerVideos.length > 0) {
      resData.video = trailerVideos[0];
      return res.json(resData);
    }
    // If this movie has teaser
    if (teaserVideos.length > 0) {
      resData.video = teaserVideos[0];
      return res.json(resData);
    }
  }

  // If this movie does not has valid video
  resData.message = "No video found";
  return res.status(404).json(resData);
};

// GET - Search movies by keyword
exports.postSearchMovies = (req, res) => {
  // Create response data
  const resData = {};

  // Get keyword from request body
  const page = Number(req.query.page) || 1;
  const keyword = req.body.keyword;
  const genre = req.body.genre;
  const mediaType = req.body.mediaType;
  const language = req.body.language;
  const year = req.body.year;

  // Check if keyword is undefined
  if (!keyword) {
    resData.message = "keyword query is missing";
    return res.status(400).json(resData);
  }

  // Split to tokens
  const keywordTokens = keyword.toLowerCase().split(" ");

  // Get all data
  const movies = Movie.all();
  const genres = Genre.all();

  // Filter videos by keywords
  let filteredMovies = movies.filter((movie) =>
    keywordTokens.every((token) => {
      // Create search string
      const title = movie.title || "";
      const overview = movie.overview || "";
      const searchStr = [title, overview].join(" ").toLowerCase();
      // Check if search string includes each token
      return searchStr.includes(token);
    })
  );

  // If route has genre query
  if (genre) {
    // Find genre
    const genreFound = genres.find((genre) => genre.name === genre);
    // If this genre exist
    if (genreFound) {
      // Get genreId
      const genreId = genreFound.id;
      // Filter movies
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.contains(genreId)
      );
    }
    // If this genre does not exist
    else filteredMovies = [];
  }

  // If route has mediaType query
  if (mediaType) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.media_type === mediaType
    );
  }

  // If route has language query
  if (language) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.original_language === language
    );
  }

  // If route has year query
  if (year) {
    filteredMovies = filteredMovies.filter(
      (movie) => new Date(movie.first_air_date).getFullYear() === Number(year)
    );
  }

  // Paging
  const paged = paging(page, 20, filteredMovies);

  // If page query is outer valid range
  if ((page <= 0 || page > paged.total_pages) && paged.total_pages !== 0) {
    resData.message = `The page query must be in range [1; ${paged.total_pages}]`;
    return res.status(400).json(resData);
  }

  // If every thing is fine
  resData.results = paged.results;
  resData.page = paged.page;
  resData.total_pages = paged.total_pages;
  return res.json(resData);
};
