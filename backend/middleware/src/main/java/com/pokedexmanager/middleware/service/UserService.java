package com.pokedexmanager.middleware.service;

import com.pokedexmanager.middleware.entity.User;
import com.pokedexmanager.middleware.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        System.out.println("Registrazione utente: " + user.getUsername());
        System.out.println("Password fornita (in chiaro): " + user.getPassword());

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("La password non può essere vuota");
        }

        // Codifica solo se la password non è già codificata
        if (!user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            throw new IllegalArgumentException("La password non deve essere già codificata");
        }

        System.out.println("Password codificata: " + user.getPassword());
        return userRepository.save(user);
    }




    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
