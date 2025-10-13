package com.review_service.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "emp_reviews")
public class EmpReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private Long empId;         // reviewed employee id
    private Long reviewerId;    // reviewer (employee id)
    private LocalDate reviewDate;
    private Integer performanceRating; // e.g. 1..5
    private String comments;

    public EmpReview() {}
    // getters/setters
    public Long getReviewId() { return reviewId; }
    public void setReviewId(Long reviewId) { this.reviewId = reviewId; }
    public Long getEmpId() { return empId; }
    public void setEmpId(Long empId) { this.empId = empId; }
    public Long getReviewerId() { return reviewerId; }
    public void setReviewerId(Long reviewerId) { this.reviewerId = reviewerId; }
    public LocalDate getReviewDate() { return reviewDate; }
    public void setReviewDate(LocalDate reviewDate) { this.reviewDate = reviewDate; }
    public Integer getPerformanceRating() { return performanceRating; }
    public void setPerformanceRating(Integer performanceRating) { this.performanceRating = performanceRating; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
}
