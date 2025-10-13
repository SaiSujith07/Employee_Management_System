package com.payroll_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payroll_service.model.Payroll;

import java.util.List;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    List<Payroll> findByEmpId(Long empId);
}