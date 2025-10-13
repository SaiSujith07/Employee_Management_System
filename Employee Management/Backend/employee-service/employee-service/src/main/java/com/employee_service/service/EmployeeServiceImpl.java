package com.employee_service.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.employee_service.model.Employee;
import com.employee_service.repository.EmployeeRepository;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
  private final EmployeeRepository repo;
  public EmployeeServiceImpl(EmployeeRepository repo){ this.repo = repo; }

  @Override public Employee create(Employee e){ return repo.save(e); }

  @Override public Employee update(Long id, Employee e){
    Employee ex = repo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
    ex.setName(e.getName()); 
    ex.setEmail(e.getEmail()); 
    ex.setDesignation(e.getDesignation());
    ex.setDepartment(e.getDepartment()); 
    ex.setPhone(e.getPhone()); 
    ex.setAddress(e.getAddress());
    ex.setSalary(e.getSalary());
    ex.setJoiningDate(e.getJoiningDate());
    return repo.save(ex);
  }

  @Override public Employee getById(Long id){ return repo.findById(id).orElse(null); }
  @Override public List<Employee> getAll(){ return repo.findAll(); }
  @Override public void delete(Long id){ repo.deleteById(id); }
}
