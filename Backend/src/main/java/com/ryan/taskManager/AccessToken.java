package com.ryan.taskManager;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AccessToken {
    
    @Id
    @Column(nullable = false)
    private String token;

    @ManyToOne
    @JoinColumn(name = "user_ID", referencedColumnName = "ID", nullable = false)
    private User userID;

    // GETTERS
    public String getToken() {
        return token;
    }

    public Integer getUserID() {
        return userID.getID();
    }

    // SETTERS
    public void setToken(String token) {
        this.token = token;
    }

}
