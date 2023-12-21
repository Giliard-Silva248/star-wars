import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css'

const PokemonList = () => {
  const [pokemonList, PokemonList] = useState([]);
  const [originalPokemonList, OriginalPokemonList] = useState([]);
  const [loading, Loading] = useState(true);
  const [textoBusca, TextoBusca] = useState("");
  const [limit, setLimit] = useState(25); 

  useEffect(() => {
    const fetchPokemonList = async () => {

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&off=0`);
        const results = response.data.results;

        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonInfo = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: pokemonInfo.data.sprites.front_default,
              type: pokemonInfo.data.types[0].type.name,
            };
          })
        );

        PokemonList(pokemonData);
        OriginalPokemonList(pokemonData);
        Loading(false);

    };

    fetchPokemonList();
  }, [limit]);

  const buscaPokemon = (textoDigitado) => {
    TextoBusca(textoDigitado);

  
    if (textoDigitado === '') {
      PokemonList(originalPokemonList);
    } else {
      const filteredPokemon = originalPokemonList.filter((poke) =>
        poke.name.toLowerCase().includes(textoDigitado.toLowerCase())
      );
      PokemonList(filteredPokemon);
    }
  };

  const aumentarLimite = () => {
    setLimit((prevLimit) => prevLimit + 25)
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <input
        type='text'
        value={textoBusca}
        onChange={(event) => buscaPokemon(event.target.value)}
        className='input'
        placeholder='Digite o nome do Pokemon'
      />
      <div className='container-card'>
        <ul className='container-poke'>
          {pokemonList.map((pokemon, index) => (
            <li key={index} className='card'>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.image} alt={pokemon.name} />
              <p>Tipo: {pokemon.type}</p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={aumentarLimite} className='btn'>Exibir mais</button>
    </div>
  );
};

export default PokemonList;
