package com.wcci.criticfusion.entity;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

@Entity
public class Merch {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private Long Id;
  private String name;
  private double price;
  private String imageFilename;
  private boolean isAddedToCart;
  private int quantity;
  private boolean isFavorite;
  
  public Merch() {
  }

  public Merch(String name, double price, String imageFilename, boolean isAddedToCart, int quality, boolean isFavorite) {
    this.name = name;
    this.price = price;
    this.imageFilename = imageFilename;
    this.isAddedToCart = isAddedToCart;
    this.quantity = quality;
    this.isFavorite = isFavorite;
  }


    public Long getId() {
        return this.Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageFilename() {
        return this.imageFilename;
    }

    public void setImageFilename(String imageFilename) {
        this.imageFilename = imageFilename;
    }

    public boolean isIsAddedToCart() {
        return this.isAddedToCart;
    }

    public boolean getIsAddedToCart() {
        return this.isAddedToCart;
    }

    public void setIsAddedToCart(boolean isAddedToCart) {
        this.isAddedToCart = isAddedToCart;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean getIsFavorite() {
        return this.isFavorite;
    }

    public void setIsFavorite(boolean isFavorite) {
        this.isFavorite = isFavorite;
    }

}