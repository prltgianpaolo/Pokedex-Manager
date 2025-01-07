package com.pokedexmanager.middleware.controller;

import com.pokedexmanager.middleware.entity.Evolution;
import com.pokedexmanager.middleware.repository.EvolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evolutions")
public class EvolutionController {

    @Autowired
    private EvolutionRepository evolutionRepository;

    @GetMapping
    public List<Evolution> getAllEvolutions() {
        System.out.println("Richiesta per tutte le evoluzioni ricevuta");
        return evolutionRepository.findAll();
    }

    @GetMapping("/base/{basePokemonId}")
    public List<Evolution> getEvolutionsByBasePokemon(@PathVariable int basePokemonId) {
        System.out.println("Richiesta per evoluzioni base Pokémon ID: " + basePokemonId);
        return evolutionRepository.findByBasePokemonId(basePokemonId);
    }

    @GetMapping("/evolved/{evolvedPokemonId}")
    public List<Evolution> getEvolutionsByEvolvedPokemon(@PathVariable int evolvedPokemonId) {
        System.out.println("Richiesta per evoluzioni Pokémon evoluto ID: " + evolvedPokemonId);
        return evolutionRepository.findByEvolvedPokemonId(evolvedPokemonId);
    }
}
