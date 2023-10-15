package com.wcci.criticfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wcci.criticfusion.entity.Merch;
import com.wcci.criticfusion.repository.MerchRepository;

@Service

public class MerchService {

  @Autowired
  private MerchRepository merchRepository;

  public List<Merch> findAllMerch() {
  return merchRepository.findAll();
  }

  public Merch findMerchById(long id) {
    return this.merchRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id is not found."));
  }

  public Merch addMerch (Merch merch){
    return merchRepository.save(merch);
  }

public Merch updateMerch(long id, Merch updatedMerch) {
    Merch exsistingMerch = findMerchById(id);
    exsistingMerch.setName(updatedMerch.getName() == null ? exsistingMerch.getName() : updatedMerch.getName());
    exsistingMerch.setName(updatedMerch.getName() == null ? exsistingMerch.getName() : updatedMerch.getName());
    exsistingMerch.setPrice(updatedMerch.getPrice());
    exsistingMerch.setImageFilename(updatedMerch.getImageFilename());
    exsistingMerch.setIsAddedToCart(updatedMerch.getIsAddedToCart());
    exsistingMerch.setQuantity(updatedMerch.getQuantity());
    exsistingMerch.setIsFavorite(updatedMerch.getIsFavorite());
    this.merchRepository.save(exsistingMerch);
    return exsistingMerch;
}

public void deleteMerch(long id) {
  this.merchRepository.deleteById(id);
}
}
