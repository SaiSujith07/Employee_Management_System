package com.leave_service.controller;

import org.springframework.web.bind.annotation.RequestMapping;

import com.leave_service.model.LeaveRequest;
import com.leave_service.service.LeaveService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leaves")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaveController {
    private final LeaveService service;
    public LeaveController(LeaveService service){ this.service = service; }

    @GetMapping("/get")
    public List<LeaveRequest> all(){ return service.findAll(); }

    @GetMapping("/get/{id}")
    public ResponseEntity<LeaveRequest> get(@PathVariable Long id){
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/get/employee/{empId}")
    public List<LeaveRequest> byEmp(@PathVariable Long empId){ return service.findByEmpId(empId); }

    @PostMapping("/add")
    public ResponseEntity<LeaveRequest> create(@RequestBody LeaveRequest l){ return ResponseEntity.status(201).body(service.create(l)); }

    @PutMapping("/update/{id}")
    public ResponseEntity<LeaveRequest> update(@PathVariable Long id, @RequestBody LeaveRequest l){
        return ResponseEntity.ok(service.update(id, l));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){ 
    	service.deleteById(id); 
    	return ResponseEntity.noContent().build(); 
    }
}
