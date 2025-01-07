package com.pokedexmanager.middleware.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_collections")
@IdClass(UserCollectionId.class)
public class UserCollection {

    @Id
    @Column(name = "user_id")
    private int userId;

    @Id
    @Column(name = "pokemon_id")
    private int pokemonId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CollectionStatus status;

    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPokemonId() {
        return pokemonId;
    }

    public void setPokemonId(int pokemonId) {
        this.pokemonId = pokemonId;
    }

    public CollectionStatus getStatus() {
        return status;
    }

    public void setStatus(CollectionStatus status) {
        this.status = status;
    }
}
