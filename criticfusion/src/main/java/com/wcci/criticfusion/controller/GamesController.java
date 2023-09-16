package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.entity.Games;
import com.wcci.criticfusion.service.GamesService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController

public class GamesController {

  @Autowired

  GamesService gamesService;
  
  @GetMapping("/games")
  public List<Games> getAllGames() {
    return gamesService.findAllGames();
  }

  @GetMapping("/games/{id}")
  public Games getGameById(@PathVariable long id) {
    return gamesService.findGamesById(id);
  }

  @PostMapping("/addGame")
  public void addGames (@RequestBody Games games) {
  gamesService.addGames(games);
  }

  @PutMapping("/updateGame/{id}")
  public Games updateGame(@PathVariable long id, @RequestBody Games games) {
    return this.gamesService.updateGame(id, games);
  }

  @DeleteMapping("/deleteGame/{id}")
  public void deleteGame(@PathVariable long id) {
    this.gamesService.deleteGame(id);
  }
}
