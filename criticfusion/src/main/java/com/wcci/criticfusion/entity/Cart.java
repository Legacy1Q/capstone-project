package com.wcci.criticfusion.entity;

import java.util.List;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GenerationType;

@Entity
public class Cart {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private Long Id;
  private String title;
  private String description;
  
  @JsonIgnore
  @OneToMany (mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
  private List <Reviews> reviews;

  public Cart() {
  }

  public Cart(String title, String description) {
    this.title = title;
    this.description = description;
  }

  public List<Reviews> getReviews() {
    return this.reviews;
  }

  public void setReviews(List<Reviews> reviews) {
    this.reviews = reviews;
  }

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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

}