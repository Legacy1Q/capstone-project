package com.wcci.criticfusion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/carts/{id}")
    public Cart getCartById(@PathVariable long id) {
    return cartService.findCartById(id);
    }

    @PostMapping("/addCart")
    public void addCart(@RequestBody Cart cart) {

        cartService.addCart(cart);

    }

        @PutMapping("/updateCart/{id}")
    public Cart updateCart(@PathVariable long id, @RequestBody Cart cart) {
        return this.cartService.updateCart(id, cart);
    }

    @DeleteMapping("/deleteCart/{id}")
    public void removeTV(@PathVariable long id) {
        this.cartService.deleteCart(id);
    }
}