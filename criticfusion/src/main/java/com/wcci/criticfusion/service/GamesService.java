package com.wcci.criticfusion.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wcci.criticfusion.entity.Games;
import com.wcci.criticfusion.repository.GamesRepository;

@Service

public class GamesService {

  @Autowired
  private GamesRepository gamesRepository;

  public List<Games> findAllGames() {
  return gamesRepository.findAll();
  }

  public void addGames (Games games){
    gamesRepository.save(games);
  }



}
