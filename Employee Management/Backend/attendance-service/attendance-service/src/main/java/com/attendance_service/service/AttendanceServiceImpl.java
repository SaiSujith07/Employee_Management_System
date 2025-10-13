package com.attendance_service.service;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance_service.model.Attendance;
import com.attendance_service.repository.AttendanceRepository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceServiceImpl {

    private final AttendanceRepository repo;
    private final EmployeeClient employeeClient;

    
    public AttendanceServiceImpl(AttendanceRepository repo, EmployeeClient employeeClient){
        this.repo = repo;
        this.employeeClient = employeeClient;
    }

    public List<Attendance> findAll(){ return repo.findAll(); }

    public Attendance create(Attendance a){
        // validate empId exists by calling employee-service
        try {
            employeeClient.getEmployeeById(a.getEmpId()); // if 404, Feign will throw exception
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee not found with id: " + a.getEmpId());
        }
        return repo.save(a);
    }

    public List<Attendance> findByEmpId(Long empId){ return repo.findByEmpId(empId); }
    public Optional<Attendance> findById(Long id){ return repo.findById(id); }
    public void deleteById(Long id){ repo.deleteById(id); }
    
    public Attendance update(Long id, Attendance updated) {
        Attendance existing = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance not found with id: " + id));

        // Validate empId exists in employee-service
        try {
            employeeClient.getEmployeeById(updated.getEmpId());
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee not found with id: " + updated.getEmpId());
        }

        existing.setEmpId(updated.getEmpId());
        existing.setDate(updated.getDate());
        existing.setCheckInTime(updated.getCheckInTime());
        existing.setOutTime(updated.getOutTime());
        existing.setStatus(updated.getStatus());

        return repo.save(existing);
    }

}

