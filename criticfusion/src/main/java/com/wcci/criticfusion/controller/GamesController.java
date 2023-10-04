package com.wcci.criticfusion.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import com.wcci.criticfusion.entity.Games;
import com.wcci.criticfusion.service.GamesService;


import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class GamesController {

  @Value("${image.upload.directory}")
    private String imageUploadDirectory;

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

  @PostMapping("/upload")
  public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
      try {
          String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
          Path filePath = Paths.get(imageUploadDirectory, filename);
          Files.write(filePath, file.getBytes());
          return ResponseEntity.ok("Image uploaded successfully!");
      } catch (IOException e) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed.");
      }
  }

  @GetMapping("/images/{filename}")
public ResponseEntity<Resource> getImage(@PathVariable String filename) {
    try {
        Path imagePath = Paths.get(imageUploadDirectory, filename);
        Resource imageResource = new UrlResource(imagePath.toUri());

        if (imageResource.exists() && imageResource.isReadable()) {
            return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageResource);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (MalformedURLException e) {
        return ResponseEntity.notFound().build();
    }
}

@PostMapping("/uploadAndAddGame")
public ResponseEntity<String> uploadImageAndAddGame(
    @RequestParam("file") MultipartFile file,
    @RequestParam("title") String title,
    @RequestParam("description") String description
) {
    try {
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(imageUploadDirectory, filename);
        Files.write(filePath, file.getBytes());
        
        Games games = new Games();
        games.setTitle(title);
        games.setDescription(description);
        games.setImageFilename(filename);
        
        gamesService.addGames(games);
        
        return ResponseEntity.ok("Image uploaded and game added successfully!");
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed.");
    }
}

}
