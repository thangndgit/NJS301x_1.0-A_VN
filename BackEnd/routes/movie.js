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

// POST - Trailer of a specific movie
router.post("/api/movies/video", movieController.postTrailerOfMovie);

// POST - Search movies by keyword
router.post("/api/movies/search", movieController.postSearchMovies);

module.exports = router;
