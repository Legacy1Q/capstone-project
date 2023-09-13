package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.entity.Movie;
import com.wcci.criticfusion.service.MovieService;

@RestController

public class MovieController {

    @Autowired

    MovieService movieService;

    @GetMapping("/movie")
    public List<Movie> getAllMovie() {
        return movieService.findAllMovie();
    }

    @PostMapping("/addMovie")
    public void addMovie(@RequestBody Movie movie) {

        movieService.addMovie(movie);

    }

}