import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserIdFromToken } from '../services/auth';

const MyCollection = () => {
    const [collection, setCollection] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState({});

    // Funzione per caricare la collezione dell'utente
    const fetchCollection = async () => {
        const userId = getUserIdFromToken();
        if (!userId) {
            alert('You must be logged in to view your collection.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/collections/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCollection(response.data);

            // Carica i dettagli dei Pokémon
            const pokemonDetailPromises = response.data.map((poke) =>
                axios.get(`http://localhost:8080/api/pokemon/${poke.pokemonId}`)
            );

            const pokemonResponses = await Promise.all(pokemonDetailPromises);
            const details = {};
            pokemonResponses.forEach((res) => {
                details[res.data.id] = res.data;
            });

            setPokemonDetails(details);
        } catch (error) {
            console.error('Error fetching collection:', error);
            alert('Failed to fetch your collection.');
        }
    };

    // Funzione per rimuovere un Pokémon dalla collezione
    const removeFromCollection = async (pokemonId) => {
        const userId = getUserIdFromToken();
        if (!userId) {
            alert('You must be logged in to remove Pokémon from your collection.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/collections/${userId}/${pokemonId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Pokémon removed from your collection!');
            fetchCollection(); 
        } catch (error) {
            console.error('Error removing Pokémon:', error);
            alert('Failed to remove Pokémon from collection.');
        }
    };

    useEffect(() => {
        fetchCollection();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-3xl font-bold text-red-600 mb-6">My Pokémon Collection</h1>

            {/* Lista della collezione */}
            <div className="row">
                {collection.length === 0 ? (
                    <p className="text-center text-gray-500">Your collection is empty.</p>
                ) : (
                    collection.map((poke) => {
                        const details = pokemonDetails[poke.pokemonId];
                        return (
                            <div key={poke.pokemonId} className="col-md-6">
                                <div className="card shadow-lg mb-4 hover:shadow-xl transition-transform transform hover:scale-105">
                                    {details ? (
                                        <>
                                            <div className="row g-0">
                                                <div className="col-md-4 bg-gray-100 flex items-center justify-center">
                                                    <img
                                                        src={details.imageUrl}
                                                        className="img-fluid rounded-start"
                                                        alt={details.name}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-xl font-bold text-gray-800 mb-2">
                                                            {details.name}
                                                        </h5>
                                                        <p className="text-gray-600 mb-1">
                                                            <strong>Type 1:</strong> {details.type1}
                                                        </p>
                                                        <p className="text-gray-600 mb-1">
                                                            <strong>Type 2:</strong> {details.type2 || 'None'}
                                                        </p>
                                                        <p className="text-gray-600 mb-3">
                                                            <strong>Generation:</strong> {details.generation}
                                                        </p>
                                                        <h6 className="font-bold text-gray-800 mb-2">Statistics:</h6>
                                                        <ul className="list-disc ml-5 text-gray-600">
                                                            <li>HP: {details.stats.hp}</li>
                                                            <li>Attack: {details.stats.attack}</li>
                                                            <li>Defense: {details.stats.defense}</li>
                                                            <li>Speed: {details.stats.speed}</li>
                                                        </ul>
                                                        <p className="text-gray-600 mt-3">
                                                            <strong>Status:</strong> {poke.status}
                                                        </p>
                                                        <button
                                                            className="btn btn-danger mt-3 w-100"
                                                            onClick={() => removeFromCollection(poke.pokemonId)}
                                                        >
                                                            Remove from Collection
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MyCollection;
