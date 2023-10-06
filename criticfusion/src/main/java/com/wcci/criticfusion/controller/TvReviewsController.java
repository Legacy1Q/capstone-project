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

import com.wcci.criticfusion.entity.TvReviews;
import com.wcci.criticfusion.service.TvReviewsService;

@RestController
public class TvReviewsController {
    @Autowired
    private TvReviewsService reviewsService;

    @GetMapping("/tvReviews")
    public List<TvReviews> findAllTvReviews() {
        return reviewsService.getAllTvReviews();
    }

    @GetMapping("/tvReview/{id}")
  public TvReviews getTvReviewById(@PathVariable long id) {
    return reviewsService.findTvReviewsById(id);
  }

    @PostMapping("/addTvReview")
    public void addTvReview(@RequestBody TvReviews review) {

        reviewsService.addTvReview(review);
    }

    @PutMapping("/updateTvReview/{id}")
  public TvReviews updateTvReview(@PathVariable long id, @RequestBody TvReviews reviews) {
    return this.reviewsService.updateTvReview(id, reviews);
  }

  @DeleteMapping("/deleteTvReview/{id}")
  public void deleteTvReview(@PathVariable long id) {
    this.reviewsService.deleteTvReview(id);
  }
}