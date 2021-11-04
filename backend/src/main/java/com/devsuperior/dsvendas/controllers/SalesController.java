package com.devsuperior.dsvendas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.service.SaleService;



@RestController  //Indicar que a classe vai ser um controlador
@RequestMapping(value = "/sales")  // Indicar o caminho do recurso web
public class SalesController {
 
	@Autowired
	private SaleService service;
	
	
	// exemplo url paginada: http://localhost:8080/sales?page=2&size=5&sorte=date,desc
	@GetMapping
	public ResponseEntity<Page<SaleDTO>> findAll(Pageable pageable){
		Page<SaleDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
}
