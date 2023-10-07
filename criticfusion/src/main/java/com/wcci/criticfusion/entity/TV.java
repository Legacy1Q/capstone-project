package com.wcci.criticfusion.entity;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

@Entity
public class Tv {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private Long Id;

  private String title;
  private String description;
  private String trailerUrl;
  private String ageRating;
  private int byDecade;
  private String actor;
  private int releaseDate;
  private String tvViewing;
  private String browseByLanguage;

  public Tv() {
  }

  public Tv(String title, String description, String trailerUrl, String ageRating, int byDecade, String actor,
      int releaseDate, String tvViewing, String browseByLanguage) {
    this.title = title;
    this.description = description;
    this.trailerUrl = trailerUrl;
    this.ageRating = ageRating;
    this.byDecade = byDecade;
    this.actor = actor;
    this.releaseDate = releaseDate;
    this.tvViewing = tvViewing;
    this.browseByLanguage = browseByLanguage;
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

  public String getTrailerUrl() {
    return this.trailerUrl;
  }

  public void setTrailerUrl(String trailerUrl) {
    this.trailerUrl = trailerUrl;
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