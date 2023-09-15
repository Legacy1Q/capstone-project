package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.criticfusion.entity.Cart;
import com.wcci.criticfusion.service.CartService;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/cart")
    public List<Cart> findAllRCart() {
        return cartService.getAllCart();
    }
}