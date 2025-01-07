import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [evolutions, setEvolutions] = useState([]);
    const [preEvolutions, setPreEvolutions] = useState([]);

    // Carica i dettagli del Pokémon
    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/pokemon/${id}`);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            }
        };

        // Carica le evoluzioni del Pokémon
        const fetchEvolutions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/evolutions/base/${id}`);
                setEvolutions(response.data);
            } catch (error) {
                console.error('Error fetching evolutions:', error);
            }
        };

        // Carica le pre-evoluzioni del Pokémon
        const fetchPreEvolutions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/evolutions/evolved/${id}`);
                setPreEvolutions(response.data);
            } catch (error) {
                console.error('Error fetching pre-evolutions:', error);
            }
        };

        fetchPokemonDetails();
        fetchEvolutions();
        fetchPreEvolutions();
    }, [id]);

    if (!pokemon) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h1>{pokemon.name}</h1>
            <img src={pokemon.imageUrl} alt={pokemon.name} className="img-fluid mb-4" />

            <div className="row">
                {/* Tipi e Generazione */}
                <div className="col-md-6">
                    <h3>Basic Information</h3>
                    <p><strong>Type 1:</strong> {pokemon.type1}</p>
                    <p><strong>Type 2:</strong> {pokemon.type2 || 'None'}</p>
                    <p><strong>Generation:</strong> {pokemon.generation}</p>
                </div>

                {/* Statistiche */}
                <div className="col-md-6">
                    <h3>Statistics</h3>
                    <ul>
                        <li><strong>HP:</strong> {pokemon.stats.hp}</li>
                        <li><strong>Attack:</strong> {pokemon.stats.attack}</li>
                        <li><strong>Defense:</strong> {pokemon.stats.defense}</li>
                        <li><strong>Speed:</strong> {pokemon.stats.speed}</li>
                    </ul>
                </div>
            </div>

            {/* Pre-evoluzioni */}
            <div className="mt-4">
                <h3>Pre-Evolutions</h3>
                {preEvolutions.length === 0 ? (
                    <p>No pre-evolutions available.</p>
                ) : (
                    <div className="row">
                        {preEvolutions.map((preEvo) => (
                            <div key={preEvo.basePokemon.id} className="col-md-4">
                                <div className="card">
                                    <img
                                        src={preEvo.basePokemon.imageUrl}
                                        className="card-img-top"
                                        alt={preEvo.basePokemon.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{preEvo.basePokemon.name}</h5>
                                        <p><strong>Trigger:</strong> {preEvo.evolutionTrigger}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Evoluzioni */}
            <div className="mt-4">
                <h3>Evolutions</h3>
                {evolutions.length === 0 ? (
                    <p>No evolutions available.</p>
                ) : (
                    <div className="row">
                        {evolutions.map((evo) => (
                            <div key={evo.evolvedPokemon.id} className="col-md-4">
                                <div className="card">
                                    <img
                                        src={evo.evolvedPokemon.imageUrl}
                                        className="card-img-top"
                                        alt={evo.evolvedPokemon.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{evo.evolvedPokemon.name}</h5>
                                        <p><strong>Trigger:</strong> {evo.evolutionTrigger}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonDetails;
