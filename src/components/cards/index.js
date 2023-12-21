import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css'

const PokeAPIExample = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40&offset=0');
        setPokemonData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPokemonImage = async (pokemonName) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      return response.data.sprites.front_default;
    } catch (error) {
      console.error(`Erro ao buscar imagem de ${pokemonName}:`, error);
      return null;
    }
  };

  const fetchAllPokemonImages = async () => {
    const pokemonWithImages = [];
    for (const pokemon of pokemonData) {
      const imageUrl = await fetchPokemonImage(pokemon.name);
      if (imageUrl) {
        pokemonWithImages.push({ ...pokemon, imageUrl });
      }
    }
    return pokemonWithImages;
  };

  useEffect(() => {
    const fetchAndSetImages = async () => {
      if (!loading && pokemonData.length > 0) {
        const pokemonWithImages = await fetchAllPokemonImages();
        setPokemonData(pokemonWithImages);
      }
    };

    fetchAndSetImages();
  }, [loading, pokemonData]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className='container-card'>
          <div className='container-poke'>
            {pokemonData.map((pokemon, index) => (
              <div key={index} className='card'>
                <p>{pokemon.name}</p>
                {pokemon.imageUrl && <img src={pokemon.imageUrl} alt={pokemon.name} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeAPIExample;
