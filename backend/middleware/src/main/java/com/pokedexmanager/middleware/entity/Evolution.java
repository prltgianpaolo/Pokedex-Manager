package com.pokedexmanager.middleware.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "evolutions")
public class Evolution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "base_pokemon_id")
    private Pokemon basePokemon;

    @ManyToOne
    @JoinColumn(name = "evolved_pokemon_id")
    private Pokemon evolvedPokemon;

    private String evolutionTrigger;

    private String triggerDetail;

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Pokemon getBasePokemon() {
        return basePokemon;
    }

    public void setBasePokemon(Pokemon basePokemon) {
        this.basePokemon = basePokemon;
    }

    public Pokemon getEvolvedPokemon() {
        return evolvedPokemon;
    }

    public void setEvolvedPokemon(Pokemon evolvedPokemon) {
        this.evolvedPokemon = evolvedPokemon;
    }

    public String getEvolutionTrigger() {
        return evolutionTrigger;
    }

    public void setEvolutionTrigger(String evolutionTrigger) {
        this.evolutionTrigger = evolutionTrigger;
    }

    public String getTriggerDetail() {
        return triggerDetail;
    }

    public void setTriggerDetail(String triggerDetail) {
        this.triggerDetail = triggerDetail;
    }
}
