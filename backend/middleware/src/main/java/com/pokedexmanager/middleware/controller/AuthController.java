package com.pokedexmanager.middleware.controller;

import com.pokedexmanager.middleware.entity.User;
import com.pokedexmanager.middleware.service.UserService;
import com.pokedexmanager.middleware.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        System.out.println("Tentativo di login per utente: " + user.getUsername());
        User existingUser = userService.findByUsername(user.getUsername());

        if (existingUser == null) {
            System.out.println("Utente non trovato: " + user.getUsername());
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        System.out.println("Password fornita (in chiaro): " + user.getPassword());
        System.out.println("Password salvata (codificata): " + existingUser.getPassword());

        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            System.out.println("Le password non corrispondono per l'utente: " + user.getUsername());
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(existingUser.getUsername(),existingUser.getId());
        System.out.println("Token generato: " + token);
        return ResponseEntity.ok(token);
    }



}
