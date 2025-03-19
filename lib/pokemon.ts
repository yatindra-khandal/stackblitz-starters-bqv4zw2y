import { cache } from 'react';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonTypes = cache(async () => {
  const res = await fetch(`${API_URL}/type`);
  const data = await res.json();
  return data.results;
});

export const getPokemonList = cache(async () => {
  const res = await fetch(`${API_URL}/pokemon?limit=50`);
  const data = await res.json();
  return data.results;
});

export const getPokemonDetails = cache(async (pokemonName: string) => {
  const res = await fetch(`${API_URL}/pokemon/${pokemonName}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon details');
  return res.json();
});
