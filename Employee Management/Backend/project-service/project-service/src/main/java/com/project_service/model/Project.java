package com.project_service.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    private Long assignedEmpId;   // employee assigned
    private String taskDescription;
    private LocalDate startDate;
    private LocalDate dueDate;
    private String status;        // e.g. "ASSIGNED","IN_PROGRESS","DONE","BLOCKED"

    public Project() {}
    // getters/setters
    public Long getTaskId() { return taskId; }
    public void setTaskId(Long taskId) { this.taskId = taskId; }
    public Long getAssignedEmpId() { return assignedEmpId; }
    public void setAssignedEmpId(Long assignedEmpId) { this.assignedEmpId = assignedEmpId; }
    public String getTaskDescription() { return taskDescription; }
    public void setTaskDescription(String taskDescription) { this.taskDescription = taskDescription; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
