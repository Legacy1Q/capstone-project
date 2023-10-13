package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.Movie;
import com.wcci.criticfusion.repository.MovieRepository;

@Service

public class MovieService {

  @Autowired
  private MovieRepository movieRepository;

  public List<Movie> findAllMovie() {
  return movieRepository.findAll();
  }

  public Movie findMoviesById(long id) {
    return this.movieRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public Movie addMovie (Movie Movie){
    return movieRepository.save(Movie);
  }

  public Movie updateMovie(long id, Movie updatedMovies) {
  Movie exsistingMovies = findMoviesById(id);
  exsistingMovies.setTitle(updatedMovies.getTitle() == null ? exsistingMovies.getTitle() : updatedMovies.getTitle());
 exsistingMovies.setDescription(updatedMovies.getDescription() == null ? exsistingMovies.getDescription() : updatedMovies.getDescription());
 exsistingMovies.setTrailerUrl(updatedMovies.getTrailerUrl() == null ? exsistingMovies.getTrailerUrl() : updatedMovies.getTrailerUrl());
 exsistingMovies.setImageFilename(updatedMovies.getImageFilename() == null ? exsistingMovies.getImageFilename() : updatedMovies.getImageFilename());
 exsistingMovies.setAgeRating(updatedMovies.getAgeRating() == null ? exsistingMovies.getAgeRating() : updatedMovies.getAgeRating());
 exsistingMovies.setMovieSystem(updatedMovies.getMovieSystem() == null ? exsistingMovies.getMovieSystem() : updatedMovies.getMovieSystem());
 exsistingMovies.setBrowseByLanguage(updatedMovies.getBrowseByLanguage() == null ? exsistingMovies.getBrowseByLanguage() : updatedMovies.getBrowseByLanguage());
 exsistingMovies.setActor(updatedMovies.getActor() == null ? exsistingMovies.getActor() : updatedMovies.getActor());
 exsistingMovies.setStudio(updatedMovies.getStudio() == null ? exsistingMovies.getStudio() : updatedMovies.getStudio());
 exsistingMovies.setReleaseDate(updatedMovies.getReleaseDate() == 0 ? exsistingMovies.getReleaseDate() : updatedMovies.getReleaseDate());

  this.movieRepository.save(exsistingMovies); 

  return exsistingMovies;
}

public void deleteMovie(long id) {
  this.movieRepository.deleteById(id);
}
}
