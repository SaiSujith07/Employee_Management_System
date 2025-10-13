package com.leave_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leave_service.model.LeaveRequest;

import java.util.List;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmpId(Long empId);
}