package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.entity.Games;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GamesController {
    
    @Autowired
    GamesService gamesService;

    @GetMapping("/games")
    public List<Games> findAllGames() {
        return this.gamesService.getAllGames();
    }

    @GetMapping("/games/{title}")
    public Games findGamesByTitle(@PathVariable long title) {
        return this.gamesService.getGamesByTitle(title);
    }

    @GetMapping("/game/{devStudio}")
    public List<Games> findGameByStudioName(@PathVariable String studioName) {
        return this.gamesService.getGameByStudioName(studioName);
    }

    @PostMapping("/addGames")
    public void addGames(@RequestBody Games games) {
        this.gamesService.addGames(games);
    }

    @PutMapping("/games/{id}")
    public Games modifyGames(@PathVariable long id, @RequestBody Games updatedGames) {
        return this.gamesService.updateGames(id, updatedGames);
    }

    @DeleteMapping("/deleteGames/{id}")
    public void removeGames(@PathVariable long id) {
        this.gamesService.deleteGames(id);
    }
}