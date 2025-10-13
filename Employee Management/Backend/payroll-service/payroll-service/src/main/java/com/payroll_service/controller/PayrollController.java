package com.payroll_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.payroll_service.model.Payroll;
import com.payroll_service.service.PayrollService;

import java.util.List;

@RestController
@RequestMapping("/payrolls")
@CrossOrigin(origins = "http://localhost:3000")
public class PayrollController {
    private final PayrollService service;
    public PayrollController(PayrollService service){ this.service = service; }

    @GetMapping("/get")
    public List<Payroll> all(){ return service.findAll(); }

    @GetMapping("/get/{id}")
    public ResponseEntity<Payroll> get(@PathVariable Long id){ return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }

    @GetMapping("/get/employee/{empId}")
    public List<Payroll> byEmp(@PathVariable Long empId){ return service.findByEmpId(empId); }

    @PostMapping("/add")
    public ResponseEntity<Payroll> create(@RequestBody Payroll p){ return ResponseEntity.status(201).body(service.create(p)); }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Payroll> update(@PathVariable Long id, @RequestBody Payroll updatedPayroll) {
        return service.findById(id)
                .map(existing -> {
                    existing.setEmpId(updatedPayroll.getEmpId());
                    existing.setSalaryMonth(updatedPayroll.getSalaryMonth());
                    existing.setBasicSalary(updatedPayroll.getBasicSalary());
                    existing.setAllowances(updatedPayroll.getAllowances());
                    existing.setDeductions(updatedPayroll.getDeductions());
                    existing.setNetSalary(updatedPayroll.getNetSalary());
                    existing.setPaymentDate(updatedPayroll.getPaymentDate());

                    Payroll saved = service.create(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){ service.deleteById(id); return ResponseEntity.noContent().build(); }
}
