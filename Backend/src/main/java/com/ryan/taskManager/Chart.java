package com.ryan.taskManager;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Chart {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(nullable = false)
    private int ID;

    @ManyToOne
    @JoinColumn(name = "workspace_ID", referencedColumnName = "ID", nullable = false)
    private Workspace workspace_ID;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private int position;

    @Column(name="created_date")
    @CreationTimestamp
    private Date createdDate;

    // GETTERS
    public Integer getID() {
        return ID;
    }

    public Integer getWorkspaceID() {
        return workspace_ID.getID();
    }

    public String getName() {
        return name;
    }

    public Integer getPosition() {
        return position;
    }

    public Date getCreatedDate() {
        return createdDate;
    }
    
    // SETTERS
    public void setID(Integer ID) {
        this.ID = ID;
    }

    public void setWorkspaceID(Workspace workspace) {
        this.workspace_ID = workspace;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
    
}
