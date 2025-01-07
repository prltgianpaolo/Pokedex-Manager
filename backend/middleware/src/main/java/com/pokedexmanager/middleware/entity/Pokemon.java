package com.pokedexmanager.middleware.entity;

import jakarta.persistence.*;
import java.util.Map;

@Entity
@Table(name = "pokemon")
public class Pokemon {

    @Id
    private int id;

    private String name;

    private String type1;

    private String type2;

    private int generation;

    @Column(columnDefinition = "json")
    @Convert(converter = StatsConverter.class)
    private Map<String, Integer> stats;

    private String imageUrl;

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType1() {
        return type1;
    }

    public void setType1(String type1) {
        this.type1 = type1;
    }

    public String getType2() {
        return type2;
    }

    public void setType2(String type2) {
        this.type2 = type2;
    }

    public int getGeneration() {
        return generation;
    }

    public void setGeneration(int generation) {
        this.generation = generation;
    }

    public Map<String, Integer> getStats() {
        return stats;
    }

    public void setStats(Map<String, Integer> stats) {
        this.stats = stats;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
