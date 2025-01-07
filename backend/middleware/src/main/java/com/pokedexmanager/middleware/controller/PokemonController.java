package com.pokedexmanager.middleware.controller;

import com.pokedexmanager.middleware.entity.Pokemon;
import com.pokedexmanager.middleware.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pokemon")
public class PokemonController {

    @Autowired
    private PokemonRepository pokemonRepository;

    @GetMapping
    public List<Pokemon> getAllPokemon() {
        return pokemonRepository.findAll();
    }

    @GetMapping("/{id}")
    public Pokemon getPokemonById(@PathVariable int id) {
        return pokemonRepository.findById(id).orElse(null);
    }

    @GetMapping("/search")
    public List<Pokemon> searchPokemon(@RequestParam(required = false) String name,
                                       @RequestParam(required = false) String type,
                                       @RequestParam(required = false) Integer generation) {
        return pokemonRepository.findByFilters(name, type, generation);
    }
}

