package com.ryan.taskManager;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

@Entity
public class Workspace {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(nullable = false)
    private int ID;

    @ManyToOne
    @JoinColumn(name = "user_ID", referencedColumnName = "ID", nullable = false)
    private User userID;

    @Column(nullable = false)
    private String name;

    @Column(name="created_date")
    @CreationTimestamp
    private Date createdDate;

    @Column(name="is_public", nullable = false)
    private boolean isPublic;

    @OneToMany(mappedBy = "workspaceID", cascade = CascadeType.ALL)
    private List<Chart> charts;

    // GETTERS
    public Integer getID() {
        return ID;
    }

    public Integer getUserID() {
        return userID.getID();
    }

    public String getName() {
        return name;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public boolean getIsPublic() {
        return isPublic;
    }

    public List<Chart> getCharts() {
        return charts;
    }

    // SETTERS
    public void setID(Integer ID) {
        this.ID = ID;
    }

    public void setUserID(User user) {
        this.userID = user;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }
    
}
