package com.pokedexmanager.middleware.controller;

import com.pokedexmanager.middleware.entity.UserCollection;
import com.pokedexmanager.middleware.entity.UserCollectionId;
import com.pokedexmanager.middleware.repository.UserCollectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
public class CollectionController {

    @Autowired
    private UserCollectionsRepository userCollectionsRepository;

    @GetMapping("/{userId}")
    public List<UserCollection> getUserCollection(@PathVariable int userId) {
        return userCollectionsRepository.findByUserId(userId);
    }

    @PostMapping
    public UserCollection addPokemonToCollection(@RequestBody UserCollection userCollection) {
        return userCollectionsRepository.save(userCollection);
    }

    @DeleteMapping("/{userId}/{pokemonId}")
    public void deletePokemonFromCollection(@PathVariable int userId, @PathVariable int pokemonId) {
        System.out.println("Eliminazione Pokémon dalla collezione: UserID = " + userId + ", PokemonID = " + pokemonId);

        UserCollectionId userCollectionId = new UserCollectionId();
        userCollectionId.setUserId(userId);
        userCollectionId.setPokemonId(pokemonId);

        userCollectionsRepository.deleteById(userCollectionId);
    }
}
