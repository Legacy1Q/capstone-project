package com.wcci.criticfusion.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.wcci.criticfusion.entity.Merch;
import com.wcci.criticfusion.service.MerchService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class MerchController {

  @Autowired
  MerchService merchService;
  
  @GetMapping("/merch")
  public List<Merch> getAllMerch() {
    return merchService.findAllMerch();
  }

  @GetMapping("/merch/{id}")
  public Merch getMerchById(@PathVariable long id) {
    return merchService.findMerchById(id);
  }

  @PostMapping("/addMerch")
  public Merch addMerch (@RequestBody Merch merch) {
    return merchService.addMerch(merch);
  }

  @PutMapping("/updateMerch/{id}")
  public Merch updateMerch(@PathVariable long id, @RequestBody Merch merch) {
    return this.merchService.updateMerch(id, merch);
  }

  @DeleteMapping("/deleteMerch/{id}")
  public void deleteMerch(@PathVariable long id) {
    this.merchService.deleteMerch(id);
  }

}
