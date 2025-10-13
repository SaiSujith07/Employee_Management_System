package com.leave_service.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "leaves")
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaveId;

    private Long empId;               // validated via Feign
    private String leaveType;         // e.g. "ANNUAL", "SICK"
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String status;            // e.g. "PENDING","APPROVED","REJECTED"

    public LeaveRequest() {}
    // getters/setters
    public Long getLeaveId() { 
    	return leaveId; 
    }
    public void setLeaveId(Long leaveId) { 
    	this.leaveId = leaveId;
    }
    public Long getEmpId() { return empId; }
    public void setEmpId(Long empId) { this.empId = empId; }
    public String getLeaveType() { return leaveType; }
    public void setLeaveType(String leaveType) { this.leaveType = leaveType; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}