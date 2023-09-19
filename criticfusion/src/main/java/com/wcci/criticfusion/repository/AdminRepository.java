package com.wcci.criticfusion.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wcci.criticfusion.entity.Admin;

@Repository
public interface AdminRepository  extends JpaRepository<Admin, Long>{
    // Optional<Admin> findAdminByEmailAndPassword(String email, String password);
    Admin findByEmail(String email);
}
