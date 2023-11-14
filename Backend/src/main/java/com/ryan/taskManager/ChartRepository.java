package com.ryan.taskManager;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChartRepository extends JpaRepository<Chart, Integer> {
    
}
