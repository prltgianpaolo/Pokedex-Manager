package com.pokedexmanager.middleware.repository;

import com.pokedexmanager.middleware.entity.Evolution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvolutionRepository extends JpaRepository<Evolution, Integer> {

    // evoluzioni per un Pokémon base
    List<Evolution> findByBasePokemonId(int basePokemonId);

    // pre-evoluzioni per un Pokémon evoluto
    List<Evolution> findByEvolvedPokemonId(int evolvedPokemonId);
}