package com.wcci.criticfusion.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wcci.criticfusion.entity.Movie;
import com.wcci.criticfusion.repository.MovieRepository;

@Service

public class MovieService {

  @Autowired
  private MovieRepository movieRepository;

  public List<Movie> findAllMovie() {
  return movieRepository.findAll();
  }

  public void addMovie (Movie movie){
    movieRepository.save(movie);
  }



}
