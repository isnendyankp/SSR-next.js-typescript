import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input, Button } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PokemonSearchData } from '../../interfaces/Category';

// PokemonSearchContainer component
const PokemonSearchContainer: React.FC = () => {
  // useState hook
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<PokemonSearchData | null>(null);

  // use Navigate router hook
  const router = useRouter();

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      search: '',
    },

    // validationSchema for form validation
    validationSchema: yup.object({
      search: yup.string().required('Search cannot be empty'),
    }),

    // onSubmit function for form submission
    onSubmit: async (values) => {
      setSearch(values.search);
    },
  });

  // searchPokemon function
  const searchPokemon = async () => {
    try {
      // fetch pokemon list from API
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000`
      );
      // find pokemon from API response
      const foundPokemon = response.data.results.find(
        (poke: { name: string }) => poke.name.includes(search.toLowerCase())
      );
      if (foundPokemon) {
        const pokemonResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${foundPokemon.name}`
        );
        // setPokemon state with pokemon data from API response
        setPokemon({
          name: pokemonResponse.data.name,
          sprites: pokemonResponse.data.sprites,
          types: pokemonResponse.data.types,
          abilities: pokemonResponse.data.abilities,
        });
      } else {
        setPokemon(null);
      }
    } catch (error) {
      console.error('Error: Pokemon not found');
      setPokemon(null);
    }
  };

  // useEffect hook
  useEffect(() => {
    if (search === '') {
      setPokemon(null);
    } else {
      searchPokemon();
    }
  }, [search]);

  // render
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100 px-4">
      <form onSubmit={formik.handleSubmit}>
        {/* Input Search */}
        <Input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.search}
          name="search"
          placeholder="Search Pokemon"
          className="p-2 rounded border border-gray-300 shadow-inner mb-4"
        />
        {formik.errors.search ? (
          <div className="text-red-600">{formik.errors.search}</div>
        ) : null}

        <br />

        {/* Button Search */}
        <Button
          type="submit"
          label="Search"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        />
      </form>

      {/* Pokemon Card */}
      {pokemon ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
          {/* image */}
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-full"
          />

          {/* detail */}
          <div className="px-6 py-4">
            {/* name */}
            <h1 className="font-bold text-xl mb-2">{pokemon.name}</h1>
            {/* types */}
            <p>
              Types: {pokemon.types.map((type) => type.type.name).join(', ')}
            </p>
            {/* abilities */}
            <p>
              Abilities:{' '}
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(', ')}
            </p>
          </div>
        </div>
      ) : (
        <p>No Pokemon found.</p>
      )}

      {/* Buitton back to list */}
      <Button
        label="Back to Pokemon List"
        onClick={() => router.push('/PokemonList')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      />
    </div>
  );
};

export default PokemonSearchContainer;
