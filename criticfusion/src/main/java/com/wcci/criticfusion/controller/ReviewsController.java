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

import com.wcci.criticfusion.entity.Reviews;
import com.wcci.criticfusion.service.ReviewsService;

@RestController
public class ReviewsController {
    @Autowired
    private ReviewsService reviewsService;

    @GetMapping("/reviews")
    public List<Reviews> findAllReviews() {
        return reviewsService.getAllReviews();
    }

    @GetMapping("/review/{id}")
  public Reviews getReviewById(@PathVariable long id) {
    return reviewsService.findReviewsById(id);
  }

    @PostMapping("/addReview")
    public void addReview(@RequestBody Reviews review) {

        reviewsService.addReview(review);
    }

    @PutMapping("/updateReview/{id}")
  public Reviews updateReview(@PathVariable long id, @RequestBody Reviews reviews) {
    return this.reviewsService.updateReview(id, reviews);
  }

  @DeleteMapping("/deleteReview/{id}")
  public void deleteReview(@PathVariable long id) {
    this.reviewsService.deleteReview(id);
  }
}