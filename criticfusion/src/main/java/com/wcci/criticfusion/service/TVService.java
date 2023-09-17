package com.wcci.criticfusion.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.TV;
import com.wcci.criticfusion.repository.TVRepository;

@Service

public class TVService {

  @Autowired
  private TVRepository tvRepository;

  public List<TV> findAllTV() {
  return tvRepository.findAll();
  }

  public TV findTVById(long id) {
    return this.tvRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public void addTV (TV tv) {
    tvRepository.save(tv);
  }

  public TV updateTV (long id, TV updatedTV) {
    TV existingTV = findTVById(id);
    existingTV.setTitle(updatedTV.getTitle() == null? existingTV.getTitle() : updatedTV.getTitle());
    existingTV.setDescription(updatedTV.getDescription() == null? existingTV.getDescription() : updatedTV.getDescription());
    existingTV.setGenre(updatedTV.getGenre() == null ? existingTV.getGenre() : updatedTV.getGenre());
    existingTV.setAgeRating(updatedTV.getAgeRating() == null ? existingTV.getAgeRating() : updatedTV.getAgeRating());
    existingTV.setTvViewing(updatedTV.getTvViewing() == null ? existingTV.getTvViewing() : updatedTV.getTvViewing());
    existingTV.setBrowseByLanguage(updatedTV.getBrowseByLanguage() == null ? existingTV.getBrowseByLanguage() : updatedTV.getBrowseByLanguage());
    existingTV.setActor(updatedTV.getActor() == null ? existingTV.getActor() : updatedTV.getActor());
    existingTV.setReleaseDate(updatedTV.getReleaseDate() == 0 ? existingTV.getReleaseDate() : updatedTV.getReleaseDate());
  this.tvRepository.save(existingTV);
  return existingTV;
 }

public void deleteTV(long id) {
  this.tvRepository.deleteById(id);
}




}
