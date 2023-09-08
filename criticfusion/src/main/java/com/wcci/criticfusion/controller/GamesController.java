package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.entity.Games;
import com.wcci.criticfusion.service.GamesService;

@RestController

public class GamesController {

  @Autowired

  GamesService gamesService;
  
  @GetMapping("/games")
      public List<Games> getAllGames() {
        return gamesService.findAllGames();
      }

  @PostMapping("/addGames")
  public void addGames (@RequestBody Games games) {

  gamesService.addGames(games);

  }



}
