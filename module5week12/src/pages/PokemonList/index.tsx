import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Text, Button } from '../../components';
import { PokemonListData } from '../../interfaces/Category';

// PokemonListContainer component
const PokemonListContainer: React.FC = () => {
  // useState hook
  const [pokemon, setPokemon] = useState<PokemonListData[]>([]);

  // use Navigate router hook
  const router = useRouter();

  // useEffect hook
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // fetch pokemon list from API
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=4'
        );

        // fetch pokemon data from API
        const pokeData: PokemonListData[] = await Promise.all(
          response.data.results.map(async (poke: { name: string }) => {
            const pokemonResponse = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${poke.name}`
            );

            // response.data.abilities is an array of objects
            const abilities = pokemonResponse.data.abilities.map(
              (ability: { ability: { name: string } }) => ability.ability.name
            );

            // response.data.types is an array of objects
            const types = pokemonResponse.data.types.map(
              (type: { type: { name: string } }) => type.type.name
            );

            // return pokemon data
            return {
              id: pokemonResponse.data.id,
              name: poke.name,
              sprite: pokemonResponse.data.sprites.front_default,
              types,
              abilities,
            };
          })
        );

        setPokemon(pokeData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-4xl mb-5">
        <Text>Pokemon List</Text>
      </h1>

      {/* Button navigate to pokemonsearch */}
      <Button
        label="Pokemon Search"
        onClick={() => router.push('/PokemonSearch')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />

      {/* Pokemon List */}
      {pokemon.map((poke) => (
        <div
          key={poke.id}
          className="flex items-center justify-between bg-blue-200 border-blue-500 border-solid border-2 p-2 mb-2 rounded-md"
        >
          <div>
            <p className="text-lg font-semibold">{poke.name}</p>
            <p>ID: {poke.id}</p>
            <p>Types: {poke.types.join(', ')}</p>
            <p>Abilities: {poke.abilities.join(', ')}</p>
          </div>
          <img src={poke.sprite} alt={poke.name} />
        </div>
      ))}
    </div>
  );
};

export default PokemonListContainer;
