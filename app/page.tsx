import { getPokemonTypes, getPokemonList } from "../lib/pokemon";
import { PokemonSearch } from "../components/PokemonSearch";

export default function Home() {
  const typesPromise = getPokemonTypes();
  const pokemonListPromise = getPokemonList();

  return (
    <PokemonSearch
      typesPromise={typesPromise}
      pokemonListPromise={pokemonListPromise}
    />
  );
}
