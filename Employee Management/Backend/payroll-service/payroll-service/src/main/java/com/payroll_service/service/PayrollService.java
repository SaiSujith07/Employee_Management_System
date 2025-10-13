package com.payroll_service.service;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.payroll_service.model.Payroll;
import com.payroll_service.repository.PayrollRepository;

import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@Service
public class PayrollService {
    private final PayrollRepository repo;
    private final EmployeeClient employeeClient;

    public PayrollService(PayrollRepository repo, EmployeeClient employeeClient){
        this.repo = repo;
        this.employeeClient = employeeClient;
    }

    public List<Payroll> findAll(){ return repo.findAll(); }

    public Payroll create(Payroll p){
        try { employeeClient.getEmployeeById(p.getEmpId()); }
        catch(Exception ex){ throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee not found: " + p.getEmpId()); }

        // compute netSalary if not provided
        if(p.getNetSalary() == null) {
            double basic = p.getBasicSalary() == null ? 0.0 : p.getBasicSalary();
            double allow = p.getAllowances() == null ? 0.0 : p.getAllowances();
            double ded = p.getDeductions() == null ? 0.0 : p.getDeductions();
            p.setNetSalary(basic + allow - ded);
        }
        return repo.save(p);
    }

    public Optional<Payroll> findById(Long id){ return repo.findById(id); }
    
    public List<Payroll> findByEmpId(Long empId){ return repo.findByEmpId(empId); }
    
    public void deleteById(Long id){ repo.deleteById(id); }
}