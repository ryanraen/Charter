package com.ryan.taskManager;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells hibernate to create a table from this class (object-relational mapping)
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(nullable = false)
    private int ID;

    @Column(nullable = false, unique=true)
    private String username;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false, unique=true)
    private String email;

    @Column(name="signup_date")
    @CreationTimestamp
    private Date signupDate;

    // GETTERS
    public Integer getID() {
        return ID;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public Date getSignupDate() {
        return signupDate;
    }

    // SETTERS
    public void setID(Integer ID) {
        this.ID = ID;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSignupDate(Date signupDate) {
        this.signupDate = signupDate;
    }

}