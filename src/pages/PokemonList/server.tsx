import Head from 'next/head';

interface Pokemon {
  name: string;
}

interface Props {
  pokemons: Pokemon[];
}

const PokemonServer = ({ pokemons }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Pokemon List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to Pokemon List</h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {pokemons?.map((pokemon, index) => (
            <a
              key={index}
              className="p-6 mt-6 text-left border w-72 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">{pokemon.name} &rarr;</h3>
              <p className="mt-4 text-xl">Find out more about this Pokemon.</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

// getServerSideProps
export const getServerSideProps = async () => {
  // Fetch data from Pokemon API
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  const data = await response.json();

  // Extract nama Pokemon dari data
  const pokemons: Pokemon[] = data.results.map((result: any) => {
    return { name: result.name };
  });

  // return data
  return {
    props: {
      pokemons,
    },
  };
};

export default PokemonServer;
