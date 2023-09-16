package com.wcci.criticfusion.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.Games;
import com.wcci.criticfusion.entity.TV;
import com.wcci.criticfusion.repository.GamesRepository;

@Service

public class GamesService {

  @Autowired
  private GamesRepository gamesRepository;

  public List<Games> findAllGames() {
  return gamesRepository.findAll();
  }

  public Games findGamesById(long id) {
    return this.gamesRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public void addGames (Games games){
    gamesRepository.save(games);
  }

public Games updateGame(long id, Games updatedGames) {
  Games exsistingGames = findGamesById(id);
  exsistingGames.setTitle(updatedGames.getTitle() == null ? exsistingGames.getTitle() : updatedGames.getTitle());
  exsistingGames.setDescription(updatedGames.getDescription() == null ? exsistingGames.getDescription() : updatedGames.getDescription());
  this.gamesRepository.save(exsistingGames);
  return exsistingGames;
}

public void deleteGame(long id) {
  this.gamesRepository.deleteById(id);
}



}
