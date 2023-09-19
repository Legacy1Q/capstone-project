package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.dto.AdminDto;
import com.wcci.criticfusion.dto.LoginDto;
import com.wcci.criticfusion.entity.Admin;
import com.wcci.criticfusion.repository.AdminRepository;
import com.wcci.criticfusion.response.LoginResponse;

@Service
public class AdminService implements AdminIService{

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Admin> getAllAdmin() {
    return adminRepository.findAll();
    }

    public Admin findAdminById(long id) {
    return this.adminRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

 public Admin updateAdmin (long id, AdminDto updatedAdminDto) {
  Admin existingAdmin = findAdminById(id);
  existingAdmin.setFullName(updatedAdminDto.getFullName() == null? existingAdmin.getFullName() : updatedAdminDto.getFullName());
  existingAdmin.setEmail(updatedAdminDto.getEmail() == null? existingAdmin.getEmail() : updatedAdminDto.getEmail());
  existingAdmin.setPassword(updatedAdminDto.getPassword() == null? existingAdmin.getPassword() : updatedAdminDto.getPassword());
  this.adminRepository.save(existingAdmin);
  return existingAdmin;
 }

    public void deleteAdmin(long id) {
      this.adminRepository.deleteById(id);
    }

    @Override
    public String addAdmin(AdminDto adminDto) {
        Admin admin = new Admin(
            adminDto.getFullName(),
            adminDto.getEmail(),
            this.passwordEncoder.encode(adminDto.getPassword())
            );
        adminRepository.save(admin);
        return admin.getFullName();
    }

    @Override
    public LoginResponse loginAdmin(LoginDto loginDto) {
        Admin admin = adminRepository.findByEmail(loginDto.getEmail());
        if(admin != null) {
            String password = loginDto.getPassword();
            String encodedPassword = admin.getPassword();
            if(passwordEncoder.matches(password, encodedPassword)) {
                return new LoginResponse("Login Success!", true);
            }
            else {
                return new LoginResponse("Password is incorrect!", false);
            }
        }
        else {
            return new LoginResponse("Email does not exist!", false);
        }
    }
}
