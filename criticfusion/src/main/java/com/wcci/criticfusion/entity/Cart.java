package com.wcci.criticfusion.entity;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;

@Entity
public class Cart {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private Long Id;
  private int quantity;
  @ManyToOne
  private Admin admin;
  @ManyToOne
  private Merch merch;
  
  
  public Cart() {
  }

  public Cart(int quantity) {
    this.quantity = quantity;
  }

  public Long getId() {
    return this.Id;
  }

  public void setId(Long Id) {
    this.Id = Id;
  }

  public int getQuantity() {
    return this.quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public Admin getAdmin() {
    return this.admin;
  }

  public void setAdmin(Admin admin) {
    this.admin = admin;
  }

  public Merch getMerch() {
    return this.merch;
  }

  public void setMerch(Merch merch) {
    this.merch = merch;
  }

}