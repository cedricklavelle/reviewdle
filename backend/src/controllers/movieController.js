const Movie = require('../models/Movie');
const mongoose = require('mongoose');

const addMovie = async (req, res) => {
    try {
      const { name, dailyDate, reviews, moviePoster } = req.body;
  
      // Create a new movie document
      const newMovie = new Movie({ name, dailyDate, reviews, moviePoster });
  
      // Save the document
      await newMovie.save();
  
      res.status(201).json(newMovie);
    } catch (error) {
      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Movie with this date already exists' });
      }
      else if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }
  
      console.error('Error saving movie:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

const getMovies = async (req, res) => {
    try {
      const movies = await Movie.find(); // Retrieves all movie documents from the collection
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error retrieving movies:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Function to get movies by date
const getMovieByDate = async (req, res) => {
    try {
      const { date } = req.params;
  
      // Find one movie by date
      const movie = await Movie.findOne({ dailyDate: date });
  
      // Handle case where no movie is found
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found for the given date' });
      }
  
      // Respond with the movie data
      res.status(200).json(movie);
    } catch (error) {
      // Handle server errors
      console.error('Error retrieving movie by date:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Function to get a movie by ID
  const getMovieById = async (req, res) => {
    try {
      // Extract the ID from request parameters
      const { id } = req.params;

      // Validate the ObjectID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid movie ID format' });
      }
  
      // Find the movie by ID
      const movie = await Movie.findById(id);
  
      // Handle case where no movie is found
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      // Respond with the movie data
      res.status(200).json(movie);
    } catch (error) {
      // Handle server errors
      console.error('Error retrieving movie by ID:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const deleteById = async (req, res) => {
    try {
      const id = req.params.id;
      console.log("deleting movie with id " + id)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid movie ID format' });
      }
      const result = await Movie.findByIdAndDelete(id);
      if (result) {
        res.status(200).json({ message: 'Document deleted', data: result });
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    } catch (error) {
        console.error('Error deleting movie:', error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
          }
        res.status(500).json({ message: ' An unexpected error deleting document'});
    }
  };

  const updateById = async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body; 
      const options = { new: true }; 

      console.log('ID:', id);
      console.log('Update:', update);
  
      const result = await Movie.findByIdAndUpdate(id, update, options);
  
      if (result) {
        res.status(200).json({ message: 'Document updated', data: result });
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Unexpected error during update'});
    }
  };

module.exports = {
  addMovie,
  getMovies,
  getMovieById,
  getMovieByDate,
  deleteById,
  updateById
};
