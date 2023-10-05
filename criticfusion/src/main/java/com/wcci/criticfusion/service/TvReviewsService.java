package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.TvReviews;
import com.wcci.criticfusion.repository.TvReviewsRepository;

@Service
public class TvReviewsService{
    @Autowired
    private TvReviewsRepository reviewsRepository;
    public List<TvReviews> getAllTvReviews() {
    return reviewsRepository.findAll();
    }

    public TvReviews findTvReviewsById(long id) {
    return this.reviewsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public void addTvReview (TvReviews review){
    reviewsRepository.save(review);
  }

  public TvReviews updateTvReview(long id, TvReviews updatedReviews) {
    TvReviews exsistingReviews = findTvReviewsById(id);
 exsistingReviews.setReview(updatedReviews.getReview() == null ? exsistingReviews.getReview() : updatedReviews.getReview());
 exsistingReviews.setRating(updatedReviews.getRating());
  this.reviewsRepository.save(exsistingReviews); 
  return exsistingReviews;
}

public void deleteTvReview(long id) {
  this.reviewsRepository.deleteById(id);
}
}