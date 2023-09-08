package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MoviesController {
    
    @Autowired
    MoviesService moviesService;

    @GetMapping("/movies")
    public List<Movies> findAllMovies() {
        return this.moviesService.getAllMovies();
    }

    @GetMapping("/movies/{title}")
    public Movies findMoviesByTitle(@PathVariable long title) {
        return this.moviesService.getMoviesByTitle(title);
    }

    @GetMapping("/movies/{genre}")
    public List<Movies> findMoviesByGenre(@PathVariable String genre) {
        return this.moviesService.getMovieByGenre(genre);
    }

    @PostMapping("/addMovies")
    public void addMovies(@RequestBody Movies movies) {
        this.moviesService.addMovies(movies);
    }

    @PutMapping("/movies/{id}")
    public Movies modifyMovies(@PathVariable long id, @RequestBody Movies updatedMovies) {
        return this.moviesService.updateMovies(id, updatedMovies);
    }

    @DeleteMapping("/deleteMovies/{id}")
    public void removeMovies(@PathVariable long id) {
        this.moviesService.deleteMovies(id);
    }
}