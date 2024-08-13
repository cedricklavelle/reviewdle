const express = require('express');
const { addMovie, getMovies, getMovieByDate, getMovieById, deleteById, updateById } = require('../controllers/movieController');
const bodyParser = require('body-parser')


var jsonParser = bodyParser.json()
const router = express.Router();

router.post('/movies', jsonParser, (req, res, next) => {
    console.log('Request body:', req.body); // Log the request body
    next();
  }, addMovie);

// Route to get all movies
router.get('/movies', getMovies);

// Route to get movies by date
router.get('/movies/date/:date', getMovieByDate);

// Route to get a movie by ID
router.get('/movies/:id', getMovieById);

router.delete('/movies/:id', deleteById);
router.patch('/movies/:id', jsonParser, (req, res, next) => {
    console.log('Request body:', req.body); // Log the request body
    next();
  }, addMovie);


module.exports = router;
