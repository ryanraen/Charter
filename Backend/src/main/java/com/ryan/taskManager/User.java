package com.ryan.taskManager;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

@Entity // This tells hibernate to create a table from this class (object-relational mapping)
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(nullable = false)
    private int ID;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false, unique = true)
    private String email;

    @Column(name="signup_date")
    @CreationTimestamp
    private Date signupDate;

    @Column(nullable = true)
    private String accessToken;

    @Column(nullable = true)
    private Date tokenExpiryDate;

    @OneToMany(mappedBy = "userID", cascade = CascadeType.ALL)
    private List<Workspace> workspaces;


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

    public String getAccessToken() {
        return accessToken;
    }

    public Date getTokenExpirDate() {
        return tokenExpiryDate;
    }

    public List<Workspace> getWorkspaces() {
        return workspaces;
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

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setTokenExpiryDate(Date tokenExpiryDate) {
        this.tokenExpiryDate = tokenExpiryDate;
    }

}