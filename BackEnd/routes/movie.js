// Import base
const express = require("express");

// Import controller
const movieController = require("../controllers/movie");

// Create router
const router = express.Router();

// GET - Trending movies
router.get("/api/movies/trending", movieController.getTrendingMovies);

// GET - Top rate movies
router.get("/api/movies/top-rate", movieController.getTopRateMovies);

// GET - Movies by genre
router.get("/api/movies/discover", movieController.getMoviesByGenre);

// GET - Trailer of a specific movie
router.get("/api/movies/video", movieController.getTrailerOfMovie);

// POST - Search movies by keyword
router.get("/api/movies/search", movieController.postSearchMovies);

module.exports = router;
