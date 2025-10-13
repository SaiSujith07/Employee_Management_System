package com.project_service.service;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.project_service.model.Project;
import com.project_service.repository.ProjectRepository;

import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository repo;
    private final EmployeeClient employeeClient;

    public ProjectService(ProjectRepository repo, EmployeeClient employeeClient){
        this.repo = repo;
        this.employeeClient = employeeClient;
    }

    public List<Project> findAll(){ return repo.findAll(); }

    public Project create(Project p){
        // validate assignedEmpId exists
        try { employeeClient.getEmployeeById(p.getAssignedEmpId()); }
        catch(Exception ex){ throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assigned employee not found: " + p.getAssignedEmpId()); }
        p.setStatus(p.getStatus() == null ? "ASSIGNED" : p.getStatus());
        return repo.save(p);
    }

    public Optional<Project> findById(Long id){ return repo.findById(id); }
    public List<Project> findByAssignedEmpId(Long empId){ return repo.findByAssignedEmpId(empId); }
    public Project update(Long id, Project updated){
        return repo.findById(id).map(existing -> {
            existing.setTaskDescription(updated.getTaskDescription());
            existing.setDueDate(updated.getDueDate());
            existing.setStartDate(updated.getStartDate());
            existing.setStatus(updated.getStatus());
            return repo.save(existing);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    public void deleteById(Long id){ repo.deleteById(id); }
}