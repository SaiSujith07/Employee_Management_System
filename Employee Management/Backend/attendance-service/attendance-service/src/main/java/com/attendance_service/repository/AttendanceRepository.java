package com.attendance_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attendance_service.model.Attendance;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmpId(Long empId);
    List<Attendance> findByEmpIdAndDate(Long empId, LocalDate date);
}