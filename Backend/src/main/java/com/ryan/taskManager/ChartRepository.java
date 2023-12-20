package com.ryan.taskManager;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChartRepository extends JpaRepository<Chart, Integer> {
    
}
