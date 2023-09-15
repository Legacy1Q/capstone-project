package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import com.wcci.criticfusion.entity.Cart;
import com.wcci.criticfusion.repository.CartRepository;

@Service
public class CartService{
    @Autowired
    private CartRepository cartRepository;
    public List<Cart> getAllCart() {
    return cartRepository.findAll();
    }
}