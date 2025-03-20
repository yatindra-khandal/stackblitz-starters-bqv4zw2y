"use server";

export async function getFilteredPokemons(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  return data.pokemon.map((p: any) => p.pokemon);
}