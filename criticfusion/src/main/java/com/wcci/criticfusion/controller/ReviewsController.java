package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.entity.Reviews;
import com.wcci.criticfusion.service.ReviewsService;

@RestController
public class ReviewsController {
    @Autowired
    private ReviewsService reviewsService;

    @GetMapping("/reviews")
    public List<Reviews> findAllReviews() {
        return reviewsService.getAllReviews();
    }
}