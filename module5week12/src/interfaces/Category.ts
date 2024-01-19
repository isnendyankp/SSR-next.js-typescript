export interface PokemonSearchData {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
};

export interface PokemonListData {
  id: number;
  name: string;
  sprite: string;
  types: string[]; // Add types attribute
  abilities: string[]; // Add abilities attribute
};