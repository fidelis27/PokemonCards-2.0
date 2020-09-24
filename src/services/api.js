import axios from 'axios';

export async function getAllPokemon(url) {
  const allPokemon = await axios.get(url);

  return allPokemon.data;
}

export async function getPokemon(pokemonUrl) {
  const pokemon = await axios.get(`${pokemonUrl}`);

  return pokemon.data;
}
export async function getByTypes(name) {
  const url =
    'https://api-pokemons.herokuapp.com/pokemons?_page=1&_limit=20&types_like=';
  const pokemon = await axios.get(`${url}${name}`);

  return pokemon;
}

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
});
