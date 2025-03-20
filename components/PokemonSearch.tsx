"use client";
import React, { useState, useTransition, use } from "react";
import PokemonCard from "./PokemonCard";
import { getFilteredPokemons } from "../app/action";

type Props = {
  typesPromise: Promise<{ name: string }[]>;
  pokemonListPromise?: Promise<{ name: string; url: string }[]>;
};

export default function PokemonSearch({
  typesPromise,
  pokemonListPromise,
}: Props) {
  const types = use(typesPromise);
  const initialPokemonList = use(pokemonListPromise);

  const [pokemonList, setPokemonList] = useState(initialPokemonList);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (!type) {
      setPokemonList(initialPokemonList);
      return;
    }

    startTransition(async () => {
      const filteredPokemons = await getFilteredPokemons(type);
      setPokemonList(filteredPokemons);
    });
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon Search</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <select
          className="border p-3 w-full rounded-lg shadow-sm"
          onChange={(e) => handleTypeChange(e.target.value)}
          value={selectedType}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search Pokemon..."
            className="border p-3 flex-1 rounded-l-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-300 ${
          isPending ? "opacity-50 grayscale" : ""
        }`}
      >
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.name} {...pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
}
