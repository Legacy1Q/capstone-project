package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.entity.Movie;
import com.wcci.criticfusion.service.MovieService;

@RestController

public class MovieController {

    @Autowired

    MovieService movieService;

    @GetMapping("/movies")
    public List<Movie> getAllMovie() {
        return movieService.findAllMovie();
    }

    @GetMapping("/movies/{id}")
  public Movie getMovieById(@PathVariable long id) {
    return movieService.findMoviesById(id);
  }

    @PostMapping("/addMovie")
    public void addMovie(@RequestBody Movie movie) {

        movieService.addMovie(movie);
    }

    @PutMapping("/updateMovie/{id}")
  public Movie updateMovie(@PathVariable long id, @RequestBody Movie movies) {
    return this.movieService.updateMovie(id, movies);
  }

  @DeleteMapping("/deleteMovie/{id}")
  public void deleteMovie(@PathVariable long id) {
    this.movieService.deleteMovie(id);
  }



}