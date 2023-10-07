package com.wcci.criticfusion.repository;

import com.wcci.criticfusion.entity.MovieReviews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieReviewsRepository extends JpaRepository<MovieReviews, Long> {


}