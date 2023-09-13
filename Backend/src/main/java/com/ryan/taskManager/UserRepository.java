package com.ryan.taskmanager;

import org.springframework.data.repository.CrudRepository;

import com.ryan.taskmanager.User;

public interface UserRepository extends CrudRepository<User, Integer> {

    
}