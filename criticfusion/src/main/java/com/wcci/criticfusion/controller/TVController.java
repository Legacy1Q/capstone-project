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

import com.wcci.criticfusion.entity.TV;
import com.wcci.criticfusion.service.TVService;

@RestController

public class TVController {

    @Autowired

    TVService tvService;

    @GetMapping("/tv")
    public List<TV> getAllTV() {
        return tvService.findAllTV();
    }

    @PostMapping("/addTV")
    public void addTV(@RequestBody TV tv) {

        tvService.addTV(tv);

    }

    @PutMapping("/updateTV/{id}")
    public TV updateTV(@PathVariable long id, @RequestBody TV tv) {
        return this.tvService.updateTV(id, tv);
    }

    @DeleteMapping("/deleteTV/{id}")
    public void removeTV(@PathVariable long id) {
        this.tvService.deleteTV(id);
    }

}