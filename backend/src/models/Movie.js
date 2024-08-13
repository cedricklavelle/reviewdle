const mongoose = require('mongoose');

// Define the schema for reviews
const reviewSchema = new mongoose.Schema({
    review: {
      type: String,
      required: [true, 'Review is required'],  
    },
    hintNumber: {
      type: Number,
      required: [true, 'Hint number is required'],  
      min: [1, 'Hint number must be at least 1'],   
      max: [5, 'Hint number must be at most 5']    
    }
  });
  
  // Define the schema for movies
  const movieSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Movie name is required'],
    },
    moviePoster: {
        type: String,
        required: [true, 'Movie poster location is required'],
      },
    dailyDate: {
      type: String,
      required: [true, 'Daily date is required'],
      unique: true,
      validate: {
        validator: function(value) {
          // Regular expression to match YYYY-MM-DD format
          return /^\d{4}-\d{2}-\d{2}$/.test(value);
        },
        message: 'Daily date must be in the format YYYY-MM-DD'
      }
    },
    reviews: {
      type: [reviewSchema],
      validate: {
        validator: function(reviews) {
          return reviews.length === 5; // Ensure exactly 5 reviews
        },
        message: 'The reviews array must contain exactly 5 reviews.'
      },
      required: true
    }
  });

const Movie = mongoose.model('Movie', movieSchema, "movies");

module.exports = Movie;
