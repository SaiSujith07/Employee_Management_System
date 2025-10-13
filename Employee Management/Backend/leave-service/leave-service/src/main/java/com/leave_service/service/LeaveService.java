package com.leave_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.leave_service.model.LeaveRequest;
import com.leave_service.repository.LeaveRepository;

@Service
public class LeaveService {
    private final LeaveRepository repo;
    private final EmployeeClient employeeClient;

    public LeaveService(LeaveRepository repo, EmployeeClient employeeClient){
        this.repo = repo;
        this.employeeClient = employeeClient;
    }

    public List<LeaveRequest> findAll(){ return repo.findAll(); }

    public LeaveRequest create(LeaveRequest l){
        try {
            employeeClient.getEmployeeById(l.getEmpId());
        } catch(Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee not found: " + l.getEmpId());
        }
        l.setStatus(l.getStatus() == null ? "PENDING" : l.getStatus());
        return repo.save(l);
    }

    public Optional<LeaveRequest> findById(Long id){ return repo.findById(id); }
    public List<LeaveRequest> findByEmpId(Long empId){ return repo.findByEmpId(empId); }
    public LeaveRequest update(Long id, LeaveRequest updated){
        return repo.findById(id).map(existing -> {
            existing.setLeaveType(updated.getLeaveType());
            existing.setStartDate(updated.getStartDate());
            existing.setEndDate(updated.getEndDate());
            existing.setReason(updated.getReason());
            existing.setStatus(updated.getStatus());
            return repo.save(existing);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    public void deleteById(Long id){ repo.deleteById(id); }
}
