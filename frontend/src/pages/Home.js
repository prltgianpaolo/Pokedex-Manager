import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserIdFromToken } from '../services/auth';

const Home = () => {
    const [pokemon, setPokemon] = useState([]);
    const [filters, setFilters] = useState({ name: '', type: '', generation: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Controlla se l'utente è autenticato
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Imposta true se il token esiste, altrimenti false
    }, []);

    // Funzione per il logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Rimuove il token dal localStorage
        setIsAuthenticated(false); // Aggiorna lo stato
        alert('You have been logged out.');
    };

    // Funzione per caricare la lista dei Pokémon
    const fetchPokemon = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pokemon');
            setPokemon(response.data);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    // Funzione per filtrare la lista dei Pokémon
    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pokemon/search', {
                params: {
                    name: filters.name.trim() || null,
                    type: filters.type.trim() || null,
                    generation: filters.generation || null,
                },
            });
            setPokemon(response.data);
        } catch (error) {
            alert('Failed to fetch Pokémon');
        }
    };

    // Funzione per aggiungere un Pokémon alla collezione
    const addToCollection = async (pokemonId) => {
        const userId = getUserIdFromToken();
        if (!userId) {
            alert('You must be logged in to add Pokémon to your collection.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:8080/api/collections',
                { userId, pokemonId, status: 'OWNED' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Pokémon added to your collection!');
        } catch (error) {
            alert('Failed to add Pokémon to collection');
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Pokémon List</h1>
                {isAuthenticated && (
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>

            {/* Barra di ricerca e filtri */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type"
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Generation"
                        onChange={(e) => setFilters({ ...filters, generation: e.target.value })}
                    />
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            {/* Lista dei Pokémon */}
            <div className="row">
                {pokemon.map((poke) => (
                    <div key={poke.id} className="col-md-3">
                        <div className="card">
                            <img src={poke.imageUrl} className="card-img-top" alt={poke.name} />
                            <div className="card-body">
                                <h5 className="card-title">{poke.name}</h5>
                                {isAuthenticated && (
                                    <button
                                        onClick={() => addToCollection(poke.id)}
                                        className="btn btn-success"
                                    >
                                        Add to My Collection
                                    </button>
                                )}
                                <Link to={`/pokemon/${poke.id}`} className="btn btn-primary ms-2">
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
