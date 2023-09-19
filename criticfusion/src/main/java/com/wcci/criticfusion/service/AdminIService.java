package com.wcci.criticfusion.service;

import com.wcci.criticfusion.dto.AdminDto;
import com.wcci.criticfusion.dto.LoginDto;
import com.wcci.criticfusion.response.LoginResponse;

public interface AdminIService {
    String addAdmin(AdminDto adminDto);
    LoginResponse loginAdmin(LoginDto loginDto);
}
