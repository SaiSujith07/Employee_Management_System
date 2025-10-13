package com.attendance_service.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.attendance_service.dto.EmployeeDTO;

@FeignClient(name = "employee-service", url = "http://localhost:8081")
public interface EmployeeClient {

    @GetMapping("/employees/get/{id}")
    EmployeeDTO getEmployeeById(@PathVariable("id") Long id);
}
