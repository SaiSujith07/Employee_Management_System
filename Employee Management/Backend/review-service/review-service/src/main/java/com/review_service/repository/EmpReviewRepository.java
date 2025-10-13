package com.review_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review_service.model.EmpReview;

import java.util.List;

public interface EmpReviewRepository extends JpaRepository<EmpReview, Long> {
    List<EmpReview> findByEmpId(Long empId);
    List<EmpReview> findByReviewerId(Long reviewerId);
}
