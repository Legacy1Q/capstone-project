package com.wcci.criticfusion.entity;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;

@Entity
public class MovieReviews {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private Long Id;
  private String review;
  private int rating;
  @ManyToOne
  private Movie movie;

  public MovieReviews() {
  }

  public MovieReviews(String review, int rating) {
    this.review = review;
    this.rating = rating;
  }

  public Long getId() {
    return this.Id;
  }

  public void setId(Long Id) {
    this.Id = Id;
  }

  public String getReview() {
    return this.review;
  }

  public void setReview(String review) {
    this.review = review;
  }

  public int getRating() {
    return this.rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public Movie getMovie() {
    return this.movie;
  }

  public void setMovie(Movie movie) {
    this.movie = movie;
  }
}
