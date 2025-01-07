package com.pokedexmanager.middleware.repository;

import com.pokedexmanager.middleware.entity.UserCollection;
import com.pokedexmanager.middleware.entity.UserCollectionId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCollectionsRepository extends JpaRepository<UserCollection, UserCollectionId> {
    List<UserCollection> findByUserId(int userId);
}
