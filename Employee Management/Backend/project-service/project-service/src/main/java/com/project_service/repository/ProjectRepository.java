package com.project_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project_service.model.Project;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByAssignedEmpId(Long empId);
}