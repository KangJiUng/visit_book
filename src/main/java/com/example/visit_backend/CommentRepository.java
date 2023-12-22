package com.example.visit_backend;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
