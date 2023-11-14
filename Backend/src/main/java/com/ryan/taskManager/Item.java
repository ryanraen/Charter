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
public class Item {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(nullable = false)
    private int ID;

    @ManyToOne
    @JoinColumn(name = "chart_ID", referencedColumnName = "ID")
    @Column(nullable = false)
    private Chart chart_ID;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false, unique = true)
    private int position;

    @Column(name="created_date")
    @CreationTimestamp
    private Date createdDate;

    // GETTERS
    public Integer getID() {
        return ID;
    }

    public Integer getChartID() {
        return chart_ID.getID();
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
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

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
