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
public class TV {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private Long Id;

  private String title;
  private String description;
  private String genre;
  private String ageRating;
  private int byDecade;
  private String actor;
  private int releaseDate;
  private String tvViewing;
  private String browseByLanguage;

  @JsonIgnore
  @OneToMany(mappedBy = "tv", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Reviews> reviews;

  public TV() {
  }

  public TV(String title, String description, String genre, String ageRating, int byDecade, String actor,
      int releaseDate, String tvViewing, String browseByLanguage) {
    this.title = title;
    this.description = description;
    this.genre = genre;
    this.ageRating = ageRating;
    this.byDecade = byDecade;
    this.actor = actor;
    this.releaseDate = releaseDate;
    this.tvViewing = tvViewing;
    this.browseByLanguage = browseByLanguage;
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

  public String getGenre() {
    return this.genre;
  }

  public void setGenre(String genre) {
    this.genre = genre;
  }

  public String getAgeRating() {
    return this.ageRating;
  }

  public void setAgeRating(String ageRating) {
    this.ageRating = ageRating;
  }

  public int getByDecade() {
    return this.byDecade;
  }

  public void setByDecade(int byDecade) {
    this.byDecade = byDecade;
  }

  public String getActor() {
    return this.actor;
  }

  public void setActor(String actor) {
    this.actor = actor;
  }

  public int getReleaseDate() {
    return this.releaseDate;
  }

  public void setReleaseDate(int releaseDate) {
    this.releaseDate = releaseDate;
  }

  public String getTvViewing() {
    return this.tvViewing;
  }

  public void setTvViewing(String tvViewing) {
    this.tvViewing = tvViewing;

  }

  public String getBrowseByLanguage() {
    return this.browseByLanguage;
  }

  public void setBrowseByLanguage(String browseByLanguage) {
    this.browseByLanguage = browseByLanguage;
  }

}