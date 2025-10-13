package com.project_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project_service.model.Project;
import com.project_service.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:3000")

public class ProjectController {
    private final ProjectService service;
    public ProjectController(ProjectService service){ this.service = service; }

    @GetMapping("/get")
    public List<Project> all(){ return service.findAll(); }

    @GetMapping("/get/{id}")
    public ResponseEntity<Project> get(@PathVariable Long id){ return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }

    @GetMapping("/get/employee/{empId}")
    public List<Project> byEmp(@PathVariable Long empId){ return service.findByAssignedEmpId(empId); }

    @PostMapping("/add")
    public ResponseEntity<Project> create(@RequestBody Project p){ return ResponseEntity.status(201).body(service.create(p)); }

    @PutMapping("/update/{id}")
    public ResponseEntity<Project> update(@PathVariable Long id, @RequestBody Project p){ return ResponseEntity.ok(service.update(id, p)); }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){ service.deleteById(id); return ResponseEntity.noContent().build(); }
}