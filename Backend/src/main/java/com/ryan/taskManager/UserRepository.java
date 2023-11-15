package com.ryan.taskManager;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}