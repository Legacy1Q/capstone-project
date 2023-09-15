package com.wcci.criticfusion.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wcci.criticfusion.entity.TV;
import com.wcci.criticfusion.repository.TVRepository;

@Service

public class TVService {

  @Autowired
  private TVRepository tvRepository;

  public List<TV> findAllTV() {
  return tvRepository.findAll();
  }

  public void addTV (TV tv){
    tvRepository.save(tv);
  }



}
