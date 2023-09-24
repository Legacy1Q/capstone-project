package com.wcci.criticfusion.entity;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;

@Entity
public class Reviews {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private Long Id;
  private String title;
  private String review;
  private int rating;
  @ManyToOne
  private Cart cart;
  @ManyToOne
  private Games games;
  @ManyToOne
  private Movie movie;
  @ManyToOne
  private TV tv;

  public Reviews() {
  }

  public Reviews(String title, String review, int rating) {
    this.title = title;
    this.review = review;
    this.rating = rating;
  }

  public Long getId() {
    return this.Id;
  }

  public void setId(Long Id) {
    this.Id = Id;
  }

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
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

  public Cart getCart() {
    return this.cart;
  }

  public void setCart(Cart cart) {
    this.cart = cart;
  }

  public Games getGames() {
    return this.games;
  }

  public void setGames(Games games) {
    this.games = games;
  }

  public Movie getMovie() {
    return this.movie;
  }

  public void setMovie(Movie movie) {
    this.movie = movie;
  }

  public TV getTv() {
    return this.tv;
  }

  public void setTv(TV tv) {
    this.tv = tv;
  }

}
