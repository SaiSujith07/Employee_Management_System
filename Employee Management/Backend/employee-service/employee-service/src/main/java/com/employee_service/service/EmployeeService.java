package com.employee_service.service;

import com.employee_service.model.Employee;
import java.util.List;
public interface EmployeeService {
	Employee create(Employee e);
	Employee update(Long id, Employee e);
	Employee getById(Long id);
	List<Employee> getAll();
	void delete(Long id);
}
