package com.payroll_service.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.payroll_service.dto.EmployeeDTO;

import java.util.Map;

@FeignClient(name = "employee-client", url = "http://localhost:8081")
public interface EmployeeClient {
    
	 @GetMapping("/employees/get/{id}")
	 EmployeeDTO getEmployeeById(@PathVariable("id") Long id);
}
