package com.wcci.criticfusion.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

@Entity
public class TV {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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