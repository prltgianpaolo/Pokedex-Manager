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
        <div className="container mt-6">
            {/* Dettagli del Pokémon */}
            <div className="bg-white p-6 rounded shadow-lg text-center mb-8">
                <h1 className="text-4xl font-bold text-red-600 mb-4">{pokemon.name}</h1>
                <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    className="w-40 h-40 mx-auto mb-4 transition-transform transform hover:scale-110"
                />
                <div className="flex justify-center gap-10">
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">Type 1:</h3>
                        <p>{pokemon.type1}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">Type 2:</h3>
                        <p>{pokemon.type2 || 'None'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">Generation:</h3>
                        <p>{pokemon.generation}</p>
                    </div>
                </div>
            </div>

            {/* Statistiche */}
            <div className="bg-white p-6 rounded shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-700 text-center mb-6">Statistics</h3>
                <table className="w-full table-auto text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 font-semibold text-gray-700">Stat</th>
                            <th className="px-4 py-2 font-semibold text-gray-700">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2 text-gray-600">HP</td>
                            <td className="border px-4 py-2">{pokemon.stats.hp}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 text-gray-600">Attack</td>
                            <td className="border px-4 py-2">{pokemon.stats.attack}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 text-gray-600">Defense</td>
                            <td className="border px-4 py-2">{pokemon.stats.defense}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 text-gray-600">Speed</td>
                            <td className="border px-4 py-2">{pokemon.stats.speed}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Pre-Evoluzioni */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 text-center mb-6">Pre-Evolutions</h3>
                {preEvolutions.length === 0 ? (
                    <p className="text-center text-gray-500">No pre-evolutions available.</p>
                ) : (
                    <div className="flex items-center justify-center space-x-6">
                        {preEvolutions.map((preEvo, index) => (
                            <React.Fragment key={preEvo.basePokemon.id}>
                                <div className="text-center">
                                    <img
                                        src={preEvo.basePokemon.imageUrl}
                                        alt={preEvo.basePokemon.name}
                                        className="w-24 h-24 mx-auto mb-2 transition-transform transform hover:scale-110"
                                    />
                                    <p className="text-sm font-semibold text-gray-800">{preEvo.basePokemon.name}</p>
                                </div>
                                {index < preEvolutions.length - 1 && (
                                    <span className="text-3xl text-gray-500">→</span>
                                )}
                            </React.Fragment>
                        ))}
                        <span className="text-3xl text-gray-500">→</span>
                        <div className="text-center">
                            <img
                                src={pokemon.imageUrl}
                                alt={pokemon.name}
                                className="w-24 h-24 mx-auto mb-2 transition-transform transform hover:scale-110"
                            />
                            <p className="text-sm font-semibold text-gray-800">{pokemon.name}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Evoluzioni */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 text-center mb-6">Evolutions</h3>
                {evolutions.length === 0 ? (
                    <p className="text-center text-gray-500">No evolutions available.</p>
                ) : (
                    <div className="flex items-center justify-center space-x-6">
                        <div className="text-center">
                            <img
                                src={pokemon.imageUrl}
                                alt={pokemon.name}
                                className="w-24 h-24 mx-auto mb-2 transition-transform transform hover:scale-110"
                            />
                            <p className="text-sm font-semibold text-gray-800">{pokemon.name}</p>
                        </div>
                        {evolutions.map((evo, index) => (
                            <React.Fragment key={evo.evolvedPokemon.id}>
                                <span className="text-3xl text-gray-500">→</span>
                                <div className="text-center">
                                    <img
                                        src={evo.evolvedPokemon.imageUrl}
                                        alt={evo.evolvedPokemon.name}
                                        className="w-24 h-24 mx-auto mb-2 transition-transform transform hover:scale-110"
                                    />
                                    <p className="text-sm font-semibold text-gray-800">{evo.evolvedPokemon.name}</p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonDetails;
