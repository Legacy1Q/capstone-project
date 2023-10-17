package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.dto.AdminDto;
import com.wcci.criticfusion.dto.LoginDto;
import com.wcci.criticfusion.entity.Admin;
import com.wcci.criticfusion.response.LoginResponse;
import com.wcci.criticfusion.service.AdminService;

@RestController
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/admins")
    public List<Admin> findAllAdmin() {
        return adminService.getAllAdmin();
    }

    @GetMapping("/admin/{id}")
    public Admin findAdminById(@PathVariable long id) {
        return adminService.findAdminById(id);
    }

    @PutMapping("/admin/{id}")
    public Admin updateAdmin(@PathVariable long id, @RequestBody AdminDto adminDto) {
        return adminService.updateAdmin(id, adminDto);
    }

    @DeleteMapping("/admin/{id}")
    public void deleteAdmin(@PathVariable long id) {
        adminService.deleteAdmin(id);
    }
    @PostMapping("/addAdmin")
    public ResponseEntity<?> addAdmin(@RequestBody AdminDto adminDto) {
        LoginResponse loginResponse = adminService.addAdmin(adminDto);
        return ResponseEntity.ok(loginResponse);
        // return adminDto;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginDto loginDto) {
        LoginResponse loginResponse = adminService.loginAdmin(loginDto);
        return ResponseEntity.ok(loginResponse);
    }
}
