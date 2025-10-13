package com.employee_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_service.model.Employee;
import com.employee_service.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
  private final EmployeeService service;
  public EmployeeController(EmployeeService service){ this.service = service; }

  @PostMapping("/add")
  public Employee create(@RequestBody Employee e){ return service.create(e); }
  
  @GetMapping("/get/{id}")
  public Employee get(@PathVariable Long id){ return service.getById(id); }
  
  @GetMapping("/get")
  public List<Employee> all(){ return service.getAll(); }
  
  @PutMapping("/update/{id}") 
  public Employee update(@PathVariable Long id, @RequestBody Employee e){ return service.update(id, e); }
  
  @DeleteMapping("/delete/{id}") 
  public void delete(@PathVariable Long id){ service.delete(id); }
}