package com.wcci.criticfusion.response;

public class LoginResponse {
    private String message;
    private boolean status;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean getStatus() {
        return this.status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LoginResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }
    
}