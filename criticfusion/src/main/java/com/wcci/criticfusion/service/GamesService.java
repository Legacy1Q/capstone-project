package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.Game;
import com.wcci.criticfusion.repository.GamesRepository;

@Service

public class GamesService {

  @Autowired
  private GamesRepository gamesRepository;

  public List<Game> findAllGames() {
  return gamesRepository.findAll();
  }

  public Game findGamesById(long id) {
    return this.gamesRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public Game addGames (Game games){
    return gamesRepository.save(games);
  }

public Game updateGame(long id, Game updatedGames) {
  Game exsistingGames = findGamesById(id);
  exsistingGames.setTitle(updatedGames.getTitle() == null ? exsistingGames.getTitle() : updatedGames.getTitle());
  exsistingGames.setDescription(updatedGames.getDescription() == null ? exsistingGames.getDescription() : updatedGames.getDescription());
  exsistingGames.setImageFilename(updatedGames.getImageFilename() == null ? exsistingGames.getImageFilename() : updatedGames.getImageFilename());
  exsistingGames.setTrailerUrl(updatedGames.getTrailerUrl() == null ? exsistingGames.getTrailerUrl() : updatedGames.getTrailerUrl());
  this.gamesRepository.save(exsistingGames);
  return exsistingGames;
}

public void deleteGame(long id) {
  this.gamesRepository.deleteById(id);
}
}
