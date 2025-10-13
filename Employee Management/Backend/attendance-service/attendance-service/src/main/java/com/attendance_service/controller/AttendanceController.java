package com.attendance_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.attendance_service.model.Attendance;
import com.attendance_service.service.AttendanceServiceImpl;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {
    private final AttendanceServiceImpl service;
    public AttendanceController(AttendanceServiceImpl service){ this.service = service; }

    @GetMapping("/get")
    public List<Attendance> all(){ return service.findAll(); }

    @GetMapping("/employee/{empId}")
    public List<Attendance> byEmp(@PathVariable Long empId){
        return service.findByEmpId(empId);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Attendance> get(@PathVariable Long id){
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> create(@RequestBody Attendance a){
        Attendance saved = service.create(a);
        return ResponseEntity.status(201).body(saved);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Attendance> update(@PathVariable Long id, @RequestBody Attendance a) {
        Attendance updated = service.update(id, a);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}