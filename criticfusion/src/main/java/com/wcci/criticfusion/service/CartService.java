package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.Cart;
import com.wcci.criticfusion.repository.CartRepository;

@Service
public class CartService{
    @Autowired
    private CartRepository cartRepository;

    public List<Cart> getAllCart() {
    return cartRepository.findAll();
    }

    public Cart findCartById(long id) {
    return this.cartRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public void addCart (Cart cart){
    cartRepository.save(cart);
  }

 public Cart updateCart (long id, Cart updatedDetails) {
  Cart existingCart = findCartById(id);
  existingCart.setQuantity(updatedDetails.getQuantity());
  this.cartRepository.save(existingCart);
  return existingCart;
 }

    public void deleteCart(long id) {
      this.cartRepository.deleteById(id);
    }
}