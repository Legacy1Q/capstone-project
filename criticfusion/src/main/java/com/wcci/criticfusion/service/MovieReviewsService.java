package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.MovieReviews;
import com.wcci.criticfusion.repository.MovieReviewsRepository;

@Service
public class MovieReviewsService{
    @Autowired
    private MovieReviewsRepository reviewsRepository;
    public List<MovieReviews> getAllReviews() {
    return reviewsRepository.findAll();
    }

    public MovieReviews findReviewsById(long id) {
    return this.reviewsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public MovieReviews addReview (MovieReviews review){
    return reviewsRepository.save(review);
  }

  public MovieReviews updateReview(long id, MovieReviews updatedReviews) {
    MovieReviews exsistingReviews = findReviewsById(id);
 exsistingReviews.setReview(updatedReviews.getReview() == null ? exsistingReviews.getReview() : updatedReviews.getReview());
 exsistingReviews.setRating(updatedReviews.getRating());
  this.reviewsRepository.save(exsistingReviews); 
  return exsistingReviews;
}

public void deleteReview(long id) {
  this.reviewsRepository.deleteById(id);
}
}