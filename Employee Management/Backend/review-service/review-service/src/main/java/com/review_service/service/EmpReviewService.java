package com.review_service.service;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.review_service.model.EmpReview;
import com.review_service.repository.EmpReviewRepository;

import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@Service
public class EmpReviewService {
    private final EmpReviewRepository repo;
    private final EmployeeClient employeeClient;

    public EmpReviewService(EmpReviewRepository repo, EmployeeClient employeeClient){
        this.repo = repo;
        this.employeeClient = employeeClient;
    }

    public List<EmpReview> findAll(){ return repo.findAll(); }

    public EmpReview create(EmpReview r){
        // validate both empId and reviewerId exist
        try { employeeClient.getEmployeeById(r.getEmpId()); }
        catch(Exception ex){ throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee not found: " + r.getEmpId()); }

        try { employeeClient.getEmployeeById(r.getReviewerId()); }
        catch(Exception ex){ throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reviewer not found: " + r.getReviewerId()); }

        if(r.getReviewDate() == null) r.setReviewDate(java.time.LocalDate.now());
        return repo.save(r);
    }

    public Optional<EmpReview> findById(Long id){ return repo.findById(id); }
    
    public List<EmpReview> findByEmpId(Long empId){ return repo.findByEmpId(empId); }
    
    public List<EmpReview> findByReviewerId(Long reviewerId){ return repo.findByReviewerId(reviewerId); }
    
    public void deleteById(Long id){ repo.deleteById(id); }
}
