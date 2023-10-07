package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.GameReviews;
import com.wcci.criticfusion.repository.GameReviewsRepository;

@Service
public class GameReviewsService{
    @Autowired
    private GameReviewsRepository reviewsRepository;
    public List<GameReviews> getAllGameReviews() {
    return reviewsRepository.findAll();
    }

    public GameReviews findGameReviewsById(long id) {
    return this.reviewsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public GameReviews addGameReview (GameReviews review){
    return reviewsRepository.save(review);
  }

  public GameReviews updateGameReview(long id, GameReviews updatedReviews) {
    GameReviews exsistingReviews = findGameReviewsById(id);
 exsistingReviews.setReview(updatedReviews.getReview() == null ? exsistingReviews.getReview() : updatedReviews.getReview());
 exsistingReviews.setRating(updatedReviews.getRating());
  this.reviewsRepository.save(exsistingReviews); 
  return exsistingReviews;
}

public void deleteGameReview(long id) {
  this.reviewsRepository.deleteById(id);
}
}