package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import com.wcci.criticfusion.entity.Reviews;
import com.wcci.criticfusion.repository.ReviewsRepository;

@Service
public class ReviewsService{
    @Autowired
    private ReviewsRepository reviewsRepository;
    public List<Reviews> getAllReviews() {
    return reviewsRepository.findAll();
    }

}