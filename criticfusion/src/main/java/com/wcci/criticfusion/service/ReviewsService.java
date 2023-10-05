package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import com.wcci.criticfusion.entity.Reviews;
import com.wcci.criticfusion.repository.ReviewsRepository;

@Service
public class ReviewsService{
    @Autowired
    private ReviewsRepository reviewsRepository;
    public List<Reviews> getAllReviews() {
    return reviewsRepository.findAll();
    }

    public Reviews findReviewsById(long id) {
    return this.reviewsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public void addReview (Reviews review){
    reviewsRepository.save(review);
  }

  public Reviews updateReview(long id, Reviews updatedReviews) {
    Reviews exsistingReviews = findReviewsById(id);
  exsistingReviews.setTitle(updatedReviews.getTitle() == null ? exsistingReviews.getTitle() : updatedReviews.getTitle());
 exsistingReviews.setReview(updatedReviews.getReview() == null ? exsistingReviews.getReview() : updatedReviews.getReview());
 exsistingReviews.setRating(updatedReviews.getRating());
  this.reviewsRepository.save(exsistingReviews); 
  return exsistingReviews;
}

public void deleteReview(long id) {
  this.reviewsRepository.deleteById(id);
}
}