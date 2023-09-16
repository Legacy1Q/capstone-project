package com.wcci.criticfusion.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

@Entity
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;


  public Reviews() {
  }

  public Reviews(String title, String review, int rating) {
    this.title = title;
    this.review = review;
    this.rating = rating;
  }

    private String title;
    private String review;
    private int rating;
    public Long getId() {
      return Id;
    }
    public void setId(Long id) {
      this.Id = id;
    }
    public String getTitle() {
      return title;
    }
    public void setTitle(String title) {
      this.title = title;
    }
    public String getReview() {
      return review;
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
}
