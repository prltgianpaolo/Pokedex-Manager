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
        setIsAuthenticated(!!token); 
    }, []);

    // Funzione per il logout
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setIsAuthenticated(false); 
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
        <div
        className="min-h-screen py-6"
        style={{
            backgroundImage: 'url("/pokeball.png")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
            backgroundColor: '#f8f8f8',
            }}
        >
            
            <div className="container mx-auto bg-white p-6 rounded shadow-lg relative text-center mb-10 max-w-4xl">
                 <h1 className="text-5xl font-bold text-red-600">Pokémon List</h1>
                {isAuthenticated && (
                    <button
                        className="absolute top-4 right-4 bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
                        onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>


            {/* Barra di ricerca */}
            <div className="container mx-auto bg-white p-6 rounded shadow-lg mb-10 max-w-4xl">
                <div className="grid grid-cols-4 gap-4">
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2 focus:ring focus:ring-red-300"
                        placeholder="Name"
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2 focus:ring focus:ring-red-300"
                        placeholder="Type"
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    />
                    <input
                        type="number"
                        className="border border-gray-300 rounded p-2 focus:ring focus:ring-red-300"
                        placeholder="Generation"
                        onChange={(e) => setFilters({ ...filters, generation: e.target.value })}
                    />
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Lista dei Pokémon */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {pokemon.map((poke) => (
                    <div
                        key={poke.id}
                        className="bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <div className="h-48 w-full overflow-hidden rounded-t-lg flex items-center justify-center bg-gray-200">
                            <img
                                src={poke.imageUrl}
                                alt={poke.name}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <div className="p-4">
                            <h5 className="text-lg font-semibold text-red-600">{poke.name}</h5>
                            {isAuthenticated && (
                                <button
                                    onClick={() => addToCollection(poke.id)}
                                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded shadow hover:bg-red-600 transition"
                                >
                                    Add to My Collection
                                </button>
                            )}
                            <Link
                                to={`/pokemon/${poke.id}`}
                                className="block bg-red-500 text-white px-4 py-2 mt-2 rounded shadow hover:bg-red-600 transition"
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
