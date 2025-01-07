package com.pokedexmanager.middleware.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserCollectionId implements Serializable {
    private int userId;
    private int pokemonId;

    // Default Constructor
    public UserCollectionId() {}

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCollectionId that = (UserCollectionId) o;
        return userId == that.userId && pokemonId == that.pokemonId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, pokemonId);
    }
}
