package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.entity.Tv;
import com.wcci.criticfusion.service.TVService;

@RestController

public class TVController {

    @Autowired

    TVService tvService;

    @GetMapping("/tv")
    public List<Tv> getAllTV() {
        return tvService.findAllTV();
    }

    @GetMapping("/tv/{id}")
    public Tv getTVById(@PathVariable long id) {
    return tvService.findTVById(id);
    }

    @PostMapping("/addTv")
    public Tv addTV(@RequestBody Tv tv) {
        return tvService.addTV(tv);
    }

    @PutMapping("/updateTv/{id}")
    public Tv updateTV(@PathVariable long id, @RequestBody Tv tv) {
        return this.tvService.updateTV(id, tv);
    }

    @DeleteMapping("/deleteTv/{id}")
    public void removeTV(@PathVariable long id) {
        tvService.deleteTV(id);
    }

}