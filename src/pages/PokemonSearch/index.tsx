import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input, Button } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PokemonSearchData } from '../../interfaces/Category';
import { useAuth } from '../../context/AuthContext';

// PokemonSearchContainer component
const PokemonSearchContainer: React.FC = () => {
  // useState hook
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<PokemonSearchData | null>(null);

  // use Navigate router hook
  const router = useRouter();

  // useAuth hook
  const { isAuthenticated } = useAuth();

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
      if (isAuthenticated) {
        setSearch(values.search);
      } else {
        router.push('/login');
      }
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
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-full py-4">
      <h1 className="text-4xl mb-5">Pokemon Search</h1>

      <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
        {/* Input Search */}
        <Input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.search}
          name="search"
          placeholder="Search Pokemon"
          className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        {formik.errors.search ? (
          <div className="text-red-600 mb-4">{formik.errors.search}</div>
        ) : null}

        {/* Button Search */}
        <Button
          type="submit"
          label="Search"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
        />
      </form>

      {/* Pokemon Card */}
      {pokemon ? (
        <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-8 p-4 bg-white rounded overflow-hidden shadow-lg relative">
          {/* image */}
          <img
            className="w-full h-64 object-cover"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          {/* detail */}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{pokemon.name}</div>
            <p className="text-gray-700 text-base">
              Types: {pokemon.types.map((type) => type.type.name).join(', ')}
            </p>
            <p className="text-gray-700 text-base">
              Abilities:{' '}
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(', ')}
            </p>
          </div>
        </div>
      ) : (
        search !== '' && <p className="mt-8">No Pokemon found.</p>
      )}

      {/* Button back to list */}
      <Button
        label="Back to Pokemon List"
        onClick={() => router.push('/PokemonList')}
        className="mt-8 w-full max-w-sm sm:max-w-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
    </div>
  );
};

export default PokemonSearchContainer;
