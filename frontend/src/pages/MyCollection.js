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
            fetchCollection(); // Ricarica la collezione aggiornata
        } catch (error) {
            console.error('Error removing Pokémon:', error);
            alert('Failed to remove Pokémon from collection.');
        }
    };

    useEffect(() => {
        fetchCollection();
    }, []);

    return (
        <div className="container mt-4">
            <h1>My Collection</h1>

            {/* Lista della collezione */}
            <div className="row">
                {collection.length === 0 ? (
                    <p>Your collection is empty.</p>
                ) : (
                    collection.map((poke) => {
                        const details = pokemonDetails[poke.pokemonId];
                        return (
                            <div key={poke.pokemonId} className="col-md-6">
                                <div className="card mb-4">
                                    {details ? (
                                        <>
                                            <div className="row g-0">
                                                <div className="col-md-4">
                                                    <img
                                                        src={details.imageUrl}
                                                        className="img-fluid rounded-start"
                                                        alt={details.name}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{details.name}</h5>
                                                        <p>Type 1: {details.type1}</p>
                                                        <p>Type 2: {details.type2 || 'None'}</p>
                                                        <p>Generation: {details.generation}</p>
                                                        <h6>Statistics:</h6>
                                                        <ul>
                                                            <li>HP: {details.stats.hp}</li>
                                                            <li>Attack: {details.stats.attack}</li>
                                                            <li>Defense: {details.stats.defense}</li>
                                                            <li>Speed: {details.stats.speed}</li>
                                                        </ul>
                                                        <p>Status: {poke.status}</p>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => removeFromCollection(poke.pokemonId)}
                                                        >
                                                            Remove
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
