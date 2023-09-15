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

  public void addTV (TV tv){
    tvRepository.save(tv);
  }

 public TV updateTV (long id, TV updatedDetails) {
  TV exsistingTV = findTVById(id);
  exsistingTV.setTitle(updatedDetails.getTitle() == null? exsistingTV.getTitle() : updatedDetails.getTitle());
  exsistingTV.setDescription(updatedDetails.getDescription() == null? exsistingTV.getDescription() : updatedDetails.getDescription());
  this.tvRepository.save(exsistingTV);
  return exsistingTV;
 }

public void deleteTV(long id) {
  this.tvRepository.deleteById(id);
}




}
