package com.ryan.taskManager;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, Integer> {

    Optional<Workspace> findByUserID(User userID);
    
}
