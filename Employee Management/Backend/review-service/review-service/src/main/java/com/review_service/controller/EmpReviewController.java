package com.review_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.review_service.model.EmpReview;
import com.review_service.service.EmpReviewService;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class EmpReviewController {
    private final EmpReviewService service;
    public EmpReviewController(EmpReviewService service){ this.service = service; }

    @GetMapping("/get")
    public List<EmpReview> all(){ return service.findAll(); }

    @GetMapping("/get/{id}")
    public ResponseEntity<EmpReview> get(@PathVariable Long id){ return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }

    @GetMapping("/get/employee/{empId}")
    public List<EmpReview> byEmp(@PathVariable Long empId){ return service.findByEmpId(empId); }

    @GetMapping("/get/reviewer/{reviewerId}")
    public List<EmpReview> byReviewer(@PathVariable Long reviewerId){ return service.findByReviewerId(reviewerId); }

    @PostMapping("/add")
    public ResponseEntity<EmpReview> create(@RequestBody EmpReview r){ return ResponseEntity.status(201).body(service.create(r)); }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<EmpReview> update(@PathVariable Long id, @RequestBody EmpReview updatedReview) {
        return service.findById(id).map(existing -> {
            updatedReview.setReviewId(id); // keep same ID
            EmpReview saved = service.create(updatedReview);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){ service.deleteById(id); return ResponseEntity.noContent().build(); }
}
