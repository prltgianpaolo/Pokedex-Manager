package com.pokedexmanager.middleware.repository;

import com.pokedexmanager.middleware.entity.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PokemonRepository extends JpaRepository<Pokemon, Integer> {

    // Ricerca per nome
    List<Pokemon> findByNameContainingIgnoreCase(String name);

    // Filtra per tipo
    List<Pokemon> findByType1OrType2(String type1, String type2);

    // Filtra per generazione
    List<Pokemon> findByGeneration(int generation);

    // Query personalizzata per più filtri
    @Query("SELECT p FROM Pokemon p WHERE " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:type IS NULL OR p.type1 = :type OR p.type2 = :type) AND " +
            "(:generation IS NULL OR p.generation = :generation)")
    List<Pokemon> findByFilters(@Param("name") String name,
                                @Param("type") String type,
                                @Param("generation") Integer generation);
}

