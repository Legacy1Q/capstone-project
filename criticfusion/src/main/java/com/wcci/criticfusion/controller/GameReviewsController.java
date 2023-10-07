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

import com.wcci.criticfusion.entity.GameReviews;
import com.wcci.criticfusion.service.GameReviewsService;

@RestController
public class GameReviewsController {
    @Autowired
    private GameReviewsService reviewsService;

    @GetMapping("/gameReviews")
    public List<GameReviews> findAllGameReviews() {
        return reviewsService.getAllGameReviews();
    }

    @GetMapping("/gameReview/{id}")
  public GameReviews getGameReviewById(@PathVariable long id) {
    return reviewsService.findGameReviewsById(id);
  }

    @PostMapping("/addGameReview")
    public GameReviews addGameReview(@RequestBody GameReviews review) {

        return reviewsService.addGameReview(review);
    }

    @PutMapping("/updateGameReview/{id}")
  public GameReviews updateGameReview(@PathVariable long id, @RequestBody GameReviews reviews) {
    return this.reviewsService.updateGameReview(id, reviews);
  }

  @DeleteMapping("/deleteGameReview/{id}")
  public void deleteGameReview(@PathVariable long id) {
    this.reviewsService.deleteGameReview(id);
  }
}