package com.wcci.criticfusion.repository;

import com.wcci.criticfusion.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamesRepository extends JpaRepository<Game, Long> {


}