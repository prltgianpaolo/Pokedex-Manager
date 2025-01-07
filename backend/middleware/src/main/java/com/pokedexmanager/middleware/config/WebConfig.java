package com.pokedexmanager.middleware.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Consenti tutte le rotte
                        .allowedOrigins("http://localhost:3000") // Consenti richieste dal frontend React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Consenti metodi HTTP
                        .allowedHeaders("*") // Consenti tutti gli header
                        .allowCredentials(true); // Consenti cookie e credenziali
            }
        };
    }
}
