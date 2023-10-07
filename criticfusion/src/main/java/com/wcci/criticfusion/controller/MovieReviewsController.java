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

import com.wcci.criticfusion.entity.MovieReviews;
import com.wcci.criticfusion.service.MovieReviewsService;

@RestController
public class MovieReviewsController {
    @Autowired
    private MovieReviewsService reviewsService;

    @GetMapping("/movieReviews")
    public List<MovieReviews> findAllReviews() {
        return reviewsService.getAllReviews();
    }

    @GetMapping("/movieReview/{id}")
  public MovieReviews getReviewById(@PathVariable long id) {
    return reviewsService.findReviewsById(id);
  }

    @PostMapping("/addMovieReview")
    public MovieReviews addReview(@RequestBody MovieReviews review) {

        return reviewsService.addReview(review);
    }

    @PutMapping("/updateMovieReview/{id}")
  public MovieReviews updateReview(@PathVariable long id, @RequestBody MovieReviews reviews) {
    return this.reviewsService.updateReview(id, reviews);
  }

  @DeleteMapping("/deleteMovieReview/{id}")
  public void deleteReview(@PathVariable long id) {
    this.reviewsService.deleteReview(id);
  }
}